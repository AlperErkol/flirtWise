import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
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
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <Text style={styles.title}>Share Your Feedback</Text>
      <Text style={styles.subtitle}>
        Help us improve our service with your valuable feedback
      </Text>

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
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white",
    fontSize: 16,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    color: "#374151",
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
    fontWeight: "600",
  },
});
