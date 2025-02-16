import { getLocales } from "expo-localization";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { tr, en } from "@/translations";

const translations = {
  tr,
  en,
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
      console.error("Dil başlatılırken hata:", error);
    }
  }

  static async setLanguage(language: AvailableLanguages) {
    if (translations[language]) {
      this.currentLanguage = language;
      await AsyncStorage.setItem("userLanguage", language);
    }
  }

  static t(key: string) {
    const keys = key.split(".");
    let translation: any = translations[this.currentLanguage];

    for (const k of keys) {
      if (translation[k]) {
        translation = translation[k];
      } else {
        return key;
      }
    }

    return translation;
  }
}

export default I18n;
