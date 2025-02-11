import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings";

export default function FeedbackScreen() {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");
  const [appRating, setAppRating] = useState(0);
  const [recommendationRating, setRecommendationRating] = useState(0);

  const handleSubmit = async () => {
    if (!feedback || appRating === 0 || recommendationRating === 0) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    try {
      const feedbackData = {
        email: email || null,
        feedback,
        appRating,
        recommendationRating,
        timestamp: new Date().toISOString(),
      };

      Alert.alert("Thank you!", "Your feedback has been received.");
      setEmail("");
      setFeedback("");
      setAppRating(0);
      setRecommendationRating(0);
    } catch (error) {
      Alert.alert("Error", "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.headerContainer}>
            <View style={styles.titleContainer}>
              <Ionicons name="chatbubbles-outline" size={24} color="#4F46E5" />
              <Text style={styles.headerTitle}>Share Your Feedback</Text>
            </View>
            <Text style={styles.headerDescription}>
              Your feedback helps us improve FlirtWise and create a better
              experience for you. Share your thoughts and let us know how we can
              make things even better!
            </Text>
          </View>

          <View style={styles.wrapper}>
            <TextInput
              style={styles.input}
              placeholder="Email (Optional)"
              placeholderTextColor="#9CA3AF"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Your Feedback *"
              placeholderTextColor="#9CA3AF"
              value={feedback}
              onChangeText={setFeedback}
              multiline
              numberOfLines={4}
            />

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>
                What rating do you give the app?
              </Text>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={50}
                onFinishRating={setAppRating}
                style={styles.rating}
                tintColor="#E6E6FA"
              />
            </View>

            <View style={styles.ratingContainer}>
              <Text style={styles.ratingLabel}>
                Would you recommend the service to others?
              </Text>
              <Rating
                type="custom"
                ratingCount={5}
                imageSize={50}
                onFinishRating={setRecommendationRating}
                style={styles.rating}
                tintColor="#E6E6FA"
              />
            </View>

            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleSubmit}
            >
              <Text style={styles.submitButtonText}>Submit Feedback</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  headerContainer: {
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
  },
  headerDescription: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  wrapper: {
    marginTop: 20,
  },
  input: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white",
    fontSize: 16,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    color: "#000",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontFamily: "Inter_400Regular",
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  ratingContainer: {
    marginVertical: 16,
  },
  ratingLabel: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#000",
    marginBottom: 8,
  },
  rating: {
    alignSelf: "flex-start",
  },
  submitButton: {
    backgroundColor: Theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
});
