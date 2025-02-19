import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import PlanType from "@/constants/types";
type PlanProps = {
  identifier: "rc_499_1w" | "rc_4799_1q";
  selectedPlan: "rc_499_1w" | "rc_4799_1q";
  handlePlanSelect: (plan: "rc_499_1w" | "rc_4799_1q") => void;
  availablePackage: any;
  badge?: string;
};

const Plan = ({
  selectedPlan,
  handlePlanSelect,
  availablePackage,
  badge,
  identifier,
}: PlanProps) => {
  const { t } = useTranslation();

  const title = availablePackage.product.title.replace("Premium+", "");

  return (
    <TouchableOpacity
      style={[
        styles.planButton,
        selectedPlan === identifier && styles.planButtonSelected,
      ]}
      onPress={() => handlePlanSelect(identifier)}
    >
      {badge && <Text style={styles.saveBadge}>{t("mostPopular")}</Text>}
      <View>
        <View style={styles.planTitleContainer}>
          <Text style={styles.planTitle}>{title}</Text>
          <View>
            <View
              style={[
                styles.checkbox,
                selectedPlan !== identifier && styles.checkboxUnselected,
              ]}
            >
              <Ionicons
                name={
                  selectedPlan === identifier
                    ? "checkmark-circle"
                    : "ellipse-outline"
                }
                size={32}
                color={selectedPlan === identifier ? "#FF6347" : "#999"}
              />
            </View>
          </View>
        </View>
        <View>
          <Text style={styles.planPrice}>
            {availablePackage.product.priceString}
          </Text>
          <Text style={styles.perWeekText}>
            {identifier === PlanType.WEEKLY ? t("perWeek") : t("per3Months")}
          </Text>
        </View>
        {identifier === PlanType.QUARTERLY && (
          <Text style={styles.infoText}>
            {t("justWeekly").replace(
              "{price}",
              availablePackage.product.pricePerWeekString
            )}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default Plan;

const styles = StyleSheet.create({
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
  perWeekText: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: -0.5,
    fontFamily: "Inter_600SemiBold",
  },
  infoText: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: -0.5,
    fontFamily: "Inter_500Medium",
    color: "#666",
  },
});
