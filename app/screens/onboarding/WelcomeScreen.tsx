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

export default function WelcomeScreen({ navigation }: any) {
  return (
    <GlobalSafeAreaView>
      <Header logo={true} />

      <View style={styles.progressContainer}>
        <View style={styles.progressLine} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
        <View style={[styles.progressLine, styles.inactiveLine]} />
      </View>

      <Animated.View
        entering={FadeInRight}
        exiting={FadeOutLeft}
        style={styles.content}
      >
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Still Stuck Saying ‘Hey’?</Text>
          <Text style={styles.subtitle}>
            You know that weak opener won’t work. But you send it anyway. And
            guess what? No reply. Time to stop being ignored.
          </Text>
        </View>

        <Image
          source={require("@/assets/images/chat.png")}
          style={styles.illustration}
        />

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={styles.nextButton}
            onPress={() => navigation.navigate("HowItWorksScreen")}
          >
            <Text style={styles.buttonText}>Fix My Messages Now</Text>
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
  },
  subtitle: {
    fontFamily: "Inter_500Medium",
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    letterSpacing: -0.5,
  },
  illustration: {
    width: width * 1.1,
    height: width * 1.1,
    alignSelf: "center",
    marginTop: 36,
    resizeMode: "contain",
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
