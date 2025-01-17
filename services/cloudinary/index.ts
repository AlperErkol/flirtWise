import cld from "@/lib/cloudinary";
import { upload } from "cloudinary-react-native";

const options = {
  upload_preset: "default",
  unsigned: true,
};

export const uploadImageToCloudinary = async (imageUri: any) => {
  return new Promise((resolve, reject) => {
    upload(cld, {
      file: imageUri,
      options,
      callback: (error, response) => {
        if (error || !response) {
          reject(error || new Error("No response received from Cloudinary"));
        } else {
          resolve(response);
        }
      },
    });
  });
};
