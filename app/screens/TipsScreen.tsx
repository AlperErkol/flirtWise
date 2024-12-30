import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { usePremiumStore } from "@/store/usePremiumStore";
import { Ionicons } from "@expo/vector-icons";
import { getFlirtTip } from "@/utils/tips";
import { router } from "expo-router";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import useProfileStore from "@/store/profileStore";
import PremiumBadge from "../components/PremiumBadge";
import * as Clipboard from "expo-clipboard";

const FREE_CATEGORIES = [
  {
    id: "first_impressions",
    title: "First Impressions",
    icon: "👋",
    gradient: ["#FF9A8B", "#FF6B6B"],
  },
  {
    id: "conversation_starters",
    title: "Starting a Conversation",
    icon: "💭",
    gradient: ["#4FACFE", "#00F2FE"],
  },
  {
    id: "basic_texting",
    title: "Basic Texting Tips",
    icon: "📱",
    gradient: ["#43E97B", "#38F9D7"],
  },
];

const PREMIUM_CATEGORIES = [
  {
    id: "date_strategies",
    title: "Date Strategies",
    icon: "🎯",
    gradient: ["#FA709A", "#FEE140"],
  },
  {
    id: "humor",
    title: "Humor & Playfulness",
    icon: "😊",
    gradient: ["#FF3CAC", "#784BA0"],
  },
  {
    id: "advanced_texting",
    title: "Advanced Texting",
    icon: "✨",
    gradient: ["#F6D242", "#FF52E5"],
  },
  {
    id: "body_language",
    title: "Body Language",
    icon: "🤝",
    gradient: ["#13547A", "#80D0C7"],
  },
];

export default function TipsScreen() {
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [currentTip, setCurrentTip] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { isPremium } = usePremiumStore();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleCategorySelect = async (category: any) => {
    const isPremiumCategory = PREMIUM_CATEGORIES.find(
      (c) => c.id === category.id
    );

    if (isPremiumCategory && !isPremium) {
      Alert.alert(
        "Premium Feature",
        "This category is available only for Premium+ members.",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Upgrade to Premium+",
            onPress: () => router.push("/screens/HomeScreen"),
          },
        ]
      );
      return;
    }

    setSelectedCategory(category.id);
    setLoading(true);
    try {
      const tip = await getFlirtTip(category.title, userProfile);
      setCurrentTip(tip);
      bottomSheetRef.current?.snapToIndex(0);
    } catch (error) {
      setCurrentTip("Failed to load tip. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderCategory = (category: any) => {
    const isPremiumCategory = PREMIUM_CATEGORIES.find(
      (c) => c.id === category.id
    );
    const isLocked = isPremiumCategory && !isPremium;

    return (
      <TouchableOpacity
        key={category.id}
        onPress={() => handleCategorySelect(category)}
        style={styles.categoryContainer}
      >
        <LinearGradient
          colors={category.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.categoryCard,
            selectedCategory === category.id && styles.selectedCategory,
          ]}
        >
          <Text style={styles.categoryIcon}>{category.icon}</Text>
          <Text style={styles.categoryTitle}>{category.title}</Text>
          {isLocked && (
            <View style={styles.premiumBadgeContainer}>
              <PremiumBadge />
            </View>
          )}
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Success", "Tip copied to clipboard!");
  };

  return (
    <LinearGradient colors={["#E6E6FA", "#E6E6FA"]} style={styles.gradient}>
      <GlobalSafeAreaView style={styles.container}>
        <Header logo={true} centered={true} showBackButton={true} />
        <View style={styles.content}>
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>Basic Tips</Text>
            <View style={styles.categoryGrid}>
              {FREE_CATEGORIES.map(renderCategory)}
            </View>

            <Text style={styles.sectionTitle}>Advanced Tips</Text>
            <View style={styles.categoryGrid}>
              {PREMIUM_CATEGORIES.map(renderCategory)}
            </View>
          </View>
        </View>

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={["60%"]}
          enablePanDownToClose
          backgroundStyle={styles.bottomSheetBackground}
          handleIndicatorStyle={styles.bottomSheetIndicator}
        >
          <BottomSheetView style={styles.bottomSheetContent}>
            {loading ? (
              <ActivityIndicator size="large" color="#FF6347" />
            ) : (
              <>
                <View style={styles.bottomSheetHeader}>
                  <View style={styles.titleContainer}>
                    <Ionicons name="sparkles" size={24} color="#FFD700" />
                    <Text style={styles.bottomSheetTitle}>
                      Your Flirting Tip
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => bottomSheetRef.current?.close()}
                    style={styles.closeButton}
                  >
                    <Ionicons name="close" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <View style={styles.tipContainer}>
                  <Text style={styles.tipText}>{currentTip}</Text>
                  <TouchableOpacity
                    style={styles.copyIcon}
                    onPress={() => copyToClipboard(currentTip)}
                  >
                    <Ionicons name="copy-outline" size={24} color="#666" />
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() => handleCategorySelect({ id: selectedCategory })}
                >
                  <Ionicons name="refresh" size={20} color="#FFF" />
                  <Text style={styles.actionButtonText}>New Tip</Text>
                </TouchableOpacity>
              </>
            )}
          </BottomSheetView>
        </BottomSheet>
      </GlobalSafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
  },
  categoriesContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: "#333",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
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
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  selectedCategory: {
    transform: [{ scale: 0.98 }],
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  categoryIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  categoryTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  lockContainer: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderRadius: 12,
    padding: 4,
  },
  bottomSheetBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "#FF6347",
    width: 40,
  },
  bottomSheetContent: {
    flex: 1,
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
    fontWeight: "700",
    color: "#333",
  },
  closeButton: {
    padding: 4,
  },
  tipContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 24,
    gap: 12,
  },
  tipText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
  },
  copyIcon: {
    padding: 4,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FF6347",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  actionButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
  premiumBadgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
