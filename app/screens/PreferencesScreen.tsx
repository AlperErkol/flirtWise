import React, { useState, useEffect } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "../../store/profileStore";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  PERSONALITY_TRAIT_OPTIONS,
  RELATIONSHIP_GOAL_OPTIONS,
} from "@/constants/Options";
import Theme from "@/constants/Theme";

export default function PreferencesScreen({ navigation }: any) {
  const { setUserProfile }: any = useProfileStore();
  const [localProfile, setLocalProfile] = useState<any>({
    gender: "Female",
    ageRange: "18-24",
    relationshipGoal: "Friendship",
    personalityTrait: "Confidence",
  });
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("userProfile");
        if (storedProfile) {
          const parsedProfile = JSON.parse(storedProfile);
          setLocalProfile(parsedProfile);
          setUserProfile(parsedProfile);
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        Alert.alert("Error", "Failed to load preferences.");
      }
    };

    loadUserProfile();
  }, []);

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem("userProfile", JSON.stringify(localProfile));
      setUserProfile(localProfile);
      Alert.alert("Success!", "Your preferences have been saved.");
      setHasChanges(false);
      navigation.goBack();
    } catch (error) {
      console.error("Error saving preferences:", error);
      Alert.alert("Error!", "Failed to save your preferences.");
    }
  };

  const handleChange = (field: any, value: any) => {
    setLocalProfile({ ...localProfile, [field]: value });
    setHasChanges(true);
  };

  const renderOptions = (options: any, field: any) => {
    return options.map((option: any) => (
      <TouchableOpacity
        key={option.value}
        style={[styles.optionItem]}
        onPress={() => handleChange(field, option.value)}
      >
        <Text style={styles.optionText}>{option.label}</Text>
        {localProfile[field] === option.value && (
          <Text style={styles.checkMark}>✓</Text>
        )}
      </TouchableOpacity>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {localProfile ? (
        <>
          <Text style={styles.label}>Gender</Text>
          {renderOptions(GENDER_OPTIONS, "gender")}
          <Text style={styles.label}>Age Range</Text>
          {renderOptions(AGE_OPTIONS, "ageRange")}
          <Text style={styles.label}>Relationship Goal</Text>
          {renderOptions(RELATIONSHIP_GOAL_OPTIONS, "relationshipGoal")}
          <Text style={styles.label}>Personality Trait to Improve</Text>
          {renderOptions(PERSONALITY_TRAIT_OPTIONS, "personalityTrait")}
          <TouchableOpacity
            style={[
              styles.saveButton,
              { backgroundColor: hasChanges ? Theme.colors.primary : "#ccc" },
            ]}
            onPress={handleSave}
            disabled={!hasChanges}
          >
            <Text style={styles.saveButtonText}>Save Preferences</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text>Loading preferences...</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
  },

  scrollContainer: {
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  label: {
    fontSize: 20,
    marginVertical: 10,
    paddingLeft: 15,
    color: "#333",
    fontWeight: "bold",
  },

  optionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingHorizontal: 15,
  },

  optionText: {
    fontSize: 15,
    fontWeight: "600",
    color: Theme.colors.text,
  },

  checkMark: {
    fontSize: 15,
    fontWeight: "bold",
    color: Theme.colors.primary,
  },

  saveButton: {
    marginTop: 20,
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },

  saveButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});
