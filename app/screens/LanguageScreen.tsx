import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";

const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "tr", name: "Türkçe" },
];

export default function LanguageScreen() {
  const router = useRouter();

  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  languageButton: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: "#f5f5f5",
  },
  selectedLanguage: {
    backgroundColor: "#4FACFE",
  },
  languageText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter_400Regular",
  },
  selectedText: {
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
  },
});
