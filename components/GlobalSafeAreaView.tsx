import Theme from "@/constants/Theme";
import React from "react";
import { View, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function GlobalSafeAreaView({ children, bgWhite = false }: any) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        bgWhite && styles.bgWhite,
        {
          paddingTop: 10,
          paddingBottom: insets.bottom + Theme.spacing.vertical,
          paddingLeft: insets.left + Theme.spacing.horizontal,
          paddingRight: insets.right + Theme.spacing.horizontal,
        },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bgWhite: {
    backgroundColor: "#fff",
  },
});
