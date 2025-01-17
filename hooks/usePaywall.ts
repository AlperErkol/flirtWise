import RevenueCatUI, { PAYWALL_RESULT } from "react-native-purchases-ui";
import { useRevenueCat } from "./useRevenueCat";
import { Alert } from "react-native";

export const usePaywall = () => {
  const { checkPremiumStatus } = useRevenueCat();

  const showAlreadyPremiumAlert = () => {
    Alert.alert(
      "Active Premium+ Subscription",
      "You already have an active Premium+ subscription. You can access all premium features.",
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    );
  };

  const showPaywall = async (): Promise<boolean> => {
    console.log("Initiating paywall");
    try {
      const paywallResult = await RevenueCatUI.presentPaywallIfNeeded({
        requiredEntitlementIdentifier: "pro",
      });
      console.log("Paywall result:", paywallResult);

      switch (paywallResult) {
        case PAYWALL_RESULT.PURCHASED:
          console.log("Purchase successful");
          await checkPremiumStatus();
          return true;
        case PAYWALL_RESULT.RESTORED:
          console.log("Purchase restored");
          await checkPremiumStatus();
          return true;
        case PAYWALL_RESULT.NOT_PRESENTED:
          console.log("Paywall not shown (User already premium)");
          showAlreadyPremiumAlert();
          return false;
        case PAYWALL_RESULT.ERROR:
          console.log("Paywall error");
          return false;
        case PAYWALL_RESULT.CANCELLED:
          console.log("User cancelled");
          return false;
        default:
          console.log("Unknown result:", paywallResult);
          return false;
      }
    } catch (error) {
      console.error("Paywall error:", error);
      return false;
    }
  };

  return { showPaywall };
};
