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
import { Ionicons } from "@expo/vector-icons";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";

const { width } = Dimensions.get("window");

export default function FinalScreen({ navigation }: any) {
  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
        <View style={styles.progressLine} />
      </View>
      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.content}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            Stop Getting Ignored. Start Getting Replies.
          </Text>
          <Text style={styles.subtitle}>
            You’ve sent enough bad texts. You’ve wasted enough chances.
            FlirtWise gives you AI-powered, proven message strategies that
            actually work.
          </Text>
        </View>

        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={styles.illustration}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.buttonText}>Start Flirting Smarter</Text>
            <Ionicons name="rocket-outline" size={20} color="#fff" />
          </TouchableOpacity>

          <Text style={styles.termsText}>
            By continuing, you agree to our{" "}
            <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
            <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
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
  titleContainer: {
    alignItems: "center",
    marginTop: 18,
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
  statsContainer: {
    marginTop: 48,
  },

  statsCard: {
    flexDirection: "row",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "space-around",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontFamily: "Inter_700Bold",
    fontSize: 32,
    color: "#FFF",
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: "#FFF",
    opacity: 0.9,
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#FFF",
    opacity: 0.2,
  },
  bottomContainer: {
    marginTop: "auto",
    marginBottom: 32,
    gap: 16,
  },
  startButton: {
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

  termsText: {
    fontFamily: "Inter_400Regular",
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  termsLink: {
    color: "#4F46E5",
  },
  illustration: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: "center",
  },
});
