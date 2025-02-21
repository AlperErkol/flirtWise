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
import { usePaywall } from "@/hooks/usePaywall";
import {
  APP_STORE_URL,
  PRIVACY_URL,
  TERMS_URL,
} from "@/constants/settings/urls";
import { useTranslation } from "@/hooks/useTranslation";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Quote from "@/components/quote";
import { router } from "expo-router";
export default function Settings({ bottomSheetRef, navigation }: any) {
  const { showPaywall } = usePaywall();
  const { t } = useTranslation();

  const handleShareApp = async () => {
    try {
      const result = await Share.share({
        message: `Hey! Check out this amazing app, FlirtWise! It's fun and helpful for sparking great conversations. Download it now:`,
        url: APP_STORE_URL,
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

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  const handleUpgrade = async () => {
    await showPaywall();
  };

  const handleContactUs = () => {
    Linking.openURL("mailto:flirtwiseai@gmail.com");
  };

  const menuItems = [
    {
      id: "1",
      title: "upgrade",
      action: handleUpgrade,
      icon: "diamond",
    },
    {
      id: "2",
      title: "language",
      screen: "settings/LanguageScreen",
      icon: "earth",
    },
    {
      id: "3",
      title: "shareApp",
      action: () => handleShareApp(),
      icon: "share",
    },
    {
      id: "4",
      title: "contactUs",
      action: () => handleContactUs(),
      icon: "mail",
    },
    {
      id: "5",
      title: "termsOfUse",
      action: () => handleLinkPress(TERMS_URL),
      icon: "document",
      isExternal: true,
    },
    {
      id: "6",
      title: "privacyPolicy",
      action: () => handleLinkPress(PRIVACY_URL),
      icon: "lock-closed",
      isExternal: true,
    },
  ];

  return (
    <GlobalSafeAreaView>
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold", marginVertical: 16 }}>
          Settings
        </Text>
        <View style={styles.section}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={() => {
                if (item.action) {
                  item.action();
                } else {
                  router.push(item.screen as any);
                }
              }}
            >
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
              >
                <Ionicons name={item.icon as any} size={20} color="#333" />
                <Text style={styles.menuText}>{t(item.title)}</Text>
              </View>
              {item.isExternal ? (
                <Ionicons name="link" size={20} color="#333" />
              ) : (
                <Ionicons
                  name="chevron-forward-outline"
                  size={20}
                  color="#333"
                />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
      </View>
    </GlobalSafeAreaView>
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
    fontFamily: "Inter_500Medium",
    color: "#333",
    letterSpacing: -0.5,
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
    backgroundColor: "#fff",
  },
  closeButton: {
    position: "absolute",
    right: 24,
    top: 24,
    zIndex: 1,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  footer: {
    alignItems: "center",
    gap: 16,
  },
});
