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
      Alert.alert("Hata", "Lütfen tüm alanları doldurun.");
      return;
    }

    console.log("Geri Bildirim:", { name, feedback });

    Alert.alert("Teşekkürler!", "Geri bildiriminiz alındı.");
    setName("");
    setFeedback("");
  };

  return (
    <GlobalSafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Adınız"
        value={name}
        onChangeText={(text) => setName(text)}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Geri bildiriminiz"
        value={feedback}
        onChangeText={(text) => setFeedback(text)}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Gönder</Text>
      </TouchableOpacity>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
  },
  textArea: { height: 100 },
  submitButton: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: { color: "#fff", fontSize: 15, fontWeight: "600" },
});
