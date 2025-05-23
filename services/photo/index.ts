import { getPhotoOpenerPrompt } from "@/prompts/photo/opener";
import ApiService, { OPENAI_MODEL_FAST } from "../ApiService";
import { zodResponseFormat } from "openai/helpers/zod";
import { PhotoOpenerExtraction } from "@/utils/openai/response";
import RemoteConfigService from "../RemoteConfigService";

export const generatePhotoOpeners = async (
  imageUrl: any,
  userInfo: any,
  additionalInfo?: string,
  conversationStyle?: string
) => {
  let prompt = await getPhotoOpenerPrompt(
    { userInfo },
    additionalInfo,
    conversationStyle
  );

  try {
    const response = await ApiService.post("/chat/completions", {
      model: RemoteConfigService.getOpenAIModelFast(),
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
            {
              type: "image_url",
              image_url: {
                url: imageUrl,
              },
            },
          ],
        },
      ],
      temperature: 0.8,
      response_format: zodResponseFormat(
        PhotoOpenerExtraction,
        "photo_openers"
      ),
    });

    const aiText = response.choices[0].message.content;

    try {
      const hints = JSON.parse(aiText);
      return hints.openers;
    } catch (parseError) {
      console.error("AI response parsing error:", parseError);
    }
  } catch (error: any) {
    console.error("Error generating photo openers:", error.message);
    throw new Error(
      "An error occurred while processing the image. Please try again."
    );
  }
};
