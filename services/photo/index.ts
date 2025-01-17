import { getPhotoOpenerPrompt } from "@/prompts/photo/opener";
import ApiService, { OPENAI_MODEL_FAST } from "../ApiService";
import { zodResponseFormat } from "openai/helpers/zod";
import { PhotoOpenerExtraction } from "@/utils/openai/response";

export const generatePhotoOpeners = async (imageUrl: any, userInfo: any) => {
  let prompt = getPhotoOpenerPrompt({ userInfo });

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
    console.error(
      "Error generating photo openers:",
      error.response?.data || error.message
    );
    throw new Error(
      "An error occurred while processing the image. Please try again."
    );
  }
};
