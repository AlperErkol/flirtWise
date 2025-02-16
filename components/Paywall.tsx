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
import GlobalSafeAreaView from "./GlobalSafeAreaView";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import Purchases from "react-native-purchases";
import RevenueCatService from "@/services/payment/RevenueCatService";
import { PRIVACY_URL, TERMS_URL } from "@/constants/settings/urls";

export default function Paywall({ navigation }: any) {
  const { currentOffering } = useRevenueCat();
  const [selectedPlan, setSelectedPlan] = useState<"QUARTERLY" | "WEEKLY">(
    "QUARTERLY"
  );
  const [isLoading, setIsLoading] = useState(false);

  const handlePlanSelect = (plan: "QUARTERLY" | "WEEKLY") => {
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
        selectedPlan === "WEEKLY"
          ? currentOffering.weekly
          : currentOffering.threeMonth;

      const purchaserInfo = await Purchases.purchasePackage(purchasePlan);

      if (purchaserInfo.customerInfo.entitlements.active.pro) {
        await RevenueCatService.resetState();
        Alert.alert("Purchase Successful", "You are now a pro member.");
        navigation.goBack();
      }
    } catch (error: any) {
      if (!error.userCancelled) {
        Alert.alert("Purchase Failed", error.message);
      }
    } finally {
      setIsLoading(false);
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

  const handleLinkPress = (url: any) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
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

        <View style={styles.plansContainer}>
          <TouchableOpacity
            style={[
              styles.planButton,
              selectedPlan === "QUARTERLY" && styles.planButtonSelected,
            ]}
            onPress={() => handlePlanSelect("QUARTERLY")}
          >
            <Text style={styles.saveBadge}>Most Popular</Text>
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
                <View>
                  <Text style={styles.planPrice}>
                    {currentOffering.threeMonth?.product.priceString}
                  </Text>
                  <Text>per 3 months</Text>
                </View>
              </View>
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
              <View>
                <Text style={styles.planPrice}>
                  {currentOffering.weekly?.product.priceString}
                </Text>
                <Text>per week</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            styles.subscribeButton,
            isLoading && styles.subscribeButtonDisabled,
          ]}
          onPress={handlePlanPurchase}
          disabled={isLoading}
        >
          <Text style={styles.subscribeButtonText}>
            {isLoading ? "Processing..." : "Start 3-Day Free Trial ⚡"}
          </Text>
        </TouchableOpacity>
        <View style={{ marginBottom: 24, flexDirection: "column", gap: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="shield" size={20} />
            <Text style={styles.billingText}>Cancel anytime.</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="notifications" size={20} />
            <Text style={styles.billingText}>
              We'll notify you 24 hours before your trial ends.
            </Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
            <Ionicons name="card" size={20} />
            <Text style={styles.billingText}>
              Billing starts after 3-day free trial ends.
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={handleRestorePurchase}>
            <Text style={styles.footerText}>Restore purchase</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(PRIVACY_URL)}>
            <Text style={styles.footerText}>Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLinkPress(TERMS_URL)}>
            <Text style={styles.footerText}>Terms of Use</Text>
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
            source={require("../assets/images/logo.png")}
            style={styles.logo}
          />
        </View>

        <Text style={styles.title}>
          Turn Texting Into Dates – Unlock Your Trial!
        </Text>
        <Text style={styles.description}>
          🔥 89% of users who upgraded reported more replies in 24 hours.
        </Text>

        <View style={styles.featuresContainer}>
          <View style={styles.featureRow}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="checkmark-circle"
              size={28}
              color="#34C759"
            />

            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>
                AI-Powered Photo & Chat Analysis
              </Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="checkmark-circle"
              size={28}
              color="#34C759"
            />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>
                Expert Flirting Techniques
              </Text>
            </View>
          </View>
          <View style={styles.featureRow}>
            <Ionicons
              style={{ marginRight: 8 }}
              name="checkmark-circle"
              size={28}
              color="#34C759"
            />
            <View style={styles.featureTextContainer}>
              <Text style={styles.featureTitle}>
                Proven Dating Success Tips
              </Text>
            </View>
          </View>
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
    justifyContent: "center",
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
    marginBottom: 24,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  featuresContainer: {
    marginBottom: 6,
  },

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
    fontSize: 17,
    marginBottom: 4,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.7,
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
    fontSize: 16,
    color: "#000000",
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  infoText: {
    fontSize: 12,
    color: "#666",
  },
  subscribeButtonDisabled: {
    backgroundColor: "#999",
  },
});
