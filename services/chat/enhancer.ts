import { getChatEnhancerPrompt } from "@/prompts/chat/enhancer";
import ApiService from "@/services/ApiService";
import { ChatEnhancerExtraction } from "@/utils/openai/response";
import { zodResponseFormat } from "openai/helpers/zod";
import RemoteConfigService from "../RemoteConfigService";
import { AdditionalParams } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getRiskLevel } from "@/utils";
export const enhanceChat = async (
  imageUrl: any,
  photoContext: string,
  additionalSettings: AdditionalParams,
  isDeadConversation?: boolean
) => {
  const userProfileString = await AsyncStorage.getItem("userProfile");
  const userProfile = userProfileString ? JSON.parse(userProfileString) : null;

  let prompt = await getChatEnhancerPrompt(
    userProfile,
    photoContext,
    additionalSettings,
    isDeadConversation
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
      temperature: getRiskLevel(additionalSettings.riskLevel),
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
