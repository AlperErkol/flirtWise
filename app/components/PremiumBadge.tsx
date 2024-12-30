import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function PremiumBadge() {
  return (
    <View style={styles.premiumBadge}>
      <Text style={styles.premiumText}>Premium+</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  premiumBadge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  premiumText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
});
