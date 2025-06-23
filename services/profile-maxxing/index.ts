import { ManualData } from "@/constants/types";
import ApiService from "../ApiService";
import RemoteConfigService from "../RemoteConfigService";
import { uriToDataURL } from "@/utils";
import { getProfileMaxxingPrompt } from "@/prompts/profile-maxxing";
import { zodResponseFormat } from "openai/helpers/zod";
import { ProfileMaxxingExtraction } from "@/utils/openai/response";

export const runProfileMaxxing = async (data: ManualData) => {
  let dataUrls: string[] = [];

  dataUrls = await Promise.all(
    (data as ManualData).profilePhotos.map(uriToDataURL)
  );

  const prompt = await getProfileMaxxingPrompt(data);

  const content: any[] = [{ type: "text", text: prompt }];

  dataUrls.forEach((url) =>
    content.push({
      type: "image_url",
      image_url: { url },
    })
  );

  try {
    const response = await ApiService.post("/chat/completions", {
      model: RemoteConfigService.getOpenAIModelFast(),
      messages: [
        {
          role: "user",
          content,
        },
      ],
      response_format: zodResponseFormat(
        ProfileMaxxingExtraction,
        "profile_maxxing"
      ),
    });

    const aiText = response.choices[0].message.content;
    try {
      return aiText;
    } catch (parseError) {
      console.error("AI response parsing error:", parseError);
      return null;
    }
  } catch (error: any) {
    console.error("Error generating photo openers:", error.message);
    throw new Error(
      "An error occurred while processing the image. Please try again."
    );
  }
};
