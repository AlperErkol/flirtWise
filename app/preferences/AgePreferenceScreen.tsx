import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { AGE_OPTIONS } from "@/constants/wizard/options";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";
export default function AgePreferenceScreen() {
  const [selectedAge, setSelectedAge] = useState("");
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);
  const { t } = useTranslation();

  useEffect(() => {
    loadAgePreference();
  }, []);

  const loadAgePreference = async () => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) {
        const { age } = JSON.parse(profile);
        setSelectedAge(age);
      }
    } catch (error) {
      console.error("Error loading preference:", error);
    }
  };

  const handleSave = async (value: string) => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      const updatedProfile = profile ? JSON.parse(profile) : {};
      updatedProfile.age = value;

      await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      await setUserProfile(updatedProfile);

      router.back();
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header showBackButton title={t("ageRange")} />
      <View style={styles.container}>
        {AGE_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.menuItem}
            onPress={() => handleSave(option.id)}
          >
            <View style={styles.leftContent}>
              <Text style={styles.menuText}>{option.label}</Text>
            </View>
            {selectedAge === option.id && (
              <Ionicons name="checkmark" size={24} color="#4F46E5" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  leftContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    fontSize: 16,
    color: "#333",
    fontFamily: "Inter_500Medium",
  },
});
