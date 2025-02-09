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

const benefits = [
  {
    id: "1",
    title: "Get More Replies",
    description: "Increase your response rate with AI-optimized messages",
    icon: "📈",
  },
  {
    id: "2",
    title: "Save Time",
    description: "No more staring at blank screens wondering what to say",
    icon: "⚡️",
  },
  {
    id: "3",
    title: "Build Better Connections",
    description: "Create meaningful conversations that lead to real dates",
    icon: "❤️",
  },
];

export default function BenefitsScreen({ navigation }: any) {
  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />

      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />
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
          <Text style={styles.title}>She Left You on Read. Again.</Text>
          <Text style={styles.subtitle}>
            You thought you nailed that last text. But… no reply. FlirtWise
            analyzes your chat and tells you exactly what to say next to get her
            attention back.
          </Text>
        </View>

        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={styles.illustration}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("AIWingmanScreen")}
          >
            <Text style={styles.buttonText}>Save My Chat</Text>
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
    marginBottom: 48,
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

  benefitsContainer: {
    gap: 20,
  },
  benefitCard: {
    backgroundColor: "#F3F4F6",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
  },
  benefitIcon: {
    fontSize: 40,
    marginBottom: 16,
  },
  benefitTitle: {
    fontFamily: "Inter_600SemiBold",
    fontSize: 20,
    color: "#333",
    marginBottom: 8,
    textAlign: "center",
  },
  benefitDescription: {
    fontFamily: "Inter_400Regular",
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    lineHeight: 22,
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
  illustration: {
    width: width * 0.8,
    height: width * 0.8,
    alignSelf: "center",
  },
});
