import { Alert, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORE_ID } from "@/constants/settings/urls";

export const useRateUs = () => {
  const checkAndShowRateUs = async () => {
    try {
      const hasRated = await AsyncStorage.getItem("hasRated");
      const appOpenCount = Number(
        (await AsyncStorage.getItem("appOpenCount")) || "0"
      );

      if (hasRated === "true") return;

      if (appOpenCount >= 1) {
        showRateUsAlert();
      } else {
        await AsyncStorage.setItem("appOpenCount", String(appOpenCount + 1));
      }
    } catch (error) {
      console.error("Rate Us check failed:", error);
    }
  };

  const showRateUsAlert = () => {
    Alert.alert(
      "Enjoying FlirtWise?",
      "Would you mind taking a moment to rate us?",
      [
        {
          text: "Not Now",
          style: "cancel",
        },
        {
          text: "Rate Now",
          onPress: handleRatePress,
        },
      ]
    );
  };

  const handleRatePress = async () => {
    const storeUrl = Platform.select({
      ios: `itms-apps://apps.apple.com/app/id${APP_STORE_ID}?action=write-review`,
    });

    try {
      await AsyncStorage.setItem("hasRated", "true");
      await Linking.openURL(storeUrl || "");
    } catch (error) {
      console.error("Failed to open store:", error);
    }
  };

  return { checkAndShowRateUs };
};
