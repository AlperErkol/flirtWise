import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LanguageItem from "@/components/LanguageItem";
import { getLocales } from "expo-localization";
import I18n from "@/lib/translations";
import { useTranslation } from "@/hooks/useTranslation";

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

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
      console.error(t("errors.language.loadError"), error);
    }
  };

  const handleLanguageSelect = async (languageId: string) => {
    try {
      setIsLoading(true);
      await I18n.setLanguage(languageId as any);
      setSelectedLanguage(languageId);
      setIsLoading(false);
    } catch (error) {
      console.error(t("errors.language.saveError"), error);
      setIsLoading(false);
    }
  };

  const LANGUAGES = [
    { id: "en", label: "English" },
    { id: "tr", label: "Türkçe" },
  ];

  return (
    <GlobalSafeAreaView>
      <Header logo showBackButton />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          {isLoading ? (
            <ActivityIndicator size="large" color="#FF6347" />
          ) : (
            LANGUAGES.map(({ id, label }) => (
              <LanguageItem
                key={id}
                id={id}
                label={label}
                isSelected={selectedLanguage === id}
                onSelect={handleLanguageSelect}
              />
            ))
          )}
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
});
