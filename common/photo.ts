import { AdditionalParams } from "@/constants/types";
import { enhanceChat } from "@/services/chat/enhancer";
import { generatePhotoOpeners } from "@/services/photo";
import { uriToDataURL } from "@/utils";

const handleImageProcessing = async (
  imageUri: string,
  type: "photo_openers" | "chat_enhancer",
  photoContext: string,
  additionalSettings: AdditionalParams,
  isDeadConversation?: boolean
) => {
  try {
    const imageUrl: string = await uriToDataURL(imageUri);
    let newSuggestions = [];
    if (type === "photo_openers") {
      newSuggestions = await generatePhotoOpeners(
        imageUrl,
        photoContext,
        additionalSettings
      );
    } else if (type === "chat_enhancer") {
      newSuggestions = await enhanceChat(
        imageUrl,
        photoContext,
        additionalSettings,
        isDeadConversation
      );
    }
    if (Array.isArray(newSuggestions) && newSuggestions.length > 0) {
      return newSuggestions;
    } else {
      console.error("Invalid suggestions format:", newSuggestions);
      return ["No valid suggestions generated. Please try again."];
    }
  } catch (error) {
    console.error("Error in handleImageProcessing:", error);
    return ["An error occurred, please try again."];
  }
};

export default handleImageProcessing;
