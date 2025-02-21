import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from "@expo-google-fonts/inter";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  StatusBar,
} from "react-native";

import Toast from "react-native-toast-message";
import I18n from "@/lib/translations";
import { LanguageProvider } from "@/providers/LanguageContext";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import useOfflineStore from "../store/offlineStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RevenueCatService from "@/services/payment/RevenueCatService";
import RemoteConfigService from "@/services/RemoteConfigService";
import { Stack } from "expo-router/stack";
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [appReady, setAppReady] = useState(false);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useNetworkStatus();

  useEffect(() => {
    setModalVisible(!isOnline);
  }, [isOnline]);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const onboardingCompleted = await AsyncStorage.getItem(
        "onboardingCompleted"
      );
      setIsOnboardingCompleted(onboardingCompleted !== null);
    };

    const initializeApp = async () => {
      try {
        if (!loaded) return;

        await checkOnboardingStatus();
        I18n.initialize();

        await Promise.all([
          RevenueCatService.initialize(),
          RemoteConfigService.initialize(),
        ]);

        setAppReady(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error("An error occurred while initializing the app:", error);
        setAppReady(true); // Hata alsa bile açılışı sağla
        await SplashScreen.hideAsync();
      }
    };

    initializeApp();
  }, [loaded]);

  if (!appReady) return null;

  return (
    <LanguageProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack initialRouteName={"onboarding/OnboardingScreen"}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="onboarding/OnboardingScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/TipsScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/CommunicationCoachScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/PhotoOpenersScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/ChatEnhancerScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/CommunicationCoachSelectionScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/CategoryDetailScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="features/SubCategoryDetail"
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
          <Stack.Screen
            name="settings/LanguageScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings/PreferencesScreen"
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="preferences/GenderPreferenceScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="preferences/AgePreferenceScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="preferences/MatchPreferenceScreen"
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="paywall"
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
        </Stack>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <TouchableOpacity
            style={styles.modalContainer}
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
          >
            <View style={styles.modalContent}>
              <Ionicons name="wifi-outline" size={35} color="#FF6347" />
              <Text style={styles.offlineTitle}>Connection Error</Text>
              <Text style={styles.offlineText}>
                Please check your internet connection.
              </Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>
        <StatusBar />
        <Toast />
      </GestureHandlerRootView>
    </LanguageProvider>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 25,
    borderRadius: 15,
    elevation: 5,
    alignItems: "center",
    width: "80%",
    maxWidth: 320,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  offlineTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    marginBottom: 6,
  },
  offlineText: {
    color: "#666",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#FF6347",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  closeButtonText: {
    color: "white",
    fontSize: 14,
    fontWeight: "600",
  },
});
