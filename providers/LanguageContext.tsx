import { createContext, useState, useCallback, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocales } from "expo-localization";
import { tr, en, fr, de, es } from "@/translations";

const translations = {
  tr,
  en,
  fr,
  de,
  es,
};

export type AvailableLanguages = keyof typeof translations;

type LanguageContextType = {
  currentLanguage: AvailableLanguages;
  setLanguage: (lang: AvailableLanguages) => Promise<void>;
  t: (key: string) => string;
};

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] =
    useState<AvailableLanguages>("en");

  useEffect(() => {
    initialize();
  }, []);

  const initialize = async () => {
    try {
      const storedLanguage = await AsyncStorage.getItem("userLanguage");
      if (storedLanguage && storedLanguage in translations) {
        setCurrentLanguage(storedLanguage as AvailableLanguages);
      } else {
        const deviceLanguage = getLocales()[0]
          .languageCode as AvailableLanguages;
        setCurrentLanguage(
          translations[deviceLanguage] ? deviceLanguage : "en"
        );
      }
    } catch (error) {
      console.error("Dil başlatılırken hata oluştu:", error);
    }
  };

  const setLanguage = async (language: AvailableLanguages) => {
    if (translations[language]) {
      setCurrentLanguage(language);
      await AsyncStorage.setItem("userLanguage", language);
    }
  };

  const t = useCallback(
    (key: string): string => {
      const translation = translations[currentLanguage] as Record<
        string,
        string
      >;
      return (
        translation[key] ||
        (translations.en as Record<string, string>)[key] ||
        key
      );
    },
    [currentLanguage]
  );

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
