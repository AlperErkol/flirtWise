import { Alert } from "react-native";
import { router } from "expo-router";
import { usePremiumStore } from "@/store/usePremiumStore";

export const usePremiumCheck = () => {
  const { isPremium } = usePremiumStore();

  const showPremiumAlert = () => {
    Alert.alert(
      "Premium Feature",
      "This feature requires Premium+ subscription. Upgrade now to unlock unlimited access!",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Upgrade to Premium+",
          onPress: () => router.push("/screens/SettingsScreen"),
        },
      ]
    );
  };

  return { isPremium, showPremiumAlert };
};
