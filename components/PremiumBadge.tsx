import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PremiumBadge() {
  return (
    <View style={styles.premiumBadge}>
      <Ionicons name="star" size={12} color="#FFD700" />
      <Text style={styles.premiumText}>Premium+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  premiumBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  premiumText: {
    color: "#FFD700",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
});
