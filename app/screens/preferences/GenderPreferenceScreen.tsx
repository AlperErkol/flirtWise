import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

const genderOptions = [
  {
    id: "male",
    label: "Male",
    icon: "man-outline",
  },
  {
    id: "female",
    label: "Female",
    icon: "woman-outline",
  },

  {
    id: "other",
    label: "Other",
    icon: "person-outline",
  },
];

export default function GenderPreferenceScreen({ navigation }: any) {
  const [selectedGender, setSelectedGender] = useState("");
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);

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

      navigation.goBack();
    } catch (error) {
      console.error("Error saving preference:", error);
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header showBackButton title="Gender" />
      <View style={styles.container}>
        {genderOptions.map((option) => (
          <TouchableOpacity
            key={option.id}
            style={styles.menuItem}
            onPress={() => handleSave(option.id)}
          >
            <View style={styles.leftContent}>
              <Ionicons
                name={option.icon as any}
                size={20}
                color="#4F46E5"
                style={{ marginRight: 15 }}
              />
              <Text style={styles.menuText}>{option.label}</Text>
            </View>
            {selectedGender === option.id && (
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
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
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
    color: "#333",
    fontFamily: "Inter_500Medium",
  },
});
