import React, { useEffect } from "react";
import { Text, View, StyleSheet, ScrollView } from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { MainFeatureCard } from "@/components/MainFeatureCard";
import { DiagonalSecondaryFeatures } from "@/components/DiagonalSecondaryFeatures";
import { mainFeatures, secondaryFeatures } from "@/constants/home/features";
import { useTranslation } from "@/hooks/useTranslation";
import { usePushNotifications } from "@/hooks/usePushNotifications";

export default function HomeScreen() {
  const { expoPushToken, notification } = usePushNotifications();
  const { t } = useTranslation();

  return (
    <ScrollView style={{ backgroundColor: "#E6E6FA" }}>
      <GlobalSafeAreaView>
        <Header logo={true} showCountdown={true} />
        <View style={{ gap: 12 }}>
          {mainFeatures.map((feature) => (
            <MainFeatureCard key={feature.title} feature={feature} />
          ))}
        </View>
        <Text style={styles.sectionTitle}>{t("homeSecondaryTitle")}</Text>
        <DiagonalSecondaryFeatures
          leftFeature={secondaryFeatures[0]}
          rightFeature={secondaryFeatures[1]}
        />
      </GlobalSafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 23,
    fontFamily: "Inter_700Bold",
    color: "#000",
    marginVertical: 16,
    letterSpacing: -1,
  },
});
