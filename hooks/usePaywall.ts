import { useRevenueCat } from "./useRevenueCat";
import { Alert } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Paywall: undefined;
};

export const usePaywall = () => {
  const { isProMember } = useRevenueCat();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
    navigation.navigate("Paywall");
  };

  return { showPaywall };
};
