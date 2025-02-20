import React, { useRef, useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import BottomSheet from "@gorhom/bottom-sheet";
import SettingsBottomSheet from "@/components/SettingsBottomSheet";
import { MainFeatureCard } from "@/components/MainFeatureCard";
import { SecondaryFeatureCard } from "@/components/SecondaryFeatureCard";
import { mainFeatures, secondaryFeatures } from "@/constants/home/features";
import { usePaywall } from "@/hooks/usePaywall";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useTranslation } from "@/hooks/useTranslation";
import { usePushNotifications } from "@/hooks/usePushNotifications";
import Quote from "@/components/quote";

export default function HomeScreen({ navigation }: any) {
  const { expoPushToken, notification } = usePushNotifications();
  const { showPaywall } = usePaywall();
  const { t } = useTranslation();
  const { isProMember, isLoading } = useRevenueCat();
  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    console.log("expoPushToken", expoPushToken);
    console.log("notification", notification);
    const checkProStatus = async () => {
      if (!isLoading && !isProMember) {
        await showPaywall();
      }
    };

    checkProStatus();
  }, [isProMember, isLoading, expoPushToken, notification]);

  return (
    <GlobalSafeAreaView>
      <Header
        logo={true}
        showSettingsIcon={true}
        bottomSheetRef={bottomSheetRef}
      />
      <Quote />
      <View style={{ display: "flex", flexDirection: "row", gap: 12 }}>
        {mainFeatures.map((feature) => (
          <MainFeatureCard
            key={feature.title}
            item={feature}
            navigation={navigation}
          />
        ))}
      </View>
      <Text style={styles.sectionTitle}>{t("homeSecondaryTitle")}</Text>
      <View style={styles.secondaryFeatureContainer}>
        {secondaryFeatures.map((feature) => (
          <SecondaryFeatureCard
            key={feature.title}
            feature={feature}
            navigation={navigation}
          />
        ))}
      </View>
      <SettingsBottomSheet
        bottomSheetRef={bottomSheetRef}
        navigation={navigation}
      />
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  secondaryFeatureContainer: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 23,
    fontFamily: "Inter_700Bold",
    color: "#000",
    marginVertical: 16,
    letterSpacing: -1,
  },
});
