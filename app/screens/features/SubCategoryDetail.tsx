import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { usePaywall } from "@/hooks/usePaywall";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/constants/Theme";
import { getCommunicationTip } from "@/services/tips";
import useProfileStore from "@/store/profileStore";
import { useTranslation } from "@/hooks/useTranslation";
interface SubCategory {
  id: string;
  title: string;
  description: string;
  tips?: string[];
  successRate?: string;
}

const tabs = [
  { id: 0, title: "overview" },
  { id: 1, title: "examples" },
  { id: 2, title: "strategy" },
  { id: 3, title: "premium" },
];

export default function SubCategoryDetailScreen({ route, navigation }: any) {
  const { category, subCategory } = route.params;
  const { isProMember } = useRevenueCat();
  const [activeTab, setActiveTab] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);

  useEffect(() => {
    const loadTip = async () => {
      setIsLoading(true);
      try {
        await fetchTips();
      } catch (error) {
        Alert.alert("Error", "Failed to load tip. Please try again later.", [
          { text: "OK", style: "default" },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTip();
  }, [route.params.category.id, route.params.subCategory.id]);

  const fetchTips = async () => {
    const tip = await getCommunicationTip(
      category.title,
      subCategory.title,
      userProfile,
      isProMember
    );
    const formattedTips = [
      tip.mainTip,
      tip.explanation,
      ...tip.examples,
      ...tip.doAndDonts.do.map((item: string) => `${item}`),
      ...tip.doAndDonts.dont.map((item: string) => `${item}`),
    ];
    if (isProMember && tip.premiumContent) {
      formattedTips.push(
        tip.premiumContent.situationalVariations.casual,
        tip.premiumContent.situationalVariations.romantic,
        tip.premiumContent.situationalVariations.recovery,
        tip.premiumContent.psychologyInsight,
        tip.premiumContent.expertNotes
      );
    }
    setSelectedSubCategory({
      ...subCategory,
      tips: formattedTips,
      successRate: tip.successRate,
    });
  };

  const renderTip = () => {
    return (
      <>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={Theme.colors.primary} />
            <Text style={styles.loadingText}>
              {t("generatingPersonalizedTip")}
            </Text>
          </View>
        ) : (
          <>
            <View style={styles.successRateContainer}>
              <View style={styles.successRateHeader}>
                <View>
                  <Text style={styles.categoryLabel}>{t(category.title)}</Text>
                  <Text style={styles.subCategoryLabel}>
                    {t(subCategory.title)}
                  </Text>
                </View>
              </View>
              <View style={styles.successRateContent}>
                <Text style={styles.successRateLabel}>{t("successRate")}</Text>
                <View style={styles.successRateRow}>
                  <Text style={styles.subCategoryLabel}>
                    {selectedSubCategory?.successRate}
                  </Text>
                  <View style={styles.successRateBar}>
                    <View
                      style={[
                        styles.successRateProgress,
                        {
                          width: `${parseInt(
                            selectedSubCategory?.successRate || "0"
                          )}%`,
                        },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.tabContainer}>
              {tabs.map((tab, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.tabButton,
                    activeTab === index && styles.activeTabButton,
                  ]}
                  onPress={() => setActiveTab(index)}
                >
                  <Text
                    style={[
                      styles.tabText,
                      activeTab === index && styles.activeTabText,
                    ]}
                  >
                    {t(tab.title)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {activeTab === 0 && (
              <View style={styles.mainTipCard}>
                <Text style={styles.mainTipText}>
                  {selectedSubCategory?.tips?.[0]}
                </Text>
                <Text style={styles.explanationText}>
                  {selectedSubCategory?.tips?.[1]}
                </Text>
              </View>
            )}

            {activeTab === 1 && (
              <View style={styles.sectionContainer}>
                {selectedSubCategory?.tips
                  ?.slice(2, 5)
                  .map((example, index) => (
                    <View key={index} style={{ marginBottom: 12 }}>
                      <Text style={styles.hintTitle}>
                        {t("example")} {index + 1}
                      </Text>
                      <View style={styles.exampleCard}>
                        <Text style={styles.exampleText}>{example}</Text>
                      </View>
                    </View>
                  ))}
              </View>
            )}

            {activeTab === 2 && (
              <View style={styles.dosDontsContainer}>
                <Text style={styles.dosDontsTitle}>{t("dos")}</Text>
                <View style={styles.tipsGrid}>
                  {selectedSubCategory?.tips?.slice(5, 8).map((item, index) => (
                    <View key={index} style={styles.tipItem}>
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#4CAF50"
                        style={{ marginRight: 8 }}
                      />
                      <Text style={styles.tipItemText}>{item}</Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.dosDontsTitle}>{t("donts")}</Text>
                <View style={styles.tipsGrid}>
                  {selectedSubCategory?.tips
                    ?.slice(8, 11)
                    .map((item, index) => (
                      <View key={index} style={styles.tipItem}>
                        <Ionicons
                          name="alert-circle"
                          size={24}
                          color="#FF5252"
                          style={{ marginRight: 8 }}
                        />
                        <Text style={styles.tipItemText}>{item}</Text>
                      </View>
                    ))}
                </View>
              </View>
            )}

            {activeTab === 3 &&
              isProMember &&
              selectedSubCategory?.tips &&
              renderPremiumContent()}
          </>
        )}
      </>
    );
  };

  const renderPremiumContent = () => {
    if (!isProMember || !selectedSubCategory?.tips) return null;

    const premiumTips = selectedSubCategory.tips.slice(-5);
    return (
      <View>
        <Text style={styles.premiumSectionTitle}>
          {t("situationalVariations")}
        </Text>
        <View style={{ marginBottom: 12 }}>
          <View style={styles.tipItem}>
            <Text style={styles.tipItemText}>
              {t("casual")}: {premiumTips[0]}
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipItemText}>
              {t("romantic")}: {premiumTips[1]}
            </Text>
          </View>
          <View style={styles.tipItem}>
            <Text style={styles.tipItemText}>
              {t("recovery")}: {premiumTips[2]}
            </Text>
          </View>
        </View>

        <View style={{ marginBottom: 12 }}>
          <Text style={styles.premiumSectionTitle}>
            {t("psychologyInsight")}
          </Text>
          <View style={styles.tipItem}>
            <Text style={styles.tipItemText}>{premiumTips[3]}</Text>
          </View>
        </View>

        <Text style={styles.premiumSectionTitle}>{t("expertNotes")}</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipItemText}>{premiumTips[4]}</Text>
        </View>
      </View>
    );
  };

  return (
    <GlobalSafeAreaView>
      <View style={styles.header}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={32} color="#000" />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>{renderTip()}</ScrollView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
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
  },
  subCategoryDescription: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666",
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
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#000",
    marginBottom: 6,
    letterSpacing: -0.5,
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
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#475569",
    lineHeight: 24,
    letterSpacing: -0.5,
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
  successRateHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.1)",
  },
  successRateContent: {},
  successRateLabel: {
    color: "#94A3B8",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    marginBottom: 8,
  },
  successRateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  successRateText: {
    color: "#FFF",
    fontSize: 32,
    fontFamily: "Inter_700Bold",
  },
  successRateBar: {
    flex: 1,
    height: 8,
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 4,
    overflow: "hidden",
  },
  successRateProgress: {
    height: "100%",
    backgroundColor: "#4ADE80",
    borderRadius: 4,
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
    color: "#000",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: -0.5,
  },
  categoryLabel: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#94A3B8",
    marginBottom: 4,
  },
  subCategoryLabel: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
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
  mainTipText: {
    color: "#000",
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  explanationText: {
    color: "#475569",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    lineHeight: 24,
    letterSpacing: -0.5,
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
    color: "#475569",
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    lineHeight: 24,
    letterSpacing: -0.5,
  },
  dosDontsContainer: {
    marginBottom: 12,
  },
  dosDontsTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#111827",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
  tipsGrid: {
    marginBottom: 12,
  },
  premiumBadgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
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
  upgradePill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(79, 70, 229, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    gap: 6,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
  },
  upgradePillText: {
    color: "#FFF",
    fontSize: 13,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: 0.3,
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
  hintTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#111827",
    letterSpacing: -0.5,
    marginBottom: 6,
  },
});
