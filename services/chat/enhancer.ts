import {
  getChatEnhancerPrompt,
  getDeadChatEnhancerPrompt,
} from "@/prompts/chat/enhancer";
import ApiService, { OPENAI_MODEL_FAST } from "@/services/ApiService";
import { ChatEnhancerExtraction } from "@/utils/openai/response";
import { zodResponseFormat } from "openai/helpers/zod";

export const enhanceChat = async (
  imageUrl: any,
  userInfo: any,
  additionalInfo?: string,
  conversationStyle?: string,
  isDeadConversation?: boolean
) => {
  let prompt = isDeadConversation
    ? await getDeadChatEnhancerPrompt(
        userInfo,
        additionalInfo,
        conversationStyle
      )
    : await getChatEnhancerPrompt(userInfo, additionalInfo, conversationStyle);
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
