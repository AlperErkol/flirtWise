import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
const { width } = Dimensions.get("window");
import { useTranslation } from "@/hooks/useTranslation";

export default function FinalScreen({ navigation }: any) {
  const { t } = useTranslation();
  const handleStart = () => {
    AsyncStorage.setItem("onboardingCompleted", "true");
    navigation.navigate("HomeScreen");
  };

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={styles.content}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("finalTitle")}</Text>
        <Text style={styles.subtitle}>{t("finalDescription")}</Text>
      </View>

      <Image
        source={require("@/assets/images/chat-3.png")}
        style={styles.illustration}
      />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
    width: width - 40,
  },

  titleContainer: {
    marginTop: 40,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#000",
    marginBottom: 12,
    textAlign: "center",
    letterSpacing: -0.8,
    paddingHorizontal: 5,
  },
  subtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    letterSpacing: -0.5,
  },

  illustration: {
    width: width,
    height: width,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
