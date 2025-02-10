import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "@/constants/Theme";
import { usePaywall } from "@/hooks/usePaywall";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import PremiumBadge from "@/components/PremiumBadge";
import personas from "@/constants/tip/persona";
import { useRevenueCat } from "@/hooks/useRevenueCat";

export default function CommunicationCoachSelectionScreen({ navigation }: any) {
  const { showPaywall } = usePaywall();
  const { isProMember } = useRevenueCat();

  const handlePersonaSelect = async (persona: any) => {
    if (persona.isPremium && !isProMember) {
      await showPaywall();
      return;
    }
    navigation.navigate("CommunicationCoachScreen", { persona: persona.id });
  };

  return (
    <GlobalSafeAreaView>
      <Header logo showBackButton />
      <Text style={styles.title}>Choose Your Coach</Text>
      <Text style={styles.subtitle}>
        Select the coaching style that best fits your needs.
      </Text>

      {personas.map((persona) => (
        <TouchableOpacity
          key={persona.id}
          onPress={() => handlePersonaSelect(persona)}
        >
          <LinearGradient
            colors={persona.gradient as [string, string]}
            style={styles.personaCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.personaContent}>
              <Text style={styles.personaEmoji}>{persona.icon}</Text>
              <View style={styles.personaInfo}>
                <Text style={styles.personaTitle}>{persona.title}</Text>
                <Text style={styles.personaDescription}>
                  {persona.description}
                </Text>
              </View>
              {persona.isPremium && !isProMember && <PremiumBadge />}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      ))}
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {
    marginBottom: 8,
    marginTop: 16,
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

  personaCard: {
    height: 120,
    borderRadius: 16,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  personaContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
  },
  personaEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  personaInfo: {
    flex: 1,
    justifyContent: "center",
  },
  personaTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    marginBottom: 4,
    letterSpacing: -0.5,
  },

  personaDescription: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "rgba(255, 255, 255, 0.9)",
    letterSpacing: -0.5,
  },
});
