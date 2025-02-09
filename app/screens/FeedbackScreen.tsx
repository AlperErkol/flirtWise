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
} from "react-native";

export default function FeedbackScreen() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!name || !feedback) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    Alert.alert("Thank you!", "Your feedback has been received.");
    setName("");
    setFeedback("");
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
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
          placeholder="Your Name"
          placeholderTextColor="#9CA3AF"
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Your Feedback"
          placeholderTextColor="#9CA3AF"
          value={feedback}
          onChangeText={(text) => setFeedback(text)}
          multiline
          numberOfLines={4}
        />

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
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
});
