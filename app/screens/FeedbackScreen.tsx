import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Theme from "@/constants/Theme";
import React, { useState } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";

export default function FeedbackScreen() {
  const [name, setName] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    if (!name || !feedback) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    console.log("Feedback:", { name, feedback });

    Alert.alert("Thank you!", "Your feedback has been received.");
    setName("");
    setFeedback("");
  };

  return (
    <GlobalSafeAreaView bgWhite>
      <Text style={styles.title}>Share Your Feedback</Text>
      <Text style={styles.subtitle}>
        Help us improve our service with your valuable feedback
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Your Feedback"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... existing styles ...
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Theme.colors.text,
    marginBottom: 8,
    marginTop: 20,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: Theme.colors.textLight,
    marginBottom: 24,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: Theme.colors.border,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: Theme.colors.background,
    fontSize: 16,
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
    fontWeight: "600",
  },
});
