import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/hooks/useTranslation";

interface Props {
  title: string;
}

const FeatureItem: React.FC<Props> = ({ title }) => {
  const { t } = useTranslation();
  return (
    <View style={styles.featureRow}>
      <Ionicons
        style={{ marginRight: 8 }}
        name="checkmark-circle"
        size={24}
        color={"#34C759"}
      />
      <View style={styles.featureTextContainer}>
        <Text style={styles.featureTitle}>{t(title)}</Text>
      </View>
    </View>
  );
};

export default FeatureItem;

const styles = StyleSheet.create({
  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.7,
  },
});
