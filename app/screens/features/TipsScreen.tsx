import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import PremiumBadge from "@/components/PremiumBadge";
import { usePaywall } from "@/hooks/usePaywall";
import { FREE_CATEGORIES, PREMIUM_CATEGORIES } from "@/constants/tip/category";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useNavigation, NavigationProp } from "@react-navigation/native";

interface Category {
  id: string;
  isPremium: boolean;
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

type RootStackParamList = {
  CategoryDetail: {
    category: Category;
  };
};

export default function TipsScreen() {
  const { showPaywall } = usePaywall();
  const { isProMember } = useRevenueCat();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const handleCategoryPress = async (category: Category) => {
    if (category.isPremium && !isProMember) {
      await showPaywall();
      return;
    }
    navigation.navigate("CategoryDetail", { category });
  };

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
        {isPremiumCategory && !isProMember && (
          <View style={styles.premiumBadgeContainer}>
            <PremiumBadge />
          </View>
        )}
      </LinearGradient>
    </TouchableOpacity>
  );

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
    marginBottom: 12,
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
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
    letterSpacing: -0.5,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  premiumBadgeContainer: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
