import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Octicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PERSONALITY_TRAIT_OPTIONS } from "@/constants/Options";
import useProfileStore from "@/store/profileStore";
import { saveUserProfile } from "@/utils/storage";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";

export default function Step3Screen({ navigation, route }: any) {
  const { gender, ageRange, relationshipGoal } = route.params;
  const [personalityTrait, setPersonalityTrait] = useState(null);
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);

  const handleComplete = async () => {
    if (!personalityTrait) {
      Alert.alert("Warning", "Please select a personality trait.");
      return;
    }

    const userProfile = {
      gender,
      ageRange,
      relationshipGoal,
      personalityTrait,
      createdAt: new Date(),
    };

    try {
      await saveUserProfile(userProfile);
      await AsyncStorage.setItem("onboardingCompleted", "true");
      setUserProfile(userProfile);
      navigation.navigate("HomeScreen");
    } catch (error) {
      console.error("Error saving profile:", error);
      Alert.alert("Error", "Failed to save your profile. Please try again.");
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <GlobalSafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Octicons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.progressBar}>
          <Octicons
            name="dot-fill"
            size={24}
            color="#FF6347"
            style={styles.dot}
          />
          <Octicons
            name="dot-fill"
            size={24}
            color="#FF6347"
            style={styles.dot}
          />
          <Octicons
            name="dot-fill"
            size={24}
            color="#FF6347"
            style={styles.dot}
          />
        </View>
      </View>

      <Text style={styles.title}>Select the Trait You Want to Improve</Text>

      {PERSONALITY_TRAIT_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionButton,
            personalityTrait === option.value && styles.selectedOption,
          ]}
          onPress={() => setPersonalityTrait(option.value as any)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
        <Text style={styles.completeButtonText}>Complete Onboarding</Text>
      </TouchableOpacity>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  dot: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  selectedOption: {
    backgroundColor: "#FF6347",
    borderColor: "#FF6347",
  },
  optionText: { fontSize: 15, textAlign: "center", fontWeight: "600" },
  completeButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 8,
  },
  completeButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
