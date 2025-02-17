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

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Toast from "react-native-toast-message";
import I18n from "@/lib/translations";
import { LanguageProvider } from "@/providers/LanguageContext";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import useOfflineStore from "../store/offlineStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import RevenueCatService from "@/services/payment/RevenueCatService";

import HomeScreen from "./screens/HomeScreen";
import TipsScreen from "./screens/features/TipsScreen";
import PhotoOpenersScreen from "./screens/features/PhotoOpenersScreen";
import ChatEnhancerScreen from "./screens/features/ChatEnhancerScreen";
import FeedbackScreen from "./screens/settings/FeedbackScreen";
import LanguageScreen from "./screens/settings/LanguageScreen";
import PreferencesScreen from "./screens/settings/PreferencesScreen";
import CommunicationCoachSelectionScreen from "./screens/features/CommunicationCoachSelectionScreen";
import CommunicationCoachScreen from "./screens/features/CommunicationCoachScreen";
import RemoteConfigService from "@/services/RemoteConfigService";
import Paywall from "@/components/Paywall";
import GenderPreferenceScreen from "./screens/preferences/GenderPreferenceScreen";
import MatchPreferenceScreen from "./screens/preferences/MatchPreferenceScreen";
import AgePreferenceScreen from "./screens/preferences/AgePreferenceScreen";
import CategoryDetailScreen from "./screens/features/CategoryDetailScreen";
import SubCategoryDetailScreen from "./screens/features/SubCategoryDetail";
import OnboardingScreen from "./screens/onboarding/OnboardingScreen";

SplashScreen.preventAutoHideAsync();
const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [loaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  const isOnline = useOfflineStore((state) => state.isOnline);
  useNetworkStatus();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    setModalVisible(!isOnline);
  }, [isOnline]);

  const checkOnboardingStatus = async () => {
    const onboardingCompleted = await AsyncStorage.getItem(
      "onboardingCompleted"
    );
    setIsOnboardingCompleted(onboardingCompleted !== null);
  };

  useEffect(() => {
    checkOnboardingStatus();
    I18n.initialize();
  }, []);

  useEffect(() => {
    const initServices = async () => {
      try {
        await RevenueCatService.initialize();
        await RemoteConfigService.initialize();
      } catch (error) {
        console.error("Services initialization failed:", error);
      }
    };

    initServices();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <LanguageProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Stack.Navigator
          initialRouteName={isOnboardingCompleted ? "HomeScreen" : "Onboarding"}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="TipsScreen" component={TipsScreen} />
          <Stack.Screen
            name="CommunicationCoachScreen"
            component={CommunicationCoachScreen as React.ComponentType<any>}
          />
          <Stack.Screen
            name="PhotoOpenersScreen"
            component={PhotoOpenersScreen}
          />
          <Stack.Screen
            name="ChatEnhancerScreen"
            component={ChatEnhancerScreen}
          />
          <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
          <Stack.Screen
            options={{ headerShown: false, presentation: "fullScreenModal" }}
            name="Paywall"
            component={Paywall as React.ComponentType<any>}
          />
          <Stack.Screen
            name="PreferencesScreen"
            component={PreferencesScreen}
          />
          <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
          <Stack.Screen
            name="CommunicationCoachSelectionScreen"
            component={CommunicationCoachSelectionScreen}
          />
          <Stack.Screen
            name="GenderPreferenceScreen"
            component={GenderPreferenceScreen}
          />
          <Stack.Screen
            name="AgePreferenceScreen"
            component={AgePreferenceScreen}
          />
          <Stack.Screen
            name="MatchPreferenceScreen"
            component={MatchPreferenceScreen}
          />
          <Stack.Screen
            name="CategoryDetail"
            component={CategoryDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SubCategoryDetail"
            component={SubCategoryDetailScreen}
            options={{ headerShown: false, presentation: "fullScreenModal" }}
          />
        </Stack.Navigator>

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
