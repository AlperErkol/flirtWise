import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface PremiumBadgeProps {
  bgWhite?: boolean;
}

export default function PremiumBadge({ bgWhite = false }: PremiumBadgeProps) {
  return (
    <View style={[styles.premiumBadge, bgWhite && styles.premiumBadgeWhiteBg]}>
      <Ionicons name="star" size={12} color="#FFD700" />
      <Text style={[styles.premiumText, bgWhite && styles.premiumTextWhiteBg]}>
        Premium+
      </Text>
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
  premiumBadgeWhiteBg: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  premiumText: {
    color: "#FFD700",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  premiumTextWhiteBg: {
    color: "#B8860B", // Daha koyu bir altın rengi
  },
});
