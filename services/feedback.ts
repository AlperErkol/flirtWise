import firestore from "@react-native-firebase/firestore";

export interface FeedbackData {
  email: string | null;
  feedback: string;
  appRating: number;
  recommendationRating: number;
  timestamp: string;
  platform: string;
  appVersion: string;
}

export const submitFeedback = async (data: FeedbackData): Promise<void> => {
  try {
    await firestore()
      .collection("feedback")
      .add({
        ...data,
        createdAt: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    throw error;
  }
};
