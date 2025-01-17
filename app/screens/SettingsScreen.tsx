import { PRIVACY_URL, TERMS_URL } from "@/constants/settings/urls";
import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Share,
  Image,
  Linking,
} from "react-native";

export default function SettingsScreen({ navigation }: any) {
  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message:
          "Hey! Check out this amazing app, SocialSage! It's fun and helpful for sparking great conversations. Download it now: [APP_LINK]",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("App successfully shared!");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Share dismissed");
      }
    } catch (error) {
      console.error("Error sharing app: ", error);
    }
  };

  const handleLinkPress = (url: any) => {
    Linking.openURL(url).catch((err) =>
      console.error("Failed to open URL:", err)
    );
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

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={
              item.action ? item.action : () => navigation.navigate(item.screen)
            }
          >
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.menuText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.footer}>
        <Image
          source={require("../../assets/images/fw-logo.png")}
          style={styles.logo}
        />
        <View style={styles.footerLinks}>
          <TouchableOpacity onPress={() => handleLinkPress(TERMS_URL)}>
            <Text style={styles.footerLink}>Terms</Text>
          </TouchableOpacity>
          <Text style={styles.footerSeparator}>|</Text>
          <TouchableOpacity onPress={() => handleLinkPress(PRIVACY_URL)}>
            <Text style={styles.footerLink}>Privacy Policy</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  wrapper: {
    flex: 1,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingLeft: 15,
  },
  emoji: {
    fontSize: 18,
  },
  menuText: {
    fontSize: 15,
    fontWeight: "500",
    color: "#000",
    marginLeft: 15,
    fontFamily: "Inter_600SemiBold",
  },
  footer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 70,
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
});
