import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
  Linking,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import Purchases from "react-native-purchases";
import RevenueCatService from "@/services/payment/RevenueCatService";
import { PRIVACY_URL, TERMS_URL } from "@/constants/settings/urls";
import { useTranslation } from "@/hooks/useTranslation";
import { Button } from "@rneui/themed";
import globalStyles from "@/constants/style";
import Plan from "@/components/paywall/Plan";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import FeatureItem from "@/components/paywall/FeatureItem";
import { router } from "expo-router";

export default function Paywall({ navigation }: any) {
  const { currentOffering } = useRevenueCat();
  const [selectedPlan, setSelectedPlan] = useState<"rc_499_1w" | "rc_4799_1q">(
    "rc_4799_1q"
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handlePlanSelect = (plan: "rc_499_1w" | "rc_4799_1q") => {
    setSelectedPlan(plan);
  };

  const handlePlanPurchase = async () => {
    if (isLoading) return;
    setIsLoading(true);
    try {
      if (!currentOffering?.weekly || !currentOffering?.threeMonth) {
        return;
      }

      const purchasePlan =
        selectedPlan === "rc_499_1w"
          ? currentOffering.weekly
          : currentOffering.threeMonth;

      const purchaserInfo = await Purchases.purchasePackage(purchasePlan);

      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        await RevenueCatService.resetState();
        Alert.alert(t("purchaseSuccess"), t("purchaseSuccessDescription"));
        navigation.goBack();
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        Alert.alert(t("purchaseFailed"), error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleRestorePurchase = async () => {
    const purchaserInfo = await Purchases.restorePurchases();
    if (purchaserInfo.activeSubscriptions.length > 0) {
      Alert.alert(t("purchaseRestored"), t("purchaseRestoredDescription"));
    } else {
      Alert.alert(t("purchaseNotFound"), t("purchaseNotFoundDescription"));
    }
  };

  const handleLinkPress = (url: any) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
  };

  const renderPlans = () => {
    if (!currentOffering) {
      return (
        <View>
          <Text>{t("loading")}</Text>
        </View>
      );
    }

    return (
      <>
        <Text onPress={() => router.back()} style={styles.selectPlanText}>
          {t("unlockAccessNow")}
        </Text>
        <View style={styles.plansContainer}>
          {currentOffering.availablePackages.map((availablePackage: any) => (
            <Plan
              identifier={availablePackage.product.identifier}
              key={availablePackage.product.identifier}
              selectedPlan={selectedPlan}
              handlePlanSelect={handlePlanSelect}
              availablePackage={availablePackage}
              badge={
                availablePackage.product.identifier === "rc_4799_1q"
                  ? t("mostPopular")
                  : undefined
              }
            />
          ))}
        </View>
        <Button
          title={isLoading ? t("processing") : t("subscribeButtonText")}
          buttonStyle={[globalStyles.button, globalStyles.primaryButton]}
          titleStyle={globalStyles.buttonText}
          onPress={handlePlanPurchase}
          disabled={isLoading}
          containerStyle={{ marginBottom: 16 }}
          disabledStyle={{
            borderColor: "#999",
            borderWidth: 1,
          }}
        />
        <View
          style={{
            marginBottom: 24,
            flexDirection: "column",
            gap: 12,
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="shield" size={18} />
            <Text style={styles.billingText}>{t("cancelAnytime")}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="notifications" size={18} />
            <Text style={styles.billingText}>
              {t("notify24HoursBeforeTrialEnds")}
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Ionicons name="card" size={18} />
            <Text style={styles.billingText}>
              {t("billingStartsAfterTrialEnds")}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => handleLinkPress(PRIVACY_URL)}>
            <Text style={styles.footerText}>{t("privacyPolicy")}</Text>
          </TouchableOpacity>
          <Text>{t("and")}</Text>
          <TouchableOpacity onPress={() => handleLinkPress(TERMS_URL)}>
            <Text style={styles.footerText}>{t("termsOfUse")}</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <GlobalSafeAreaView>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require("@/assets/images/logo.png")}
            style={styles.logo}
          />
          <TouchableOpacity onPress={handleRestorePurchase}>
            <Text style={styles.footerText}>{t("restorePurchase")}</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>{t("paywallTitle")}</Text>
        <Text style={styles.description}>{t("paywallDescription")}</Text>
        <View style={styles.featuresContainer}>
          <FeatureItem title="paywallFeature1" />
          <FeatureItem title="paywallFeature2" />
          <FeatureItem title="paywallFeature3" />
        </View>
        {renderPlans()}
      </ScrollView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  superBadge: {
    color: "#FF6347",
    backgroundColor: "#FFE5E0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginLeft: 4,
    fontSize: 16,
  },
  title: {
    fontSize: 23,
    fontWeight: "bold",
    marginBottom: 12,
    letterSpacing: -0.5,
    fontFamily: "Inter_700Bold",
  },
  description: {
    fontSize: 16,
    color: "#000",
    marginBottom: 16,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  featuresContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#999",
  },

  plansContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
    marginBottom: 16,
  },

  planButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#999",
  },

  planButtonSelected: {
    borderColor: "#FF6347",
    backgroundColor: "#FFF5F5",
  },
  saveBadge: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    position: "absolute",
    top: -15,
    left: 15,
    backgroundColor: "#FF6347",
    borderRadius: 12,
    letterSpacing: -0.5,
    textTransform: "uppercase",
    padding: 6,
    width: "100%",
    textAlign: "center",
  },
  planTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
    letterSpacing: -0.5,
    fontFamily: "Inter_600SemiBold",
  },

  planPrice: {
    fontSize: 18,
    color: "#000",
    fontWeight: "500",
    letterSpacing: -0.5,
    fontFamily: "Inter_600SemiBold",
  },

  planOriginalPrice: {
    fontSize: 12,
    color: "#999",
    textAlign: "center",
    letterSpacing: -0.5,
    fontFamily: "Inter_400Regular",
  },

  subscribeButton: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  subscribeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: -0.5,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 4,
  },
  footerText: {
    color: "#FF6347",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.6,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  checkbox: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxUnselected: {
    opacity: 0.6,
  },
  planTitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
    paddingTop: 8,
  },
  selectPlanText: {
    marginBottom: 28,
    fontSize: 19,
    fontWeight: "600",
    color: "#000000",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  billingText: {
    fontSize: 14,
    color: "#000000",
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
});
