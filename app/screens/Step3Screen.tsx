import React, { useState } from "react";
import {
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import { saveUserProfile } from "@/utils/storage";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useLocalSearchParams } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Header from "@/components/Header";
import { EXPERIENCE_OPTIONS } from "@/constants/Options";

const { height } = Dimensions.get("window");

export default function Step3Screen({ navigation, route }: any) {
  const [selectedExperience, setSelectedExperience] = useState("");
  const [loading, setLoading] = useState(false);
  const { gender, age, interest } = route.params;
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);

  const handleComplete = async () => {
    if (selectedExperience) {
      setLoading(true);
      try {
        const userData = {
          gender,
          age,
          interest,
          experience: selectedExperience,
        };

        await saveUserProfile(userData);
        await AsyncStorage.setItem("onboardingCompleted", "true");
        setUserProfile(userData);
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.error("Error saving user data:", error);
      } finally {
        setLoading(false);
      }
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
              <Text style={styles.sectionTitle}>
                My flirting experience is...
              </Text>
              <View style={styles.optionsGrid}>
                {EXPERIENCE_OPTIONS.map((option) => (
                  <TouchableOpacity
                    key={option.id}
                    style={[
                      styles.optionButton,
                      selectedExperience === option.id && styles.selectedOption,
                    ]}
                    onPress={() => setSelectedExperience(option.id)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selectedExperience === option.id &&
                          styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    <Text
                      style={[
                        styles.optionDescription,
                        selectedExperience === option.id &&
                          styles.selectedDescriptionText,
                      ]}
                    >
                      {option.description}
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
                (!selectedExperience || loading) && styles.disabledButton,
              ]}
              onPress={handleComplete}
              disabled={!selectedExperience || loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Get Started</Text>
                  <Ionicons name="arrow-forward" size={20} color="#fff" />
                </>
              )}
            </TouchableOpacity>

            <View style={styles.progressContainer}>
              <View style={[styles.progressDot, styles.inactiveDot]} />
              <View style={[styles.progressDot, styles.inactiveDot]} />
              <View style={styles.progressDot} />
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

  optionText: {
    fontSize: 16,
    color: "#4F46E5",
    fontWeight: "600",
  },
  optionDescription: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  selectedDescriptionText: {
    color: "#fff",
    opacity: 0.9,
  },
  backButton: {
    padding: 8,
  },
  optionsGrid: {
    alignItems: "center", // Butonları yatayda ortalar
  },
  optionButton: {
    width: "100%", // Grid içinde tam genişlik
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "flex-start", // İçerikteki yazıları sola hizalar
  },
});
