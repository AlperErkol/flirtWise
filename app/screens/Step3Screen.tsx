import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import Header from "@/components/Header";
import { COMMUNICATION_STYLES } from "@/constants/wizard/options";

export default function Step3Screen({ navigation, route }: any) {
  const [selectedStyle, setSelectedStyle] = useState("");
  const { gender, age, interest } = route.params;

  const handleNext = () => {
    if (selectedStyle) {
      navigation.navigate("Step4", {
        gender,
        age,
        interest,
        communicationStyle: selectedStyle,
      });
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />

      <View style={styles.progressContainer}>
        <View style={[styles.progressLine]} />
        <View style={[styles.progressLine]} />
        <View style={[styles.progressLine]} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
      </View>

      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.content}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>💭</Text>
          <Text style={styles.title}>Your Style</Text>
          <Text style={styles.subtitle}>How do you prefer to communicate?</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.optionsSection}>
            {COMMUNICATION_STYLES.map((style) => (
              <TouchableOpacity
                key={style.id}
                style={[
                  styles.optionButton,
                  selectedStyle === style.id && styles.selectedOption,
                ]}
                onPress={() => setSelectedStyle(style.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionEmoji}>{style.emoji}</Text>
                  <Text
                    style={[
                      styles.optionText,
                      selectedStyle === style.id && styles.selectedOptionText,
                    ]}
                  >
                    {style.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[styles.nextButton, !selectedStyle && styles.disabledButton]}
            onPress={handleNext}
            disabled={!selectedStyle}
          >
            <Text style={styles.buttonText}>Continue</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: "#4F46E5",
    borderRadius: 2,
  },
  inactiveLine: {
    opacity: 0.3,
  },
  content: {
    flex: 1,
    paddingVertical: 24,
  },
  titleContainer: {
    paddingHorizontal: 24,
    marginBottom: 32,
    alignItems: "center",
  },
  emoji: {
    fontSize: 38,
    marginBottom: 16,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter_400Regular",
    fontSize: 16,
    color: "#666",
    lineHeight: 22,
    textAlign: "center",
    maxWidth: "80%",
  },
  formContainer: {
    flex: 1,
  },
  optionsSection: {
    gap: 12,
  },
  optionButton: {
    width: "100%",
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  selectedOption: {
    backgroundColor: "#4F46E5",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  optionEmoji: {
    fontSize: 24,
  },
  optionText: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#4F46E5",
    flex: 1,
  },
  selectedOptionText: {
    color: "#FFF",
  },
  optionDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  selectedDescriptionText: {
    color: "#fff",
    opacity: 0.9,
  },
  bottomContainer: {
    marginTop: "auto",
  },
  nextButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    fontSize: 18,
  },
});
