import React, { useCallback, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  View,
  Dimensions,
  Button,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation, openSettings }: any) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  const mainFeatures = [
    {
      id: "4",
      title: "Photo-Based Openers",
      description: "Get clever conversation starters inspired by the photo",
      screen: "PhotoOpenersScreen",
    },
    {
      id: "5",
      title: "Chat Enhancer",
      description:
        "Breathe new life into your conversations with fresh, engaging messages",
      screen: "ChatEnhancerScreen",
    },
  ];

  const secondaryFeatures = [
    {
      id: "1",
      title: "Flirt Coach",
      screen: "FlirtCoachScreen",
      emoji: "❤️‍🔥",
    },
    {
      id: "2",
      title: "Get Flirting Tips",
      screen: "TipsScreen",
      emoji: "💡",
    },
  ];

  return (
    <LinearGradient
      colors={["#E6E6FA", "#E6E6FA"]}
      style={styles.gradientBackground}
    >
      <GlobalSafeAreaView>
        <Header
          logo={true}
          showSettingsIcon={true}
          onSettingsPress={handlePresentModalPress}
        />

        <Text style={styles.questionText}>
          Need help sparking the perfect conversation? Start here!
        </Text>

        <FlatList
          data={mainFeatures}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.mainCard}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.description}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.mainFeatureContainer}
        />

        <View style={styles.secondaryFeatureContainer}>
          {secondaryFeatures.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.secondaryCard}
              onPress={() => navigation.navigate(item.screen)}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.secondaryCardTitle}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </GlobalSafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  questionText: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
    color: "#000",
    textAlign: "center",
  },
  mainFeatureContainer: {
    marginBottom: 20,
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    width: width - 60,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "#D6BDF7",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontFamily: "Inter_700Bold",
    textAlign: "center",
    color: "#000",
  },
  cardDesc: {
    fontSize: 14,
    marginTop: 5,
    color: "#000",
    textAlign: "center",
  },
  secondaryFeatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 20,
  },
  secondaryCard: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    gap: 5,
    flex: 1,
    alignItems: "center",
    borderColor: "#D6BDF7",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  secondaryCardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#000",
    textAlign: "center",
  },
  emoji: {
    fontSize: 14,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});
