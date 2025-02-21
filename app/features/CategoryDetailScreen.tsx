import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/constants/Theme";
import { useTranslation } from "@/hooks/useTranslation";
import { router, useLocalSearchParams } from "expo-router";
import { TIP_CATEGORIES } from "@/constants/tip/category";
interface SubCategory {
  id: string;
  title: string;
  description: string;
  tips?: string[];
  successRate?: string;
}

export default function CategoryDetailScreen() {
  const { category }: any = useLocalSearchParams();
  const { t } = useTranslation();

  const selectedCategory = TIP_CATEGORIES.find(
    (c: any) => c.title === category
  );
  const handleSubCategoryPress = async (subCategory: SubCategory) => {
    console.log("gidiyorum..");
    router.push(
      `/features/SubCategoryDetail?category=${category}&subCategory=${subCategory.title}`
    );
  };

  if (!selectedCategory) {
    return null;
  }

  return (
    <GlobalSafeAreaView>
      <Header logo showBackButton />
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <View style={styles.titleContainer}>
            <Ionicons
              name={selectedCategory.icon as any}
              size={24}
              color="#4F46E5"
            />
            <Text style={styles.headerTitle}>
              {t(selectedCategory.title as string)}
            </Text>
          </View>
          <Text style={styles.headerDescription}>
            {t(selectedCategory.description)}
          </Text>
        </View>
        {selectedCategory.subCategories.map((subCategory: any) => (
          <TouchableOpacity
            key={subCategory.id}
            style={styles.subCategoryCard}
            onPress={() => handleSubCategoryPress(subCategory)}
          >
            <Text style={styles.subCategoryTitle}>{t(subCategory.title)}</Text>
            <Text style={styles.subCategoryDescription}>
              {t(subCategory.description)}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 16,
  },
  subCategoryCard: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 12,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  subCategoryTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#333",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  subCategoryDescription: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666",
    letterSpacing: -0.5,
  },
  headerContainer: {
    paddingVertical: 16,
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
  },
  headerDescription: {
    fontSize: 16,
    color: "#000",
    marginTop: 8,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  bottomSheetBackground: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "#FF6347",
    width: 40,
  },
  premiumSectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#1E293B",
    marginBottom: 12,
  },
  tipItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipItemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#374151",
    lineHeight: 22,
  },
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#333",
    letterSpacing: -0.5,
  },
  closeButton: {
    padding: 4,
  },
  successRateContainer: {
    backgroundColor: "#1E293B",
    borderRadius: 16,
    padding: 20,
  },
  successRateWrapper: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  successRateBar: {
    height: "100%",
    backgroundColor: "#FFF",
    borderRadius: 3,
  },
  successRateText: {
    color: "#FFF",
    fontSize: 28,
    fontFamily: "Inter_700Bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontFamily: "Inter_500Medium",
    color: "#666",
    textAlign: "center",
  },
  successRateInfo: {
    flex: 1,
  },
  upgradePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4F46E5",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  upgradePillText: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
  },
  dosDontsTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#111827",
  },
  successRateLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 4,
  },
  premiumBadgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
  backButton: {
    padding: 4,
  },
  tipCard: {
    backgroundColor: "#F5F5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  tipText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#333",
    lineHeight: 24,
  },
  copyButton: {
    padding: 4,
  },
  tipsContainer: {
    paddingBottom: 20,
  },
  mainTipCard: {
    backgroundColor: "#F8FAFC",
    padding: 24,
    borderRadius: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: "#E2E8F0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  mainTipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 12,
  },
  mainTipIconContainer: {
    padding: 4,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
  },
  mainTipIcon: {
    fontSize: 24,
    color: "#FFF",
  },
  categoryLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
  },
  mainTipText: {
    color: "#1E293B",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
    lineHeight: 28,
  },
  explanationText: {
    color: "#475569",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    lineHeight: 24,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  exampleCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#374151",
    lineHeight: 22,
  },
  dosDontsContainer: {
    marginBottom: 16,
  },
  dosContainer: {
    flex: 1,
  },
  doItem: {
    backgroundColor: "#E8F5E9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  doText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#333",
  },
  dontsContainer: {
    flex: 1,
  },
  dontItem: {
    backgroundColor: "#FFEBEE",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  dontText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#333",
  },
  premiumCard: {
    backgroundColor: "#F3E5F5",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#CE93D8",
  },
  premiumText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#333",
  },
  hintTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#333",
    marginBottom: 8,
    textAlign: "left",
  },
  tipsGrid: {
    marginTop: 8,
    marginBottom: 12,
  },
  premiumBadgeSmall: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  premiumBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  upgradeBadge: {
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 8,
  },
  upgradeBadgeText: {
    color: "#333",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold",
  },
  premiumUpsellContainer: {
    backgroundColor: "#F3E5F5",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#CE93D8",
  },
  premiumUpsellTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#7B1FA2",
    marginBottom: 12,
  },
  premiumFeatureList: {
    marginBottom: 16,
  },
  premiumFeatureText: {
    fontSize: 15,
    fontFamily: "Inter_400Regular",
    color: "#4A148C",
    marginBottom: 8,
  },
  getPremiumButton: {
    backgroundColor: "#7B1FA2",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  getPremiumButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  successRateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  upgradeGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: 4,
    marginVertical: 16,
    width: "auto",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 8,
    alignItems: "center",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
  },
  activeTabButton: {
    backgroundColor: Theme.colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#666",
    textAlign: "center",
  },
  activeTabText: {
    color: "#FFF",
    fontFamily: "Inter_600SemiBold",
  },
  tabIcon: {
    width: 16,
    height: 16,
  },
  activeTabIcon: {
    opacity: 1,
  },
});
