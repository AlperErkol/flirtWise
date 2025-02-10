import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Animated, { FadeInRight, FadeOutLeft } from "react-native-reanimated";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";

const { width } = Dimensions.get("window");

export default function HowItWorksScreen({ navigation }: any) {
  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
      </View>

      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.content}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Fire Emojis Won’t Get You a Date</Text>
          <Text style={styles.subtitle}>
            Reacting with 🔥? Congrats, you just blended in with every other
            boring guy in her DMs. Upload her story and let AI craft an opener
            she actually wants to reply to.
          </Text>
        </View>

        <Image
          source={require("@/assets/images/chat-2.png")}
          style={styles.illustration}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("BenefitsScreen")}
          >
            <Text style={styles.buttonText}>Generate My Opener</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  progressContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  progressLine: {
    flex: 1,
    height: 4,
    backgroundColor: "#4F46E5",
    borderRadius: 2,
  },
  inactiveLine: {
    opacity: 0.3,
  },
  titleContainer: {
    marginTop: 18,
    marginBottom: 36,
    textAlign: "center",
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
    textAlign: "center",
    letterSpacing: -0.5,
  },
  featuresContainer: {
    gap: 24,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
    padding: 20,
    borderRadius: 16,
    gap: 16,
  },
  featureIcon: {
    fontSize: 32,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 18,
    color: "#333",
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#666",
  },
  illustration: {
    width: width * 0.9,
    height: width * 0.9,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 24,
  },
  bottomContainer: {
    marginTop: "auto",
    marginBottom: 32,
  },
  nextButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    fontSize: 18,
    letterSpacing: -0.5,
  },
});
