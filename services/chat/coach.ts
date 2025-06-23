import { getCommunicationCoachPrompt } from "@/prompts/chat/coach";
import ApiService from "@/services/ApiService";
import { CommunicationCoachExtraction } from "@/utils/openai/response";
import { zodResponseFormat } from "openai/helpers/zod";
import RemoteConfigService from "../RemoteConfigService";

type CommunicationCoachParams = {
  persona: "dating_coach" | "flirting_expert" | "relationship_guru";
  userInfo?: {
    gender: string;
    age: string;
    interest: string;
  };
  chatHistory: Array<{ role: "user" | "ai"; content: string }>;
};

export const sendCommunicationCoachMessage = async ({
  persona,
  userInfo,
  chatHistory,
}: CommunicationCoachParams) => {
  try {
    const systemPrompt = await getCommunicationCoachPrompt({
      persona,
      userInfo,
    });
    const response = await ApiService.post("/chat/completions", {
      model: RemoteConfigService.getOpenAIModelSlow(),
      messages: [
        { role: "system", content: systemPrompt },
        ...chatHistory.map((msg) => ({
          role: msg.role === "ai" ? "assistant" : "user",
          content: msg.content,
        })),
      ],
      temperature: 0.7,
      max_tokens: 300,
      response_format: zodResponseFormat(
        CommunicationCoachExtraction,
        "communication_coach_extraction"
      ),
    });

    const content = response.choices[0].message.content;
    const parsedResponse = JSON.parse(content);
    return parsedResponse;
  } catch (error: any) {
    console.error("Error in sendCommunicationCoachMessage:", error);
    if (error.message.includes("timed out")) {
      throw new Error("Request took too long. Please try again.");
    }
    throw new Error("Failed to generate response. Please try again.");
  }
};
