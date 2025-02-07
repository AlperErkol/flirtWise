import { getChatEnhancerPrompt, getDeadChatEnhancerPrompt } from "@/prompts/chat/enhancer";
import ApiService, { OPENAI_MODEL_FAST } from "@/services/ApiService";
import { ChatEnhancerExtraction } from "@/utils/openai/response";
import { zodResponseFormat } from "openai/helpers/zod";

export const enhanceChat = async (
  imageUrl: any,
  userInfo: any,
  additionalInfo?: string,
  isDeadConversation?: boolean
) => {
  console.log(isDeadConversation);
  let prompt = isDeadConversation
    ? getDeadChatEnhancerPrompt(userInfo, additionalInfo)
    : getChatEnhancerPrompt(userInfo, additionalInfo);
  try {
    const response = await ApiService.post("/chat/completions", {
      model: OPENAI_MODEL_FAST,
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
        ChatEnhancerExtraction,
        "chat_enhancers"
      ),
    });

    const aiText = response.choices[0].message.content;
    const hints = JSON.parse(aiText);
    console.log(hints);
    return hints.enhancers;
  } catch (error: any) {
    console.error(
      "Error generating conversation suggestions:",
      error.response?.data || error.message
    );
    throw new Error(
      "An error occurred while processing the image. Please try again."
    );
  }
};
