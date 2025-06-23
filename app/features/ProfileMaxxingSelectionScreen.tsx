import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Button } from "@rneui/themed";
import globalStyles from "@/constants/style";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";

export default function ProfileMaxxingSelectionScreen() {
  const { t } = useTranslation();

  const navigateToAnalysis = async (mode: "photo" | "manual") => {
    router.push({
      pathname: "/features/ProfileMaxxingAnalysisScreen",
      params: { mode },
    });
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <View style={styles.container}>
        <View style={styles.heroContainer}>
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              {t("profileMaxxingInstruction")}
            </Text>
          </View>
          <Image
            source={require("@/assets/images/profile-maxxing.png")}
            style={styles.heroImage}
          />
        </View>
        <Button
          title={t("improveMyProfile")}
          buttonStyle={[globalStyles.button, globalStyles.primaryButton]}
          titleStyle={globalStyles.buttonText}
          onPress={() => navigateToAnalysis("manual")}
          style={{ display: "flex", alignItems: "center" }}
        />
      </View>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  instructionContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#000",
    textAlign: "center",
    letterSpacing: -0.8,
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
  },
});
