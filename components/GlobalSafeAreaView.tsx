import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import Theme from "@/constants/Theme";

type GlobalSafeAreaViewProps = {
  children: React.ReactNode;
  bgWhite?: boolean;
  noPadding?: boolean;
  noHorizontalPadding?: boolean;
  colors?: readonly [string, string, ...string[]];
};

export default function GlobalSafeAreaView({
  children,
  bgWhite = false,
  noPadding = false,
  noHorizontalPadding = false,
  colors = ["#E6E6FA", "#E6E6FA"] as const,
}: GlobalSafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  return (
    <LinearGradient colors={colors} style={styles.container}>
      <View
        style={[
          styles.innerContainer,
          bgWhite && styles.bgWhite,
          !noPadding && {
            paddingTop: insets.top,
            paddingBottom: insets.bottom + Theme.spacing.vertical,
          },
          !noHorizontalPadding &&
            !noPadding && {
              paddingHorizontal: Theme.spacing.horizontal,
            },
        ]}
      >
        {children}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
});
