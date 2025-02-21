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
import { TIP_CATEGORIES } from "@/constants/tip/category";
import { useTranslation } from "@/hooks/useTranslation";
import { Ionicons } from "@expo/vector-icons";
import Theme from "@/constants/Theme";
import { router } from "expo-router";
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

export default function TipsScreen() {
  const { t } = useTranslation();

  const handleCategoryPress = async (category: Category) => {
    router.push(`/features/CategoryDetailScreen?category=${category.title}`);
  };

  const renderCategory = (category: Category) => (
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
        <View style={styles.emojiContainer}>
          <Ionicons name={category.icon as any} size={18} color="#FFF" />
        </View>
        <Text style={styles.categoryTitle}>{t(category.title)}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <GlobalSafeAreaView>
      <Header logo showBackButton />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.categoriesContainer}>
            <Text style={styles.sectionTitle}>
              {t("whatDoYouNeedHelpWith")}
            </Text>
            <Text style={styles.subtitle}>
              {t("browseCategoriesAndGetExpertTips")}
            </Text>

            <View style={styles.categoryGrid}>
              {TIP_CATEGORIES.map((category) => renderCategory(category))}
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
  subtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: Theme.colors.textLight,
    marginBottom: 24,
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
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
});
