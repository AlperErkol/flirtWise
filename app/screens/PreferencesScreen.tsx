import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  EXPERIENCE_OPTIONS,
  INTEREST_OPTIONS,
} from "@/constants/Options";
import Theme from "@/constants/Theme";
import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

type ProfileType = {
  gender: string;
  age: string;
  interest: string;
  experience: string;
};

export default function PreferencesScreen({ navigation }: any) {
  const { setUserProfile }: any = useProfileStore();
  const [localProfile, setLocalProfile] = useState<ProfileType>({
    gender: "",
    age: "",
    interest: "",
    experience: "",
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    loadUserProfile();
  }, []);

  const loadUserProfile = async () => {
    try {
      const storedProfile = await AsyncStorage.getItem("userProfile");
      if (storedProfile) {
        const parsedProfile = JSON.parse(storedProfile);
        setLocalProfile(parsedProfile);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load preferences.");
    }
  };

  const handleChange = (field: any, value: any) => {
    setLocalProfile({ ...localProfile, [field]: value });
    setHasChanges(true);
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(localProfile));
      setUserProfile(localProfile);
      Alert.alert("Success!", "Your preferences have been saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save preferences.");
    }
  };

  const renderSection = (
    title: string,
    options: Array<{ id: string; label: string }>,
    field: keyof ProfileType
  ) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View style={styles.optionsContainer}>
        {options.map((option: any) => (
          <TouchableOpacity
            key={option.id}
            style={[
              styles.optionButton,
              localProfile[field] === option.id && styles.selectedOption,
            ]}
            onPress={() => handleChange(field, option.id)}
          >
            <Text
              style={[
                styles.optionText,
                localProfile[field] === option.id && styles.selectedOptionText,
              ]}
            >
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  return (
    <LinearGradient colors={["#E6E6FA", "#E6E6FA"]} style={styles.container}>
      <GlobalSafeAreaView>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
        >
          {renderSection("Gender", GENDER_OPTIONS, "gender")}
          {renderSection("Age Range", AGE_OPTIONS, "age")}
          {renderSection("Relationship Goal", INTEREST_OPTIONS, "interest")}
          {renderSection(
            "Flirting Experience",
            EXPERIENCE_OPTIONS,
            "experience"
          )}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.saveButton, !hasChanges && styles.disabledButton]}
            onPress={handleSave}
            disabled={!hasChanges}
          >
            <Text style={styles.saveButtonText}>Save Changes</Text>
            {hasChanges && <Ionicons name="checkmark" size={24} color="#fff" />}
          </TouchableOpacity>
        </View>
      </GlobalSafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
    paddingBottom: 120,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  selectedOption: {
    backgroundColor: Theme.colors.primary,
    borderColor: Theme.colors.primary,
  },
  optionText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
  selectedOptionText: {
    color: "#FFF",
    fontWeight: "600",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    backgroundColor: "rgba(230, 230, 250, 0.9)", // Hafif saydam arka plan
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
    padding: 16,
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
    opacity: 0.5,
  },
  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
