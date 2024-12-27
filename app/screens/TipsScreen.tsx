import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Alert,
  Clipboard,
} from "react-native";
import useProfileStore from "../../store/profileStore";
import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import { getFlirtTip } from "@/utils/tips";

const categories = [
  "First Impressions",
  "Starting a Conversation",
  "Texting Tips",
  "Confidence and Authenticity",
  "Date Strategies",
  "Humor and Playfulness",
];

export default function TipsScreen() {
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [currentTip, setCurrentTip] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCategorySelect = async (category: any) => {
    setLoading(true);
    try {
      const tip = await getFlirtTip(category, userProfile);
      setCurrentTip(tip);
    } catch (error) {
      console.error("Error fetching flirting tip:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    Clipboard.setString(currentTip as any);
    Alert.alert("Success", "Tip copied to clipboard.");
  };

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity
      style={styles.categoryButton}
      onPress={() => handleCategorySelect(item)}
    >
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={["#E6E6FA", "#E6E6FA"]}
      style={styles.gradientBackground}
    >
      <GlobalSafeAreaView>
        <Header logo={true} centered={true} showBackButton={true} />

        <Text style={styles.questionText}>
          Looking for the perfect way to impress? Choose a category to get
          started!
        </Text>

        <FlatList
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item}
          numColumns={2}
          columnWrapperStyle={styles.columnWrapper}
        />

        {currentTip && !loading && (
          <View style={styles.tipContainer}>
            <Text style={styles.tip}>{currentTip}</Text>
            <TouchableOpacity
              style={styles.copyButton}
              onPress={handleCopyToClipboard}
            ></TouchableOpacity>
          </View>
        )}

        {loading && (
          <ActivityIndicator size="small" color={Theme.colors.primary} />
        )}
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
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    display: "flex",
    justifyContent: "center",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: "48%",
    borderColor: "#D6BDF7",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  categoryText: {
    color: "#000",
    fontSize: 15,
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
  },
  tipContainer: {
    marginTop: 20,
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 4,
  },
  tip: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
    marginBottom: 15,
    fontFamily: "Inter_600SemiBold",
  },
  copyButton: {
    alignSelf: "flex-end",
    marginTop: 10,
  },
});
