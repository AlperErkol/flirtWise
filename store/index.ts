import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserProfile = async (userProfile: any) => {
  try {
    await AsyncStorage.setItem("userProfile", JSON.stringify(userProfile));
    console.log("User profile saved successfully!");
  } catch (error) {
    console.error("Error saving user profile:", error);
  }
};

export const getUserProfile = async () => {
  try {
    const userProfile = await AsyncStorage.getItem("userProfile");
    if (userProfile) {
      return JSON.parse(userProfile);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    return null;
  }
};

export const updateUserProfile = async (updatedFields: any) => {
  try {
    const existingProfile = await getUserProfile();
    const updatedProfile = { ...existingProfile, ...updatedFields };
    await saveUserProfile(updatedProfile);
    console.log("User profile updated successfully!");
  } catch (error) {
    console.error("Error updating user profile:", error);
  }
};

export const clearUserProfile = async () => {
  try {
    await AsyncStorage.removeItem("userProfile");
    console.log("User profile cleared successfully!");
  } catch (error) {
    console.error("Error clearing user profile:", error);
  }
};
