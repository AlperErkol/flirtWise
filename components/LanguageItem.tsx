import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/constants/Theme";

interface LanguageItemProps {
  id: string;
  label: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const LanguageItem = ({
  id,
  label,
  isSelected,
  onSelect,
}: LanguageItemProps) => {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={() => onSelect(id)}>
      <Text style={styles.menuText}>{label}</Text>
      {isSelected && (
        <Ionicons name="checkmark" size={24} color={Theme.colors.primary} />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 16,
    color: Theme.colors.text,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
});

export default LanguageItem;
