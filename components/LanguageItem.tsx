import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/constants/Theme";

interface LanguageItemProps {
  id: string;
  label: string;
  emoji: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const LanguageItem = ({
  id,
  label,
  isSelected,
  onSelect,
  emoji,
}: LanguageItemProps) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => onSelect(id)}>
      <View style={styles.menuTextContainer}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.menuText}>{label}</Text>
      </View>
      {isSelected && (
        <Ionicons name="checkmark" size={20} color={Theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  menuText: {
    fontSize: 16,
    color: Theme.colors.text,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  menuTextContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  emoji: {
    fontSize: 20,
    color: Theme.colors.text,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
});

export default LanguageItem;
