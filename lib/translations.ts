import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tr, en, fr, de, es } from "@/translations";

const translations = {
  tr,
  en,
  fr,
  de,
  es,
};

export type AvailableLanguages = keyof typeof translations;

class I18n {
  private static currentLanguage: AvailableLanguages = "en";

  static async initialize() {
    try {
      const storedLanguage = await AsyncStorage.getItem("userLanguage");
      if (storedLanguage && storedLanguage in translations) {
        this.currentLanguage = storedLanguage as AvailableLanguages;
      } else {
        const deviceLanguage = getLocales()[0]
          .languageCode as AvailableLanguages;
        this.currentLanguage = translations[deviceLanguage]
          ? deviceLanguage
          : "en";
      }
    } catch (error) {
      console.error(
        "An error occurred while initializing the language:",
        error
      );
    }
  }

  static async setLanguage(language: AvailableLanguages) {
    if (translations[language]) {
      this.currentLanguage = language;
      await AsyncStorage.setItem("userLanguage", language);
    }
  }

  static t(key: string): string {
    const translation = translations[this.currentLanguage] as Record<
      string,
      string
    >;
    return (
      translation[key] ||
      (translations.en as Record<string, string>)[key] ||
      key
    );
  }
}

export default I18n;
