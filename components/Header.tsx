import React from "react";
import { View, Image, TouchableOpacity, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import SettingsBottomSheet from "./SettingsBottomSheet";
import BottomSheet from "@gorhom/bottom-sheet";

interface HeaderProps {
  logo?: boolean;
  showBackButton?: boolean;
  showSettingsIcon?: boolean;
  title?: string;
  bottomSheetRef?: React.RefObject<BottomSheet>;
}

export default function Header({
  logo,
  showBackButton = false,
  showSettingsIcon = false,
  title,
  bottomSheetRef,
}: HeaderProps) {
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    bottomSheetRef?.current?.expand();
  };

  return (
    <>
      <View style={styles.header}>
        <View style={[styles.leftContainer]}>
          {showBackButton ? (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.backButton}
            >
              <Ionicons name="chevron-back" size={24} color="#FF6347" />
              <Text style={styles.backButtonText}>Back</Text>
            </TouchableOpacity>
          ) : (
            showSettingsIcon &&
            logo && (
              <Image
                source={require("../assets/images/logo.png")}
                style={styles.logo}
              />
            )
          )}
        </View>

        <View
          style={[
            styles.centerContainer,
            !showBackButton && !showSettingsIcon && styles.centerLogoContainer,
          ]}
        >
          {logo && !showSettingsIcon && (
            <Image
              source={require("../assets/images/logo.png")}
              style={styles.logo}
            />
          )}
          {!logo && <Text style={styles.title}>{title}</Text>}
        </View>

        <View style={styles.rightContainer}>
          {showSettingsIcon && (
            <TouchableOpacity
              onPress={handleSettingsPress}
              style={styles.settingsButton}
            >
              <Ionicons name="menu" size={34} color="#FF6347" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {showSettingsIcon && (
        <SettingsBottomSheet
          navigation={navigation}
          bottomSheetModalRef={bottomSheetRef}
        />
      )}
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
});
