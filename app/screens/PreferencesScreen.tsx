import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useProfileStore from "@/store/profileStore";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Theme from "@/constants/Theme";
import Header from "@/components/Header";
import {
  AGE_OPTIONS,
  GENDER_OPTIONS,
  COMMUNICATION_STYLES,
  INTEREST_AREAS,
  INTEREST_OPTIONS,
} from "@/constants/wizard/options";
import { Ionicons } from "@expo/vector-icons";

type ProfileType = {
  gender: string;
  age: string;
  interest: string;
  communicationStyle: string;
  interests: string[];
};

type Section = {
  title: string;
  options: Array<{ id: string; label: string; description?: string }>;
  field: keyof ProfileType;
  multiSelect?: boolean;
};

type AccordionSectionProps = {
  section: Section;
  selectedValue: string;
  onChange: (field: keyof ProfileType, value: string) => void;
  isOpen: boolean;
  onToggle: () => void;
};

const AccordionSection = React.memo(
  ({
    section,
    selectedValue,
    onChange,
    isOpen,
    onToggle,
  }: AccordionSectionProps) => {
    return (
      <View style={styles.accordionContainer}>
        <TouchableOpacity
          style={[
            styles.accordionHeader,
            isOpen && styles.accordionHeaderActive,
          ]}
          onPress={onToggle}
        >
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.headerRight}>
            {selectedValue && (
              <Text
                style={[
                  styles.selectedValueText,
                  isOpen && styles.selectedValueTextActive,
                ]}
              >
                {section.options.find((opt) => opt.id === selectedValue)?.label}
              </Text>
            )}
            {isOpen ? (
              <Ionicons
                name="chevron-up"
                size={20}
                color={isOpen ? "#4F46E5" : "#6B7280"}
              />
            ) : (
              <Ionicons
                name="chevron-down"
                size={20}
                color={isOpen ? "#4F46E5" : "#6B7280"}
              />
            )}
          </View>
        </TouchableOpacity>

        {isOpen && (
          <Animated.View
            entering={FadeInRight.duration(200)}
            exiting={FadeOutLeft.duration(200)}
            style={styles.optionsContainer}
          >
            <View style={styles.optionsSection}>
              {section.options.map((option, index) => (
                <TouchableOpacity
                  key={option.id}
                  style={[
                    styles.optionButton,
                    index !== section.options.length - 1 && styles.optionBorder,
                    selectedValue === option.id && styles.selectedOption,
                  ]}
                  onPress={() => onChange(section.field, option.id)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedValue === option.id && styles.selectedOptionText,
                    ]}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </Animated.View>
        )}
      </View>
    );
  }
);

export default function PreferencesScreen({ navigation }: any) {
  const setUserProfile = useProfileStore((state: any) => state.setUserProfile);
  const [localProfile, setLocalProfile] = useState<ProfileType>({
    gender: "",
    age: "",
    interest: "",
    communicationStyle: "",
    interests: [],
  });
  const [hasChanges, setHasChanges] = useState(false);
  const [saving, setSaving] = useState(false);
  const [openSection, setOpenSection] = useState<keyof ProfileType | null>(
    null
  );

  const sections: Section[] = [
    { title: "Gender", options: GENDER_OPTIONS, field: "gender" },
    { title: "Age Range", options: AGE_OPTIONS, field: "age" },
    {
      title: "Perfect Match",
      options: INTEREST_OPTIONS,
      field: "interest",
    },
    {
      title: "Communication Style",
      options: COMMUNICATION_STYLES,
      field: "communicationStyle",
    },
    {
      title: "Interest Areas",
      options: INTEREST_AREAS,
      field: "interests",
      multiSelect: true,
    },
  ];

  useEffect(() => {
    let isSubscribed = true;

    const loadProfile = async () => {
      try {
        const storedProfile = await AsyncStorage.getItem("userProfile");
        if (storedProfile && isSubscribed) {
          setLocalProfile(JSON.parse(storedProfile));
        }
      } catch (error) {
        if (isSubscribed) {
          Alert.alert("Error", "Failed to load preferences.");
        }
      }
    };

    loadProfile();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleChange = useCallback(
    (field: keyof ProfileType, value: string) => {
      setLocalProfile((prev) => ({ ...prev, [field]: value }));
      setHasChanges(true);
    },
    []
  );

  const handleSave = useCallback(async () => {
    setSaving(true);
    try {
      await Promise.all([
        AsyncStorage.setItem("userProfile", JSON.stringify(localProfile)),
        setUserProfile(localProfile),
      ]);
      Alert.alert("Success!", "Your preferences have been saved.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save preferences.");
    } finally {
      setSaving(false);
    }
  }, [localProfile, setUserProfile, navigation]);

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name="star" size={20} color="#4F46E5" />
          <Text style={styles.headerTitle}>AI Personalization</Text>
        </View>
        <Text style={styles.headerDescription}>
          Your preferences enable our AI to understand your context better and
          provide more accurate, personalized responses in conversations.
        </Text>
      </View>
      <View style={styles.contentContainer}>
        <View>
          {sections.map((section) => (
            <AccordionSection
              key={section.field}
              section={section}
              selectedValue={localProfile[section.field] as any}
              onChange={handleChange}
              isOpen={openSection === section.field}
              onToggle={() =>
                setOpenSection(
                  openSection === section.field ? null : section.field
                )
              }
            />
          ))}
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.saveButton,
              (!hasChanges || saving) && styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={!hasChanges || saving}
          >
            <Text style={styles.saveButtonText}>
              {saving ? "Saving..." : "Save Changes"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 20,
    flex: 1,
  },
  accordionContainer: {
    backgroundColor: "white",
    marginBottom: 8,
    borderRadius: 12,
    overflow: "hidden",
    borderColor: "#D6BDF7",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  accordionHeaderActive: {
    backgroundColor: "#F9FAFB",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  selectedValueText: {
    fontSize: 15,
    color: "#6B7280",
  },
  selectedValueTextActive: {
    color: "#4F46E5",
  },
  optionsContainer: {
    backgroundColor: "#F9FAFB",
  },
  optionsSection: {
    padding: 12,
  },
  optionButton: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    flexDirection: "column",
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  optionBorder: {
    borderBottomWidth: 0,
  },
  selectedOption: {
    backgroundColor: "#4F46E5",
  },
  optionText: {
    fontSize: 15,
    color: "#374151",
  },
  selectedOptionText: {
    color: "#FFFFFF",
    fontWeight: "500",
  },
  optionDescription: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },
  selectedDescriptionText: {
    color: "#FFFFFF",
    opacity: 0.9,
  },
  saveButton: {
    backgroundColor: Theme.colors.primary,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonDisabled: {
    backgroundColor: "#9CA3AF",
    opacity: 0.5,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomContainer: {
    borderRadius: 10,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    width: "100%",
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 8,
  },
  headerDescription: {
    fontSize: 14,
    lineHeight: 17,
    color: "#6B7280",
    letterSpacing: 0.2,
  },
  headerContainer: {
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});
