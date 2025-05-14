import { getTipPrompt } from "@/prompts/tips/generator";
import ApiService, { OPENAI_MODEL_SLOW } from "@/services/ApiService";
import { zodResponseFormat } from "openai/helpers/zod";
import RemoteConfigService from "../RemoteConfigService";
import { PremiumCommunicationTipExtraction } from "@/utils/openai/response";

export const getCommunicationTip = async (
  category: string,
  subCategory: string,
  userInfo: any
) => {
  let prompt = await getTipPrompt({ category, subCategory, userInfo });
  try {
    const response = await ApiService.post("/chat/completions", {
      model: RemoteConfigService.getOpenAIModelSlow(),
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: zodResponseFormat(
        PremiumCommunicationTipExtraction,
        "communication_tip"
      ),
    });

    const content = response.choices[0].message.content.trim();
    const tipContent = JSON.parse(content);

    return {
      ...tipContent,
      category,
      subCategory,
      createdAt: new Date(),
    };
  } catch (error: any) {
    console.error("Error generating communication tip:", error);
    if (error.message.includes("timed out")) {
      throw new Error("Request took too long. Please try again.");
    }
    throw new Error("Failed to generate communication tip. Please try again.");
  }
};
