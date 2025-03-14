import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import { INTEREST_OPTIONS } from "@/constants/wizard/options";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";
export default function MatchPreferenceScreen({ navigation }: any) {
  const [selectedInterest, setSelectedInterest] = useState("");
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);
  const { t } = useTranslation();

  useEffect(() => {
    loadInterestPreference();
  }, []);

  const loadInterestPreference = async () => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) {
        const { interest } = JSON.parse(profile);
        setSelectedInterest(interest);
      }
    } catch (error) {
      console.error("Error loading preference:", error);
    }
  };

  const handleSave = async (value: string) => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      const updatedProfile = profile ? JSON.parse(profile) : {};
      updatedProfile.interest = value;
      await AsyncStorage.setItem("userProfile", JSON.stringify(updatedProfile));
      await setUserProfile(updatedProfile);
      router.back();
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header showBackButton title={t("perfectMatch")} />
      <View style={styles.container}>
        {INTEREST_OPTIONS.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.menuItem}
            onPress={() => handleSave(option.id)}
          >
            <View style={styles.leftContent}>
              <Ionicons
                name={option.icon as any}
                size={20}
                color="#333"
                style={{ marginRight: 12 }}
              />
              <Text style={styles.menuText}>{t(option.label)}</Text>
            </View>

            {selectedInterest === option.id && (
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
  },

  emoji: {
    fontSize: 24,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#333",
    letterSpacing: -0.5,
  },
});
