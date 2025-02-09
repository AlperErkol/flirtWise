import { Alert } from "react-native";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useNavigation, NavigationProp } from "@react-navigation/native";

type RootStackParamList = {
  Paywall: undefined;
};

export const usePremiumCheck = () => {
  const { isProMember } = useRevenueCat();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const showPremiumAlert = () => {
    Alert.alert(
      "Premium Feature",
      "This feature requires Premium+ subscription. Upgrade now to unlock unlimited access!",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Upgrade to Premium+",
          onPress: () => navigation.navigate("Paywall"),
        },
      ]
    );
  };

  return { isProMember, showPremiumAlert };
};
