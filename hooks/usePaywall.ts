import { useRevenueCat } from "./useRevenueCat";
import { Alert } from "react-native";
import { router } from "expo-router";

export const usePaywall = () => {
  const { isProMember } = useRevenueCat();

  const showAlreadyPremiumAlert = () => {
    Alert.alert(
      "Active Premium+ Subscription",
      "You already have an active Premium+ subscription. You can access all premium features.",
      [{ text: "OK", style: "default" }],
      { cancelable: true }
    );
  };

  const showPaywall = async () => {
    // if (isProMember) {
    //   showAlreadyPremiumAlert();
    //   return;
    // }
    router.push("/paywall");
  };

  return { showPaywall };
};
