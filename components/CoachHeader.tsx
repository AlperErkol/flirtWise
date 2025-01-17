import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "@/constants/Theme";

type Props = {
  persona: string;
  title: string;
  description: string;
  gradient: string[];
  onBackPress: () => void;
};

export default function CoachHeader({
  persona,
  title,
  description,
  gradient,
  onBackPress,
}: Props) {
  return (
    <LinearGradient colors={gradient as any} style={styles.header}>
      <View style={styles.headerContent}>
        <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
          <Ionicons name="chevron-back" size={24} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{description}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#FFF",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255, 255, 255, 0.9)",
  },
});
