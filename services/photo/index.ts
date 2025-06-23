import { getPhotoOpenerPrompt } from "@/prompts/photo/opener";
import ApiService from "../ApiService";
import { zodResponseFormat } from "openai/helpers/zod";
import { PhotoOpenerExtraction } from "@/utils/openai/response";
import RemoteConfigService from "../RemoteConfigService";
import { AdditionalParams } from "@/constants/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const generatePhotoOpeners = async (
  imageUrl: string,
  photoContext: string,
  additionalSettings: AdditionalParams
) => {
  const userProfileString = await AsyncStorage.getItem("userProfile");
  const userProfile = userProfileString ? JSON.parse(userProfileString) : null;

  let prompt = await getPhotoOpenerPrompt(
    userProfile,
    photoContext,
    additionalSettings
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
