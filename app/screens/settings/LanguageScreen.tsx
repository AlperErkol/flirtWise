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
import LanguageItem from "@/components/LanguageItem";
import { useTranslation } from "@/hooks/useTranslation";

export default function LanguageScreen() {
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t, currentLanguage, setLanguage } = useTranslation();

  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  const handleLanguageSelect = async (languageId: string) => {
    try {
      setIsLoading(true);
      await setLanguage(languageId as any);
      setSelectedLanguage(languageId);
    } catch (error) {
      console.error(t("errors.language.saveError"), error);
    } finally {
      setIsLoading(false);
    }
  };

  const LANGUAGES = [
    { id: "en", label: "English" },
    { id: "tr", label: "Türkçe" },
    { id: "fr", label: "Français" },
    { id: "de", label: "Deutsch" },
    { id: "es", label: "Español" },
  ];

  return (
    <GlobalSafeAreaView>
      <Header showBackButton logo />
      <ScrollView style={styles.container}>
        {isLoading && (
          <ActivityIndicator
            size="large"
            color={Theme.colors.primary}
            style={styles.loader}
          />
        )}
        {LANGUAGES.map((lang) => (
          <LanguageItem
            key={lang.id}
            id={lang.id}
            label={lang.label}
            isSelected={selectedLanguage === lang.id}
            onSelect={handleLanguageSelect}
          />
        ))}
      </ScrollView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loader: {
    marginVertical: Theme.spacing.vertical,
  },
});
