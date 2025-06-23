import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";

export default function TabLayout() {
  const { t } = useTranslation();
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#FF6347",
        tabBarInactiveTintColor: "#999",
        tabBarStyle: {
          height: 90,
          borderRadius: 20,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          borderTopWidth: 0,
          paddingTop: 10,
          paddingBottom: 10,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          flex: 1,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Inter_500Medium",
          letterSpacing: -0.5,
          marginTop: 4,
        },
        tabBarIconStyle: {
          marginBottom: 2,
        },
      }}
    >
      <Tabs.Screen
        name="settings"
        options={{
          headerShown: false,
          title: t("settings"),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                shadowColor: focused ? "#FF6347" : "transparent",
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: focused ? 8 : 0,
              }}
            >
              <Ionicons name="cog" size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: t("home"),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                shadowColor: focused ? "#FF6347" : "transparent",
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: focused ? 8 : 0,
              }}
            >
              <Ionicons name="home" size={24} color={color} />
            </View>
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: t("profile"),
          tabBarIcon: ({ color, focused }) => (
            <View
              style={{
                shadowColor: focused ? "#FF6347" : "transparent",
                shadowOpacity: focused ? 0.5 : 0,
                shadowRadius: focused ? 8 : 0,
              }}
            >
              <Ionicons name="person" size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
