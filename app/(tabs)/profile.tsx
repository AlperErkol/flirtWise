import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";
const preferenceItems = [
  {
    id: "1",
    title: "gender",
    screen: "preferences/GenderPreferenceScreen",
    icon: "man",
    key: "gender",
    getDisplayValue: (value: string) => {
      const options = {
        male: "male",
        female: "female",
        other: "other",
      };
      return options[value as keyof typeof options] || "notSet";
    },
  },
  {
    id: "2",
    title: "ageRange",
    screen: "preferences/AgePreferenceScreen",
    icon: "calendar",
    key: "age",
    getDisplayValue: (value: string) => value || "notSet",
  },
  {
    id: "3",
    title: "perfectMatch",
    screen: "preferences/MatchPreferenceScreen",
    icon: "heart",
    key: "interest",
    getDisplayValue: (value: string) => {
      const options = {
        men: "men",
        women: "women",
        both: "both",
      };
      return options[value as keyof typeof options] || "notSet";
    },
  },
];

export default function PreferencesScreen({ navigation }: any) {
  const [userProfile, setUserProfile] = useState<any>({});
  const { t } = useTranslation();

  useEffect(() => {
    loadUserProfile();
  }, []);

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
      <View style={styles.headerContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.headerTitle}>Profile</Text>
        </View>
        <Text style={styles.headerDescription}>
          {t("preferencesDescription")}
        </Text>
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.wrapper}>
          {preferenceItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => router.push(item.screen as any)}
            >
              <View style={styles.leftContent}>
                <Ionicons
                  name={item.icon as any}
                  size={20}
                  color="#333"
                  style={{ marginRight: 15 }}
                />

                <Text style={styles.menuText}>{t(item.title)}</Text>
              </View>
              <View style={styles.rightContent}>
                <Text style={styles.valueText}>
                  {t(item.getDisplayValue(userProfile[item.key]))}
                </Text>
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#333"
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
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
    gap: 12,
    padding: 16,
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
    letterSpacing: -0.5,
  },
  emoji: {
    fontSize: 18,
    marginRight: 15,
  },
  menuText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#333",
    letterSpacing: -0.5,
  },
  headerContainer: {
    paddingTop: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
  },
  headerDescription: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    marginBottom: 16,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  footer: {
    alignItems: "center",
    marginTop: 16,
  },
  logo: {
    width: 120,
    height: 32,
    resizeMode: "contain",
  },
});
