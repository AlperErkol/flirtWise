import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "@/hooks/useTranslation";
import StatusIndicator from "./CountdownTimer";

interface HeaderProps {
  logo?: boolean;
  showBackButton?: boolean;
  showCountdown?: boolean;
  showAddButton?: boolean;
  showCloseButton?: boolean;
  onAddPress?: () => void;
  onClosePress?: () => void;
  title?: string;
}

export default function Header({
  logo,
  showBackButton = false,
  showCountdown = false,
  showAddButton = false,
  showCloseButton = false,
  onAddPress,
  onClosePress,
  title,
}: HeaderProps) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <>
      <View style={styles.header}>
        <View style={[styles.leftContainer]}>
          {showBackButton && (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#FF6347" />
              <Text style={styles.backButtonText}>{t("back")}</Text>
            </TouchableOpacity>
          )}
          {!showBackButton && logo && (
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          )}
        </View>

        <View style={[styles.centerContainer]}>
          {showBackButton && logo ? (
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          ) : !logo ? (
            <Text style={styles.title}>{title}</Text>
          ) : null}
        </View>

        <View style={styles.rightContainer}>
          {showCountdown && <StatusIndicator />}
          {showAddButton && (
            <TouchableOpacity onPress={onAddPress} style={styles.addButton}>
              <Ionicons name="add" size={28} color="#FF6347" />
            </TouchableOpacity>
          )}
          {showCloseButton && (
            <TouchableOpacity onPress={onClosePress} style={styles.closeButton}>
              <Ionicons name="close" size={28} color="#FF6347" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 56,
  },
  leftContainer: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerContainer: {
    flex: 2,
    alignItems: "center",
  },
  rightContainer: {
    flex: 1,
    alignItems: "flex-end",
  },
  logo: {
    width: 120,
    height: 40,
    resizeMode: "contain",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 17,
    fontFamily: "Inter_600SemiBold",
    color: "#FF6347",
    letterSpacing: -0.5,
  },
  centerLogoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  addButton: {
    padding: 8,
  },
  closeButton: {
    padding: 8,
  },
});
