import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { usePremiumStore } from "@/store/usePremiumStore";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import PremiumBadge from "@/components/PremiumBadge";
import { usePaywall } from "@/hooks/usePaywall";
import Theme from "@/constants/Theme";
import useProfileStore from "@/store/profileStore";
import { FREE_CATEGORIES, PREMIUM_CATEGORIES } from "@/constants/tip/category";
import { getCommunicationTip } from "@/services/tips";

interface Category {
  id: string;
  title: string;
  icon: string;
  gradient: string[];
  subCategories: SubCategory[];
}

interface SubCategory {
  id: string;
  title: string;
  description: string;
  tips?: string[];
  successRate?: string;
}

export default function TipsScreen() {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { isPremium } = usePremiumStore();
  const [isLoading, setIsLoading] = useState(false);
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const { showPaywall } = usePaywall();

  const snapPoints = useMemo(() => {
    if (selectedSubCategory) {
      return ["80%"];
    }
    return ["50%"];
  }, [selectedSubCategory]);

  useEffect(() => {
    if (selectedCategory) {
      bottomSheetRef.current?.expand();
    }
  }, [selectedCategory]);

  const tabs = [
    { id: 0, title: "Overview" },
    { id: 1, title: "Examples" },
    { id: 2, title: "Strategy" },
    { id: 3, title: "Premium+" },
  ];

  const handleCategoryPress = (category: Category) => {
    if (category.id.includes("premium") && !isPremium) {
      showPaywall();
      return;
    }
    setSelectedCategory(category);
  };

  const handleSubCategoryPress = async (subCategory: SubCategory) => {
    try {
      setIsLoading(true);
      setSelectedSubCategory(subCategory);

      const tip = await getCommunicationTip(
        selectedCategory?.title || "",
        subCategory.title,
        userProfile,
        isPremium
      );

      const formattedTips = [
        tip.mainTip,
        tip.explanation,
        ...tip.examples,
        ...tip.doAndDonts.do.map((item: string) => `✅ ${item}`),
        ...tip.doAndDonts.dont.map((item: string) => `❌ ${item}`),
      ];

      if (isPremium && tip.premiumContent) {
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
    } catch (error) {
      Alert.alert(
        "Error",
        "Failed to generate communication tip. Please try again."
      );
      setSelectedSubCategory(null);
    } finally {
      setIsLoading(false);
    }
  };

  const renderBackdrop = useMemo(
    () => (props: any) =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
        />
      ),
    []
  );

  const renderCategory = (category: Category, isPremiumCategory: boolean) => (
    <TouchableOpacity
      key={category.id}
      style={styles.categoryContainer}
      onPress={() => handleCategoryPress(category)}
    >
      <LinearGradient
        colors={category.gradient as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.categoryCard}
      >
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text style={styles.categoryTitle}>{category.title}</Text>
        {isPremiumCategory && !isPremium && (
          <View style={styles.premiumBadgeContainer}>
            <PremiumBadge />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderBottomSheetContent = () => {
    if (selectedSubCategory) {
      return (
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setSelectedSubCategory(null)}
            >
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.bottomSheetTitle}>
              {selectedSubCategory.title}
            </Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => {
                setSelectedCategory(null);
                setSelectedSubCategory(null);
                bottomSheetRef.current?.close();
              }}
            >
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>

          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Theme.colors.primary} />
              <Text style={styles.loadingText}>
                Generating your personalized tip...
              </Text>
            </View>
          ) : (
            <ScrollView
              style={styles.tipsContainer}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            >
              <View style={styles.successRateContainer}>
                <View style={styles.successRateRow}>
                  <View style={styles.successRateInfo}>
                    <Text style={styles.successRateLabel}>
                      Success Rate for this Tip
                    </Text>
                    <Text style={styles.successRateText}>
                      {selectedSubCategory.successRate}
                    </Text>
                  </View>
                  {!isPremium && (
                    <TouchableOpacity
                      style={styles.upgradePill}
                      onPress={showPaywall}
                    >
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.upgradePillText}>
                        +15% with Premium+ ✨
                      </Text>
                    </TouchableOpacity>
                  )}
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
                      {tab.title}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              {activeTab === 0 && (
                <View style={styles.mainTipCard}>
                  <Text style={styles.mainTipText}>
                    {selectedSubCategory.tips?.[0]}
                  </Text>
                  <Text style={styles.explanationText}>
                    {selectedSubCategory.tips?.[1]}
                  </Text>
                </View>
              )}

              {activeTab === 1 && (
                <View style={styles.sectionContainer}>
                  {selectedSubCategory.tips
                    ?.slice(2, 5)
                    .map((example, index) => (
                      <View key={index} style={{ marginBottom: 12 }}>
                        <Text style={styles.hintTitle}>
                          Example {index + 1}
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
                  <Text style={styles.dosDontsTitle}>Do's</Text>
                  <View style={styles.tipsGrid}>
                    {selectedSubCategory.tips
                      ?.slice(5, 8)
                      .map((item, index) => (
                        <View key={index} style={styles.tipItem}>
                          <Ionicons
                            name="checkmark-circle"
                            size={24}
                            color="#4CAF50"
                            style={styles.tipIcon}
                          />
                          <Text style={styles.tipItemText}>
                            {item.replace("✅ ", "")}
                          </Text>
                        </View>
                      ))}
                  </View>
                  <Text style={styles.dosDontsTitle}>Don'ts</Text>
                  <View style={styles.tipsGrid}>
                    {selectedSubCategory.tips
                      ?.slice(8, 11)
                      .map((item, index) => (
                        <View key={index} style={styles.tipItem}>
                          <Ionicons
                            name="alert-circle"
                            size={24}
                            color="#FF5252"
                            style={styles.tipIcon}
                          />
                          <Text style={styles.tipItemText}>
                            {item.replace("❌ ", "")}
                          </Text>
                        </View>
                      ))}
                  </View>
                </View>
              )}

              {activeTab === 3 &&
                isPremium &&
                selectedSubCategory?.tips &&
                renderPremiumContent()}

              {activeTab === 3 && !isPremium && (
                <View style={styles.premiumUpsellContainer}>
                  <Text style={styles.premiumUpsellTitle}>
                    Unlock Premium Features 🌟
                  </Text>
                  <View style={styles.premiumFeatureList}>
                    <Text style={styles.premiumFeatureText}>
                      • Situational Variations for Different Scenarios
                    </Text>
                    <Text style={styles.premiumFeatureText}>
                      • Deep Psychological Insights
                    </Text>
                    <Text style={styles.premiumFeatureText}>
                      • Expert Additional Notes
                    </Text>
                    <Text style={styles.premiumFeatureText}>
                      • Higher Success Rate with Premium Tips
                    </Text>
                  </View>
                  <TouchableOpacity
                    style={styles.getPremiumButton}
                    onPress={showPaywall}
                  >
                    <Text style={styles.getPremiumButtonText}>
                      Get Premium+
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          )}
        </BottomSheetView>
      );
    }

    return (
      <BottomSheetView style={styles.bottomSheetContent}>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>{selectedCategory?.title}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setSelectedCategory(null);
              bottomSheetRef.current?.close();
            }}
          >
            <Ionicons name="close" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.instructionContainer}>
          <Ionicons name="hand-left" size={24} color={Theme.colors.primary} />
          <Text style={styles.instructionText}>
            Please select one of the options below
          </Text>
        </View>

        <ScrollView>
          {selectedCategory?.subCategories.map((subCategory) => (
            <TouchableOpacity
              key={subCategory.id}
              style={styles.subCategoryCard}
              onPress={() => handleSubCategoryPress(subCategory)}
            >
              <Text style={styles.subCategoryTitle}>{subCategory.title}</Text>
              <Text style={styles.subCategoryDescription}>
                {subCategory.description}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </BottomSheetView>
    );
  };

  const renderPremiumContent = () => {
    if (!isPremium || !selectedSubCategory?.tips) return null;

    const premiumTips = selectedSubCategory.tips.slice(-5);
    return (
      <View>
        <Text style={styles.premiumSectionTitle}>
          🌟 Situational Variations
        </Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipItemText}>Casual: {premiumTips[0]}</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipItemText}>Romantic: {premiumTips[1]}</Text>
        </View>
        <View style={styles.tipItem}>
          <Text style={styles.tipItemText}>Recovery: {premiumTips[2]}</Text>
        </View>

        <Text style={styles.premiumSectionTitle}>🧠 Psychology Insight</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipItemText}>{premiumTips[3]}</Text>
        </View>

        <Text style={styles.premiumSectionTitle}>👨‍🏫 Expert Notes</Text>
        <View style={styles.tipItem}>
          <Text style={styles.tipItemText}>{premiumTips[4]}</Text>
        </View>
      </View>
    );
  };

  return (
    <GlobalSafeAreaView>
      <Header logo showBackButton />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Basic Categories</Text>
            <View style={styles.categoryGrid}>
              {FREE_CATEGORIES.map((category) =>
                renderCategory(category, false)
              )}
            </View>

            <Text style={styles.sectionTitle}>Premium Categories</Text>
            <View style={styles.categoryGrid}>
              {PREMIUM_CATEGORIES.map((category) =>
                renderCategory(category, true)
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        enablePanDownToClose
        index={-1}
        backdropComponent={renderBackdrop}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        backgroundStyle={styles.bottomSheetBackground}
      >
        {renderBottomSheetContent()}
      </BottomSheet>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#333",
    marginBottom: 12,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginBottom: 24,
  },
  categoryContainer: {
    width: "47%",
  },
  categoryCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 120,
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
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
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#333",
  },
  closeButton: {
    padding: 4,
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
  tipIcon: {
    marginRight: 12,
    marginTop: 2,
  },
  tipItemText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#374151",
    lineHeight: 22,
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#666",
    textAlign: "center",
  },
  instructionContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  instructionText: {
    marginLeft: 8,
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#475569",
  },
  premiumSectionTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#1E293B",
    marginBottom: 12,
  },
});
