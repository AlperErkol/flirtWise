import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";
import { GENDER_OPTIONS } from "@/constants/wizard/options";

export default function GenderPreferenceScreen({ navigation }: any) {
  const [selectedGender, setSelectedGender] = useState("");
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);
  const { t } = useTranslation();

  useEffect(() => {
    loadGenderPreference();
  }, []);

  const loadGenderPreference = async () => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) {
        const { gender } = JSON.parse(profile);
        setSelectedGender(gender);
      }
    } catch (error) {
      console.error("Error loading preference:", error);
    }
  };

  const handleSave = async (value: string) => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      const updatedProfile = profile ? JSON.parse(profile) : {};
      updatedProfile.gender = value;

      await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      await setUserProfile(updatedProfile);

      router.back();
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header showBackButton title={t("gender")} />
      <View style={styles.container}>
        {GENDER_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.menuItem}
            onPress={() => handleSave(option.id)}
          >
            <View style={styles.leftContent}>
              <Ionicons name={option.icon as any} size={20} color="#333" />
              <Text style={styles.menuText}>{t(option.label)}</Text>
            </View>
            {selectedGender === option.id && (
              <Ionicons name="checkmark" size={20} color="#4F46E5" />
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
    gap: 12,
  },
  emoji: {
    fontSize: 24,
    marginRight: 12,
  },
  menuText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#333",
    letterSpacing: -0.5,
  },
});
