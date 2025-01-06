import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { useLocalSearchParams } from "expo-router";

const { height } = Dimensions.get("window");

const INTEREST_OPTIONS = [
  { id: "men", label: "Men", emoji: "👨" },
  { id: "women", label: "Women", emoji: "👩" },
  { id: "both", label: "Both", emoji: "👥" },
];

export default function Step2Screen({ navigation, route }: any) {
  const [selectedInterest, setSelectedInterest] = useState("");
  const { age, gender } = route.params;

  const handleNext = () => {
    if (selectedInterest) {
      navigation.navigate("Step3", {
        gender,
        age,
        interest: selectedInterest,
      });
    }
  };

  return (
    <LinearGradient colors={["#E6E6FA", "#E6E6FA"]} style={styles.container}>
      <GlobalSafeAreaView>
        <Header logo={true} showBackButton={true} />

        <View style={styles.progressContainer}>
          <View style={[styles.progressLine]} />
          <View style={[styles.progressLine]} />
          <View style={[styles.progressLine, styles.inactiveLine]} />
          <View style={[styles.progressLine, styles.inactiveLine]} />
        </View>

        <Animated.View
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.content}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.emoji}>💝</Text>
            <Text style={styles.title}>Perfect Match</Text>
            <Text style={styles.subtitle}>
              Let us know who catches your eye
            </Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.optionsSection}>
              <Text style={styles.sectionTitle}>I'm interested in...</Text>
              <View style={styles.optionsGrid}>
                {INTEREST_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedInterest === option.id && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedInterest(option.id)}
                  >
                    <View style={styles.optionContent}>
                      <Text style={styles.optionEmoji}>{option.emoji}</Text>
                      <Text
                        style={[
                          styles.optionText,
                          selectedInterest === option.id &&
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
          </View>

          <View style={styles.bottomContainer}>
            <TouchableOpacity
              style={[
                styles.nextButton,
                !selectedInterest && styles.disabledButton,
              ]}
              onPress={handleNext}
              disabled={!selectedInterest}
            >
              <Text style={styles.buttonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GlobalSafeAreaView>
    </LinearGradient>
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
    fontSize: 18,
    fontWeight: "600",
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
    fontSize: 16,
    color: "#4F46E5",
  },
  selectedOptionText: {
    color: "#FFF",
    fontWeight: "600",
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
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
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
    alignItems: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 48,
    color: "#4F46E5",
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionEmoji: {
    fontSize: 24,
    color: "#4F46E5",
  },
});
