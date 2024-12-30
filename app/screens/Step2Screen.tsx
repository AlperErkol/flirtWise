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
import { INTEREST_OPTIONS } from "@/constants/Options";

const { height } = Dimensions.get("window");

export default function Step2Screen({ navigation }: any) {
  const [selectedInterest, setSelectedInterest] = useState("");
  const { gender, age } = useLocalSearchParams();

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
        <Animated.View
          entering={FadeInRight}
          exiting={FadeOutLeft}
          style={styles.content}
        >
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
                    <Text
                      style={[
                        styles.optionText,
                        selectedInterest === option.id &&
                          styles.selectedOptionText,
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
                !selectedInterest && styles.disabledButton,
              ]}
              onPress={handleNext}
              disabled={!selectedInterest}
            >
              <Text style={styles.buttonText}>Continue</Text>
              <Ionicons name="arrow-forward" size={20} color="#fff" />
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              <View style={[styles.progressDot, styles.inactiveDot]} />
              <View style={styles.progressDot} />
              <View style={[styles.progressDot, styles.inactiveDot]} />
            </View>
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
    gap: 8,
    justifyContent: "center",
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#4F46E5",
  },
  inactiveDot: {
    opacity: 0.3,
  },
});
