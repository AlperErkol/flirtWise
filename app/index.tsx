import { useState, useEffect } from "react";
import { useRouter, useRootNavigationState } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { View, ActivityIndicator } from "react-native";

export default function Index() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState<
    boolean | null
  >(null);
  const router = useRouter();
  const navigationState = useRootNavigationState();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const isCompleted = await AsyncStorage.getItem("onboardingCompleted");
      setIsOnboardingCompleted(isCompleted === "true");
    };

    checkOnboardingStatus();
  }, []);

  useEffect(() => {
    if (!navigationState?.key || isOnboardingCompleted === null) return;

    router.replace(
      isOnboardingCompleted ? "/(tabs)" : "/onboarding/OnboardingScreen"
    );
  }, [navigationState?.key, isOnboardingCompleted]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
      }}
    >
      <ActivityIndicator size="small" color="#FF6347" />
    </View>
  );
}
