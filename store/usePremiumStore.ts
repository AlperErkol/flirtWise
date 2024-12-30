import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface PremiumState {
  isPremium: boolean;
  dailyMessageCount: number;
  dailyPhotoCount: number;
  lastResetDate: string;
  resetDaily: () => void;
  incrementMessageCount: () => Promise<boolean>;
  incrementPhotoCount: () => Promise<boolean>;
  setPremium: (status: boolean) => void;
}

export const usePremiumStore = create<PremiumState>((set, get) => ({
  isPremium: false,
  dailyMessageCount: 0,
  dailyPhotoCount: 0,
  lastResetDate: new Date().toDateString(),

  resetDaily: async () => {
    const today = new Date().toDateString();
    if (today !== get().lastResetDate) {
      set({
        dailyMessageCount: 0,
        dailyPhotoCount: 0,
        lastResetDate: today,
      });
      await AsyncStorage.setItem("lastResetDate", today);
      await AsyncStorage.setItem("dailyMessageCount", "0");
      await AsyncStorage.setItem("dailyPhotoCount", "0");
    }
  },

  incrementMessageCount: async () => {
    const { isPremium, dailyMessageCount } = get();
    if (isPremium) return true;
    if (dailyMessageCount >= 3) return false;

    const newCount = dailyMessageCount + 1;
    set({ dailyMessageCount: newCount });
    await AsyncStorage.setItem("dailyMessageCount", String(newCount));
    return true;
  },

  incrementPhotoCount: async () => {
    const { isPremium, dailyPhotoCount } = get();
    if (isPremium) return true;
    if (dailyPhotoCount >= 1) return false;

    const newCount = dailyPhotoCount + 1;
    set({ dailyPhotoCount: newCount });
    await AsyncStorage.setItem("dailyPhotoCount", String(newCount));
    return true;
  },

  setPremium: async (status: boolean) => {
    set({ isPremium: status });
    await AsyncStorage.setItem("isPremium", String(status));
  },
}));
