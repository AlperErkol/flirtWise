import React, { useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { usePremiumStore } from "@/store/usePremiumStore";
import PremiumBadge from "../../components/PremiumBadge";
import BottomSheet from "@gorhom/bottom-sheet";
import SettingsBottomSheet from "@/components/SettingsBottomSheet";
import { usePaywall } from "@/hooks/usePaywall";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }: any) {
  const { showPaywall } = usePaywall();
  const { isPremium } = usePremiumStore();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const mainFeatures = [
    {
      id: "4",
      title: "Photo-Based Openers",
      description: "Get clever conversation starters inspired by the photo",
      screen: "PhotoOpenersScreen",
      isPremium: false,
      backgroundColor: "#4F46E5",
      icon: "📸",
    },
    {
      id: "5",
      title: "Chat Enhancer",
      description:
        "Breathe new life into your conversations with fresh, engaging messages",
      screen: "ChatEnhancerScreen",
      isPremium: true,
      backgroundColor: "#7C3AED",
      icon: "💬",
    },
  ];

  const secondaryFeatures = [
    {
      id: "1",
      title: "Flirt Coach",
      description: "Get personalized flirting advice",
      screen: "FlirtCoachScreen",
      gradient: ["#FF6B6B", "#FF9A8B"],
      emoji: "❤️‍🔥",
      isPremium: false,
    },
    {
      id: "2",
      title: "Get Flirting Tips",
      description: "Learn proven techniques",
      screen: "TipsScreen",
      gradient: ["#4FACFE", "#00F2FE"],
      emoji: "💡",
      isPremium: false,
    },
  ];

  const handleFeaturePress = async (feature: any) => {
    if (feature.isPremium && !isPremium) {
      const purchased = await showPaywall();
      if (purchased) {
        navigation.navigate(`${feature.screen}`);
      }
      return;
    }
    navigation.navigate(`${feature.screen}`);
  };

  const renderPromoCard = () => {
    if (isPremium) return null;

    return (
      <TouchableOpacity onPress={showPaywall}>
        <LinearGradient
          colors={["#4F46E5", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promoCard}
        >
          <View style={styles.promoContent}>
            <View>
              <Text style={styles.promoTitle}>Unlock Premium+</Text>
              <Text style={styles.promoDesc}>
                Get unlimited access to all premium features!
              </Text>
            </View>
            <TouchableOpacity style={styles.promoButton}>
              <Text style={styles.promoButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderMainFeature = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => handleFeaturePress(item)}
      style={styles.mainFeatureWrapper}
    >
      <View style={styles.mainCard}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.featureIcon}>{item.icon}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.isPremium && !isPremium && <PremiumBadge />}
            </View>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <GlobalSafeAreaView>
      <Header
        logo={true}
        showSettingsIcon={true}
        bottomSheetRef={bottomSheetRef}
      />
      {renderPromoCard()}
      <Text style={styles.sectionTitle}>Let's begin your journey</Text>
      <View>
        {mainFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            onPress={() => handleFeaturePress(feature)}
            style={styles.mainFeatureWrapper}
          >
            <View style={styles.mainCard}>
              <View style={styles.cardContent}>
                <View style={styles.iconContainer}>
                  <Text style={styles.featureIcon}>{feature.icon}</Text>
                </View>
                <View style={styles.textContainer}>
                  <View style={styles.titleRow}>
                    <Text style={styles.cardTitle}>{feature.title}</Text>
                    {feature.isPremium && !isPremium && <PremiumBadge />}
                  </View>
                  <Text style={styles.cardDesc}>{feature.description}</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Your daily flirt tools</Text>
      <View style={styles.secondaryFeatureContainer}>
        {secondaryFeatures.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.secondaryCardWrapper}
            onPress={() => navigation.navigate(item.screen)}
          >
            <LinearGradient
              colors={item.gradient as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.secondaryCard}
            >
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>{item.emoji}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.secondaryCardTitle}>{item.title}</Text>
                <Text style={styles.secondaryCardDesc}>{item.description}</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </View>
      <SettingsBottomSheet
        bottomSheetRef={bottomSheetRef}
        navigation={navigation}
      />
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#000",
    textAlign: "center",
  },

  mainFeatureWrapper: {
    marginBottom: 15,
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D6BDF7",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#000",
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
  },
  secondaryFeatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  secondaryCardWrapper: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryCard: {
    height: 160,
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
  },
  secondaryCardTitle: {
    fontSize: 16,
    fontFamily: "Inter_700Bold",
    color: "#FFF",
    marginBottom: 4,
  },
  secondaryCardDesc: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "rgba(255, 255, 255, 0.9)",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  promoCard: {
    marginVertical: 10,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  promoContent: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  promoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  promoDesc: {
    fontSize: 13,
    color: "#FFFFFF",
    opacity: 0.9,
    maxWidth: "80%",
  },
  promoButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  promoButtonText: {
    color: "#4F46E5",
    fontWeight: "600",
    fontSize: 13,
  },
  promoImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  guideText: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#000000",
    marginTop: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    color: "#333",
    marginBottom: 16,
    marginTop: 24,
  },
});
