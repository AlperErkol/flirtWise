import { useRevenueCat } from "./useRevenueCat";
import { Alert } from "react-native";
import { router } from "expo-router";
import { useTranslation } from "./useTranslation";
import Superwall from "@superwall/react-native-superwall";
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

  const showOnboardingPaywall = async () => {
    Superwall.shared.register({
      placement: "onboarding_trigger",
    });
  };

  const showPaywall = async () => {
    if (isProMember) {
      showAlreadyPremiumAlert();
      return;
    }
    Superwall.shared.register({
      placement: "campaign_trigger",
    });
  };

  return { showOnboardingPaywall, showPaywall };
};
