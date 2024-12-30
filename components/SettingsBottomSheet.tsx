import React, { useMemo } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Share,
  Image,
  Linking,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function SettingsBottomSheet({
  bottomSheetRef,
  navigation,
}: any) {
  const handleShareApp = async () => {
    try {
      await Share.share({
        message: "Hey! Check out this amazing app, FlirtWise!",
      });
    } catch (error) {
      console.error("Error sharing app: ", error);
    }
  };

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const menuItems = [
    {
      id: "1",
      title: "Preferences",
      screen: "PreferencesScreen",
      emoji: "⚙️",
    },
    {
      id: "2",
      title: "Upgrade",
      emoji: "💳",
    },
    {
      id: "4",
      title: "Feedback",
      screen: "FeedbackScreen",
      emoji: "💬",
    },
    {
      id: "5",
      title: "Share App",
      action: handleShareApp,
      emoji: "📤",
    },
  ];

  const renderBackdrop = useMemo(
    () => (props: any) =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
        />
      ),
    []
  );

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={["60%"]}
      index={-1}
      enablePanDownToClose
      backgroundStyle={styles.bottomSheetBackground}
      handleIndicatorStyle={styles.bottomSheetIndicator}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetView style={styles.container}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => bottomSheetRef.current?.close()}
        >
          <Ionicons name="close" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.section}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                bottomSheetRef.current?.close();
                if (item.action) {
                  item.action();
                } else {
                  navigation.navigate(item.screen);
                }
              }}
            >
              <Text style={styles.emoji}>{item.emoji}</Text>
              <Text style={styles.menuText}>{item.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.footer}>
          <Image
            source={require("../assets/images/fw-logo.png")}
            style={styles.logo}
          />
          <View style={styles.footerLinks}>
            <TouchableOpacity
              onPress={() =>
                handleLinkPress(
                  "https://drive.google.com/file/d/1TXaOZhEE3eSqB8pe1mgbNX8teG4xYsGF/view?usp=drive_link"
                )
              }
            >
              <Text style={styles.footerLink}>Terms</Text>
            </TouchableOpacity>
            <Text style={styles.footerSeparator}>|</Text>
            <TouchableOpacity
              onPress={() =>
                handleLinkPress(
                  "https://drive.google.com/file/d/1jewICfEkgKyuvMYmYFNw8fx5GyrFCX7v/view?usp=drive_link"
                )
              }
            >
              <Text style={styles.footerLink}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "#FF6347",
    width: 40,
  },

  emoji: {
    fontSize: 24,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E5E5",
    marginVertical: 16,
  },

  logo: {
    width: 120,
    height: 32,
    resizeMode: "contain",
  },
  footerLinks: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerLink: {
    color: "#007BFF",
    fontSize: 14,
    fontWeight: "500",
    marginHorizontal: 5,
  },
  footerSeparator: {
    fontSize: 14,
    color: "#999",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: 24,
    top: 24,
    zIndex: 1,
  },
  section: {
    flex: 1,
    marginTop: 40,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E5E5",
    paddingVertical: 15,
  },
  footer: {
    alignItems: "center",
    gap: 16,
    marginBottom: 32,
  },
});
