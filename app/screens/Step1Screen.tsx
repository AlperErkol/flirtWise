import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { GENDER_OPTIONS, AGE_OPTIONS } from "@/constants/wizard/options";

const { height } = Dimensions.get("window");

export default function Step1Screen({ navigation }: any) {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedAge, setSelectedAge] = useState("");

  const handleNext = () => {
    if (selectedGender && selectedAge) {
      navigation.navigate("Step2", {
        gender: selectedGender,
        age: selectedAge,
      });
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} />

      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
      </View>

      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.content}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={styles.title}>Hey there!</Text>
          <Text style={styles.subtitle}>
            Let's create your perfect communication profile in just a few steps
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>What's your gender?</Text>
            <View style={styles.optionsGrid}>
              {GENDER_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedGender === option.id && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedGender(option.id)}
                >
                  <View style={styles.optionContent}>
                    <Text style={styles.optionEmoji}>{option.emoji}</Text>
                    <Text
                      style={[
                        styles.optionText,
                        selectedGender === option.id &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.optionsSection}>
            <Text style={styles.sectionTitle}>
              Which age group do you belong to?
            </Text>
            <View style={styles.optionsGrid}>
              {AGE_OPTIONS.map((option) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    selectedAge === option.id && styles.selectedOption,
                  ]}
                  onPress={() => setSelectedAge(option.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedAge === option.id && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              (!selectedGender || !selectedAge) && styles.disabledButton,
            ]}
            onPress={handleNext}
            disabled={!selectedGender || !selectedAge}
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
  content: {
    flex: 1,
    paddingVertical: 24,
  },
  formContainer: {
    flex: 1,
    marginTop: height * 0.05,
    gap: 32,
  },
  optionsSection: {
    gap: 12,
  },
  sectionTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: "#333",
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionButton: {
    flex: 1,
    minWidth: "30%",
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  selectedOption: {
    backgroundColor: "#4F46E5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  optionText: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#4F46E5",
  },
  selectedOptionText: {
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
  },
  bottomContainer: {
    gap: 16,
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
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  disabledButton: {
    opacity: 0.7,
  },
  buttonText: {
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    fontSize: 18,
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
  optionEmoji: {
    fontSize: 24,
  },
});
