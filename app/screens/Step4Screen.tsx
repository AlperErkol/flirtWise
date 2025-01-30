import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import Header from "@/components/Header";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import { saveUserProfile } from "@/store";
import { INTEREST_AREAS } from "@/constants/wizard/options";

export default function Step4Screen({ navigation, route }: any) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const { gender, age, interest, communicationStyle } = route.params;
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== id));
    } else if (selectedInterests.length < 3) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleComplete = async () => {
    if (selectedInterests.length > 0) {
      try {
        const userData = {
          gender,
          age,
          interest,
          communicationStyle,
          interests: selectedInterests,
        };
        await saveUserProfile(userData);
        await AsyncStorage.setItem("onboardingCompleted", "true");
        setUserProfile(userData);
        navigation.navigate("HomeScreen");
      } catch (error) {
        console.error("Error saving user data:", error);
      }
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />

      <View style={styles.progressContainer}>
        <View style={[styles.progressLine]} />
        <View style={[styles.progressLine]} />
        <View style={[styles.progressLine]} />
        <View style={[styles.progressLine]} />
      </View>

      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.content}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.emoji}>🎯</Text>
          <Text style={styles.title}>Your Interests</Text>
          <Text style={styles.subtitle}>
            Choose up to 3 topics you love talking about
          </Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.optionsGrid}>
            {INTEREST_AREAS.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={[
                  styles.optionButton,
                  selectedInterests.includes(item.id) && styles.selectedOption,
                ]}
                onPress={() => toggleInterest(item.id)}
              >
                <View style={styles.optionContent}>
                  <Text style={styles.optionEmoji}>{item.emoji}</Text>
                  <Text
                    style={[
                      styles.optionText,
                      selectedInterests.includes(item.id) &&
                        styles.selectedOptionText,
                    ]}
                  >
                    {item.label}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.nextButton,
              selectedInterests.length === 0 && styles.disabledButton,
            ]}
            onPress={handleComplete}
            disabled={selectedInterests.length === 0}
          >
            <Text style={styles.buttonText}>Get Started</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.termsText}>
            By continuing, you agree to FlirtWise{" "}
            <Text
              style={styles.linkText}
              // onPress={() => router.push("/privacy")}
            >
              Privacy Policy
            </Text>{" "}
            and <Text style={styles.linkText}>Terms of Use</Text>
          </Text>
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
    marginBottom: 100,
  },
  optionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    paddingBottom: 24,
  },
  optionButton: {
    width: "47%",
    backgroundColor: "rgba(79, 70, 229, 0.1)",
    padding: 12,
    borderRadius: 12,
  },
  selectedOption: {
    backgroundColor: "#4F46E5",
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  optionEmoji: {
    fontSize: 24,
  },
  optionText: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#4F46E5",
    flex: 1,
  },
  selectedOptionText: {
    color: "#FFF",
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
  termsText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 12,
  },
  linkText: {
    fontFamily: "Inter_500Medium",
    color: "#4F46E5",
    textDecorationLine: "underline",
  },
});
