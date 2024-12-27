import Theme from "@/constants/Theme";
import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("English");

  const languages = [
    { name: "English", flag: "🇬🇧" },
    { name: "Türkçe", flag: "🇹🇷" },
  ];

  return (
    <View style={styles.container}>
      <View>
        {languages.map((lang) => (
          <TouchableOpacity
            key={lang.name}
            style={styles.menuItem}
            onPress={() => setSelectedLanguage(lang.name)}
          >
            <Text style={styles.emoji}>{lang.flag}</Text>
            <Text style={styles.menuText}>{lang.name}</Text>
            {selectedLanguage === lang.name && (
              <Text style={styles.checkMark}>✓</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  emoji: {
    fontSize: 18,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.text,
    flex: 1,
    marginLeft: 15,
  },
  checkMark: {
    fontSize: 20,
    fontWeight: "600",
    color: Theme.colors.primary,
  },
});
