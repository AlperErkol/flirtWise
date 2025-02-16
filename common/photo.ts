import { enhanceChat } from "@/services/chat/enhancer";
import { uploadImageToCloudinary } from "@/services/cloudinary";
import { generatePhotoOpeners } from "@/services/photo";

const handleImageProcessing = async (
  imageUri: string,
  userProfile: any,
  type: "photo_openers" | "chat_enhancer",
  additionalInfo?: string,
  conversationStyle?: string,
  isDeadConversation?: boolean
) => {
  try {
    const cloudinaryImage: any = await uploadImageToCloudinary(imageUri);
    const imageUrl = cloudinaryImage.secure_url;
    let newSuggestions = [];
    if (type === "photo_openers") {
      newSuggestions = await generatePhotoOpeners(
        imageUrl,
        userProfile,
        additionalInfo,
        conversationStyle
      );
    } else if (type === "chat_enhancer") {
      newSuggestions = await enhanceChat(
        imageUrl,
        userProfile,
        additionalInfo,
        conversationStyle,
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
