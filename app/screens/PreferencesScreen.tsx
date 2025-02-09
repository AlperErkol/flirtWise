import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";

const preferenceItems = [
  {
    id: "1",
    title: "Gender",
    screen: "GenderPreferenceScreen",
    icon: "man-outline",
    key: "gender",
    getDisplayValue: (value: string) => {
      const options = {
        male: "Male",
        female: "Female",
        other: "Other",
      };
      return options[value as keyof typeof options] || "Not set";
    },
  },
  {
    id: "2",
    title: "Age Range",
    screen: "AgePreferenceScreen",
    icon: "calendar-outline",
    key: "age",
    getDisplayValue: (value: string) => value || "Not set",
  },
  {
    id: "3",
    title: "Perfect Match",
    screen: "MatchPreferenceScreen",
    icon: "heart-outline",
    key: "interest",
    getDisplayValue: (value: string) => {
      const options = {
        men: "Men",
        women: "Women",
        both: "Both",
      };
      return options[value as keyof typeof options] || "Not set";
    },
  },
];

export default function PreferencesScreen({ navigation }: any) {
  const [userProfile, setUserProfile] = useState<any>({});

  useEffect(() => {
    loadUserProfile();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadUserProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const loadUserProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem("userProfile");
      if (profile) {
        setUserProfile(JSON.parse(profile));
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Ionicons name="sparkles-outline" size={24} color="#4F46E5" />
          <Text style={styles.headerTitle}>AI Personalization</Text>
        </View>
        <Text style={styles.headerDescription}>
          Customize your preferences to help our AI better understand your
          unique style and context, delivering more accurate, engaging, and
          personalized responses in your conversations.
        </Text>
      </View>
      <View style={styles.wrapper}>
        {preferenceItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={() => navigation.navigate(item.screen)}
          >
            <View style={styles.leftContent}>
              <Ionicons
                name={item.icon as any}
                size={20}
                color="#4F46E5"
                style={{ marginRight: 15 }}
              />
              <Text style={styles.menuText}>{item.title}</Text>
            </View>
            <View style={styles.rightContent}>
              <Text style={styles.valueText}>
                {item.getDisplayValue(userProfile[item.key])}
              </Text>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    marginTop: 20,
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
  rightContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  valueText: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Inter_400Regular",
  },
  emoji: {
    fontSize: 18,
    marginRight: 15,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    fontFamily: "Inter_600SemiBold",
  },
  headerContainer: {
    paddingTop: 16,
    paddingHorizontal: 15,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
  },
  headerDescription: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
});
