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
import Purchases from "react-native-purchases";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Step1Screen from "./screens/Step1Screen";
import Step2Screen from "./screens/Step2Screen";
import Step3Screen from "./screens/Step3Screen";
import HomeScreen from "./screens/HomeScreen";
import SettingsScreen from "./screens/SettingsScreen";
import TipsScreen from "./screens/TipsScreen";
import PhotoOpenersScreen from "./screens/PhotoOpenersScreen";
import ChatEnhancerScreen from "./screens/ChatEnhancerScreen";
import FeedbackScreen from "./screens/FeedbackScreen";
import LanguageScreen from "./screens/LanguageScreen";
import PreferencesScreen from "./screens/PreferencesScreen";
import { useNetworkStatus } from "../hooks/useNetworkStatus";
import useOfflineStore from "../store/offlineStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Step4Screen from "./screens/Step4Screen";
import CommunicationCoachSelectionScreen from "./screens/CommunicationCoachSelectionScreen";
import CommunicationCoachScreen from "./screens/CommunicationCoachScreen";
import RemoteConfigService from "@/services/RemoteConfigService";

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const initPurchases = async () => {
      try {
        await Purchases.configure({
          apiKey: "appl_TvvyCFvFSroRvVfDHICvelkQChX",
        });
        console.log("RevenueCat integration successful");
      } catch (error) {
        console.error("RevenueCat integration error:", error);
      }
    };

    initPurchases();
  }, []);

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

  useEffect(() => {
    RemoteConfigService.initialize();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={isOnboardingCompleted ? "HomeScreen" : "Step1"}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Step1" component={Step1Screen} />
        <Stack.Screen name="Step2" component={Step2Screen} />
        <Stack.Screen name="Step3" component={Step3Screen} />
        <Stack.Screen name="Step4" component={Step4Screen} />
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
        <Stack.Screen
          name="LanguageScreen"
          component={LanguageScreen}
          options={{
            headerShown: true,
            title: "Language",
            headerTitleAlign: "center",
          }}
        />
        <Stack.Screen name="PreferencesScreen" component={PreferencesScreen} />
        <Stack.Screen name="FeedbackScreen" component={FeedbackScreen} />
        <Stack.Screen
          name="CommunicationCoachSelectionScreen"
          component={CommunicationCoachSelectionScreen}
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
    </GestureHandlerRootView>
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
    maxWidth: 320, // Modal genişliği azaltıldı
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  offlineTitle: {
    fontSize: 18, // Font boyutu küçültüldü
    fontWeight: "600",
    color: "#333",
    marginTop: 12,
    marginBottom: 6,
  },
  offlineText: {
    color: "#666",
    fontSize: 14, // Font boyutu küçültüldü
    textAlign: "center",
    marginBottom: 16,
  },
  closeButton: {
    backgroundColor: "#FF6347", // Turuncu renk
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
