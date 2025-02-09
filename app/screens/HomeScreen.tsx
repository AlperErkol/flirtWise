import React, { useRef } from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import PremiumBadge from "../../components/PremiumBadge";
import BottomSheet from "@gorhom/bottom-sheet";
import SettingsBottomSheet from "@/components/SettingsBottomSheet";
import { usePaywall } from "@/hooks/usePaywall";
import { mainFeatures, secondaryFeatures } from "@/constants/home/features";
import { useRevenueCat } from "@/hooks/useRevenueCat";

export default function HomeScreen({ navigation }: any) {
  const { showPaywall } = usePaywall();
  const { isProMember } = useRevenueCat();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleFeaturePress = async (feature: any) => {
    if (feature.isPremium && !isProMember) {
      showPaywall();
      return;
    }
    navigation.navigate(`${feature.screen}`);
  };

  const renderPromoCard = () => {
    if (isProMember) {
      return <DailyStatsCard />;
    }

    return (
      <TouchableOpacity onPress={showPaywall}>
        <LinearGradient
          colors={["#4F46E5", "#7C3AED"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.promoCard}
        >
          <View style={styles.promoContent}>
            <View style={styles.promoTextContainer}>
              <Text style={styles.promoTitle}>Unlock Premium+</Text>
              <Text style={styles.promoDesc}>
                Get unlimited access to all premium features!
              </Text>
            </View>
            <TouchableOpacity style={styles.promoButton} onPress={showPaywall}>
              <Text style={styles.promoButtonText}>Get Started</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  const renderMainFeature = (item: any) => (
    <TouchableOpacity
      onPress={() => handleFeaturePress(item)}
      style={styles.mainFeatureWrapper}
      key={item.id}
    >
      <View style={styles.mainCard}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.featureIcon}>{item.emoji}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.isPremium && !isProMember && (
                <PremiumBadge bgWhite={true} />
              )}
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
      <View>{mainFeatures.map((feature) => renderMainFeature(feature))}</View>
      <Text style={styles.sectionTitle}>Your daily flirting tools</Text>
      <View style={styles.secondaryFeatureContainer}>
        {secondaryFeatures.map((feature) => (
          <TouchableOpacity
            key={feature.id}
            style={styles.secondaryCardWrapper}
            onPress={() => navigation.navigate(feature.screen)}
          >
            <LinearGradient
              colors={feature.gradient as any}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.secondaryCard}
            >
              <View style={styles.emojiContainer}>
                <Text style={styles.emoji}>{feature.emoji}</Text>
              </View>
              <View style={styles.contentContainer}>
                <Text style={styles.secondaryCardTitle}>{feature.title}</Text>
                <Text style={styles.secondaryCardDesc}>
                  {feature.description}
                </Text>
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

const DailyStatsCard = () => {
  return (
    <LinearGradient
      colors={["#4F46E5", "#7C3AED"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.statsGrid}
    >
      <View style={styles.statItem}>
        <View style={styles.statIconContainer}>
          <Ionicons name="camera" size={20} color="#4F46E5" />
        </View>
        <Text style={styles.statNumber}>∞</Text>
        <Text style={styles.statLabel}>Photo Analysis</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statItem}>
        <View style={styles.statIconContainer}>
          <Ionicons name="chatbubbles" size={20} color="#4F46E5" />
        </View>
        <Text style={styles.statNumber}>∞</Text>
        <Text style={styles.statLabel}>Chat Enhance</Text>
      </View>

      <View style={styles.divider} />

      <View style={styles.statItem}>
        <View style={styles.statIconContainer}>
          <Ionicons name="star" size={20} color="#4F46E5" />
        </View>
        <Text style={styles.statNumber}>Active</Text>
        <Text style={styles.statLabel}>Premium Status</Text>
      </View>
    </LinearGradient>
  );
};

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
    fontFamily: "Inter_600SemiBold",
    color: "#000",
    letterSpacing: -0.5,
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
    letterSpacing: -0.5,
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
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
  },
  secondaryCardTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  secondaryCardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#FFF",
    letterSpacing: -0.2,
  },
  contentContainer: {
    flex: 1,
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
  promoTextContainer: {
    flex: 1,
    marginRight: 16,
    maxWidth: "65%",
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
    lineHeight: 18,
  },
  promoButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    width: 110,
    alignItems: "center",
    justifyContent: "center",
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
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    color: "#000",
    marginBottom: 16,
    marginTop: 24,
    letterSpacing: -0.5,
  },
  statsCard: {
    marginVertical: 10,
    borderRadius: 16,
    padding: 16,
    elevation: 5,
    shadowColor: "#7C3AED",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  statsTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statsSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255, 255, 255, 0.8)",
  },
  crownContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNumber: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    color: "#FFFFFF",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Inter_500Medium",
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
});
