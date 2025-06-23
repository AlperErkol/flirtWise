import React from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import { useTranslation } from "@/hooks/useTranslation";

const { width } = Dimensions.get("window");

export default function ProfileMaxxingScreen() {
  const { t } = useTranslation();

  return (
    <Animated.View
      entering={FadeInRight}
      exiting={FadeOutLeft}
      style={styles.content}
    >
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{t("profileAuditTitle")}</Text>
        <Text style={styles.subtitle}>{t("profileAuditDescription")}</Text>
      </View>

      <Image
        source={require("@/assets/images/profile-maxxing.png")}
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
    marginBottom: 24,
  },
  title: {
    fontFamily: "Inter_700Bold",
    fontSize: 28,
    color: "#000",
    marginBottom: 12,
    letterSpacing: -0.8,
    textAlign: "center",
  },
  subtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "#000",
    letterSpacing: -0.5,
    textAlign: "center",
  },
  illustration: {
    width: width,
    height: width,
    alignSelf: "center",
    resizeMode: "contain",
  },
});
