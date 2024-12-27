import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Theme from "@/constants/Theme";

export default function Header({
  children,
  textColor = Theme.colors.primary,
  showSettingsIcon = false,
  showBackButton = false,
  logo = false,
}: any) {
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate("SettingsScreen" as never);
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      {showBackButton && (
        <TouchableOpacity
          style={styles.backIconContainer}
          onPress={handleBackPress}
        >
          <Ionicons name="chevron-back-outline" size={20} color={textColor} />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      )}

      {logo && (
        <Image
          source={require("../assets/images/fw-logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      )}

      {!logo && (
        <Text style={[styles.headerText, { color: textColor }]}>
          {children}
        </Text>
      )}

      {showSettingsIcon && (
        <TouchableOpacity
          style={styles.settingsIcon}
          onPress={handleSettingsPress}
        >
          <Ionicons name="settings-outline" size={24} color={textColor} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    borderRadius: 10,
  },
  backIconContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
  },
  backText: {
    fontWeight: "600",
    color: Theme.colors.primary,
    fontSize: 15,
  },
  logo: {
    width: 120,
    height: 50,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Inter_600SemiBold",
    textAlign: "center",
    flex: 1,
  },
  settingsIcon: {
    marginLeft: "auto",
  },
});
