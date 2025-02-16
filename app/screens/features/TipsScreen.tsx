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
import { FREE_CATEGORIES, PREMIUM_CATEGORIES } from "@/constants/tip/category";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { useTranslation } from "@/hooks/useTranslation";
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
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { t } = useTranslation();

  const handleCategoryPress = async (category: Category) => {
    navigation.navigate("CategoryDetail", { category });
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
        <Text style={styles.categoryIcon}>{category.icon}</Text>
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
            <Text style={styles.sectionTitle}>{t("basicCategories")}</Text>
            <View style={styles.categoryGrid}>
              {FREE_CATEGORIES.map((category) => renderCategory(category))}
            </View>

            <Text style={styles.sectionTitle}>{t("premiumCategories")}</Text>
            <View style={styles.categoryGrid}>
              {PREMIUM_CATEGORIES.map((category) => renderCategory(category))}
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
