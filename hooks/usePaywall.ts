import { useRevenueCat } from "./useRevenueCat";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "./useTranslation";
export const usePaywall = () => {
  const { isProMember } = useRevenueCat();
  const { t } = useTranslation();

  const showAlreadyPremiumAlert = () => {
    Alert.alert(
      t("activePremiumSubscription"),
      t("alreadyHaveActivePremiumSubscription"),
      [{ text: t("done"), style: "default" }],
      { cancelable: true }
    );
  };

  const showPaywall = async () => {
    if (isProMember) {
      showAlreadyPremiumAlert();
      return;
    }
    router.push("/paywall");
  };

  return { showPaywall };
};
