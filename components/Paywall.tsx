import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GlobalSafeAreaView from "./GlobalSafeAreaView";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import Purchases from "react-native-purchases";
import RevenueCatService from "@/services/payment/RevenueCatService";

export default function Paywall({ navigation }: any) {
  const { currentOffering } = useRevenueCat();
  const [selectedPlan, setSelectedPlan] = useState<"QUARTERLY" | "WEEKLY">(
    "QUARTERLY"
  );

  const handlePlanSelect = (plan: "QUARTERLY" | "WEEKLY") => {
    setSelectedPlan(plan);
  };

  const handlePlanPurchase = async () => {
    try {
      if (!currentOffering?.weekly || !currentOffering?.threeMonth) {
        return;
      }

      const purchasePlan =
        selectedPlan === "WEEKLY"
          ? currentOffering.weekly
          : currentOffering.threeMonth;

      const purchaserInfo = await Purchases.purchasePackage(purchasePlan);

      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        await RevenueCatService.resetState();
        console.log("Purchase Successful and state refreshed");
      }
    } catch (error) {
      console.error("Purchase failed:", error);
      Alert.alert(
        "Purchase Failed",
        "There was an error processing your purchase. Please try again."
      );
    }
  };

  const handleRestorePurchase = async () => {
    const purchaserInfo = await Purchases.restorePurchases();
    if (purchaserInfo.activeSubscriptions.length > 0) {
      Alert.alert(
        "Purchase Restored",
        "You have successfully restored your purchase."
      );
    } else {
      Alert.alert("No Purchase Found", "You have not made any purchases.");
    }
  };

  const renderPlans = () => {
    if (!currentOffering) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }

    return (
      <>
        <Text style={styles.selectPlanText}>
          Select a plan for your free trial.
        </Text>

        {/* Subscriptions */}

        <View style={styles.plansContainer}>
          {/* Quarterly Subscription */}

          <TouchableOpacity
            style={[
              styles.planButton,
              selectedPlan === "QUARTERLY" && styles.planButtonSelected,
            ]}
            onPress={() => handlePlanSelect("QUARTERLY")}
          >
            <Text style={styles.saveBadge}>BEST DEAL</Text>
            <View>
              <View style={styles.planTitleContainer}>
                <Text style={styles.planTitle}>
                  {currentOffering.threeMonth?.product.title}
                </Text>
                <View style={styles.checkboxContainer}>
                  <View style={styles.checkbox}>
                    <Ionicons
                      name={
                        selectedPlan === "QUARTERLY"
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={32}
                      color={selectedPlan === "QUARTERLY" ? "#FF6347" : "#999"}
                    />
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 12,
                }}
              >
                <Text style={styles.planPrice}>
                  {currentOffering.threeMonth?.product.priceString}
                </Text>
              </View>
              <Text style={styles.infoText}>
                Just {currentOffering.threeMonth?.product.pricePerMonthString}{" "}
                per month, billed every 3 months
              </Text>
            </View>
          </TouchableOpacity>

          {/* Weekly Subscription */}

          <TouchableOpacity
            style={[
              styles.planButton,
              selectedPlan === "WEEKLY" && styles.planButtonSelected,
            ]}
            onPress={() => handlePlanSelect("WEEKLY")}
          >
            <View>
              <View style={styles.planTitleContainer}>
                <Text style={styles.planTitle}>
                  {currentOffering.weekly?.product.title}
                </Text>
                <View style={styles.checkboxContainer}>
                  <View
                    style={[
                      styles.checkbox,
                      selectedPlan !== "WEEKLY" && styles.checkboxUnselected,
                    ]}
                  >
                    <Ionicons
                      name={
                        selectedPlan === "WEEKLY"
                          ? "checkmark-circle"
                          : "ellipse-outline"
                      }
                      size={32}
                      color={selectedPlan === "WEEKLY" ? "#FF6347" : "#999"}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.planPrice}>
                  {currentOffering.weekly?.product.priceString}
                </Text>
                <Text>/week</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.billingText}>
          Billing starts at the end of your free trial unless you cancel. All
          plans have 3-day free trial. Plans renew automatically. Cancel via the
          App Store anytime.
        </Text>

        <TouchableOpacity
          style={styles.subscribeButton}
          onPress={() => handlePlanPurchase()}
        >
          <Text style={styles.subscribeButtonText}>Try for Free ⚡</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleRestorePurchase}>
            <Text style={styles.footerText}>Restore purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.footerText}>Terms of Use</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  return (
    <GlobalSafeAreaView>
      <View style={styles.header}>
        <Image
          source={require("../assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={32} color="#000" />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Upgrade now and never get ignored again!</Text>
      <Text style={styles.description}>
        🔥89% of users who upgraded reported more replies in 24 hours.
      </Text>

      <View style={styles.featuresContainer}>
        <View style={styles.featureRow}>
          <Ionicons
            style={{ marginRight: 16 }}
            name="flash-sharp"
            size={28}
            color="#FF6347"
          />
          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Elite Dating Coaches</Text>
            <Text style={styles.featureDescription}>
              Get unlimited access to top-tier dating experts!
            </Text>
          </View>
        </View>

        <View style={styles.featureRow}>
          <Ionicons
            style={{ marginRight: 16 }}
            name="flash-sharp"
            size={28}
            color="#FF6347"
          />

          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>AI-Powered Insights</Text>
            <Text style={styles.featureDescription}>
              Unlock deep photo and conversation analysis.
            </Text>
          </View>
        </View>
        <View style={styles.featureRow}>
          <Ionicons
            style={{ marginRight: 16 }}
            name="flash-sharp"
            size={28}
            color="#FF6347"
          />

          <View style={styles.featureTextContainer}>
            <Text style={styles.featureTitle}>Flirting Mastery Tips</Text>
            <Text style={styles.featureDescription}>
              Unlock exclusive secrets to spark attraction and keep the
              chemistry alive.
            </Text>
          </View>
        </View>
      </View>
      {renderPlans()}
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
    color: "#555",
    marginBottom: 24,
    fontFamily: "Inter_400Regular",
    letterSpacing: -0.5,
  },
  featuresContainer: {},

  featureRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  featureEmoji: {
    fontSize: 24,
    marginRight: 16,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },

  featureDescription: {
    fontSize: 14,
    color: "#666",
    fontFamily: "Inter_400Regular",
    letterSpacing: -0.5,
  },
  plansContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  planButton: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#999",
    marginHorizontal: 6,
  },
  planButtonSelected: {
    borderColor: "#FF6347",
    backgroundColor: "#FFF5F5",
  },
  saveBadge: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 4,
    position: "absolute",
    top: -15,
    left: 42,
    backgroundColor: "#FF6347",
    padding: 6,
    borderRadius: 12,
    letterSpacing: -0.5,
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
    justifyContent: "space-between",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  checkboxContainer: {},
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
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginBottom: 16,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
  },
});
