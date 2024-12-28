import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useColorScheme } from "@/hooks/useColorScheme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1Screen from "./screens/Step1Screen";
import Step2Screen from "./screens/Step2Screen";
import Step3Screen from "./screens/Step3Screen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TipsScreen from "./screens/TipsScreen";
import FlirtCoachScreen from "./screens/FlirtCoachScreen";
import PhotoOpenersScreen from "./screens/PhotoOpenersScreen";
import ChatEnhancerScreen from "./screens/ChatEnhancerScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import LanguageScreen from "./screens/LanguageScreen";
import PreferencesScreen from "./screens/PreferencesScreen";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  const checkOnboardingStatus = async () => {
    const onboardingCompleted = await AsyncStorage.getItem(
      "onboardingCompleted"
    );
    setIsOnboardingCompleted(onboardingCompleted !== null);
    setLoading(false);
  };

  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        initialRouteName={isOnboardingCompleted ? "HomeScreen" : "Step1"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Step1" component={Step1Screen} />
        <Stack.Screen name="Step2" component={Step2Screen} />
        <Stack.Screen name="Step3" component={Step3Screen} />

        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            headerShown: true,
            title: "Settings",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="TipsScreen" component={TipsScreen} />
        <Stack.Screen
          name="FlirtCoachScreen"
          component={FlirtCoachScreen}
          options={{
            headerShown: true,
            title: "Flirt Coach",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="PhotoOpenersScreen"
          component={PhotoOpenersScreen}
        />
        <Stack.Screen
          name="ChatEnhancerScreen"
          component={ChatEnhancerScreen}
        />
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
          options={{
            headerShown: true,
            title: "Language",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="PreferencesScreen"
          component={PreferencesScreen}
          options={{
            headerShown: true,
            title: "Preferences",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen
          name="FeedbackScreen"
          component={FeedbackScreen}
          options={{
            headerShown: true,
            title: "Preferences",
            headerTitleAlign: "center",
          }}
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
