import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageItem from "@/components/LanguageItem";
import { getLocales } from "expo-localization";
import I18n from "@/lib/translations";

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("");

  useEffect(() => {
    loadCurrentLanguage();
  }, []);

  const loadCurrentLanguage = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem("userLanguage");
      if (storedLanguage) {
        setSelectedLanguage(storedLanguage);
      } else {
        const deviceLanguage = getLocales()[0].languageCode;
        setSelectedLanguage(deviceLanguage || "en");
      }
    } catch (error) {
      console.error("An error occurred while loading the language:", error);
    }
  };

  const handleLanguageSelect = async (languageId: string) => {
    try {
      await AsyncStorage.setItem("userLanguage", languageId);
      await I18n.setLanguage(languageId as any);
      setSelectedLanguage(languageId);
    } catch (error) {
      console.error("An error occurred while saving the language:", error);
    }
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {Object.entries(I18n.t("settings.languages")).map(([id, label]) => (
            <LanguageItem
              key={id}
              id={id}
              label={label as string}
              isSelected={selectedLanguage === id}
              onSelect={handleLanguageSelect}
            />
          ))}
        </View>
      </ScrollView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    paddingTop: Theme.spacing.vertical,
  },
  headerContainer: {
    padding: Theme.spacing.horizontal,
  },
  description: {
    fontSize: 16,
    color: Theme.colors.textLight,
    fontFamily: "Inter_400Regular",
  },
});
