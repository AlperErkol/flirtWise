import { Alert, Linking, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { APP_STORE_ID } from "@/constants/settings/urls";
import { useTranslation } from "./useTranslation";

export const useRateUs = () => {
  const { t } = useTranslation();

  const checkAndShowRateUs = async () => {
    try {
      const hasRated = await AsyncStorage.getItem("hasRated");
      const actionCount = Number(
        (await AsyncStorage.getItem("userActionCount")) || "0"
      );

      if (hasRated === "true") return;

      if (actionCount >= 3) {
        showRateUsAlert();
      }
    } catch (error) {
      console.error("Rate Us check failed:", error);
    }
  };

  const incrementActionCount = async () => {
    try {
      const currentCount = Number(
        (await AsyncStorage.getItem("userActionCount")) || "0"
      );
      await AsyncStorage.setItem("userActionCount", String(currentCount + 1));
    } catch (error) {
      console.error("Failed to increment action count:", error);
    }
  };

  const showRateUsAlert = () => {
    Alert.alert(t("enjoyingFlirtWise"), t("wouldYouMindTaking"), [
      {
        text: t("notNow"),
        style: "cancel",
      },
      {
        text: t("rateNow"),
        onPress: handleRatePress,
      },
    ]);
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

  return { checkAndShowRateUs, incrementActionCount };
};
