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
          height: 80,
          borderRadius: 20,
          backgroundColor: "white",
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 5,
          elevation: 5,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontFamily: "Inter_500Medium",
          letterSpacing: -0.5,
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
              <Ionicons name="cog" size={22} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: t("home"),
          tabBarIcon: ({ focused }) => (
            <View>
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "white",
                  padding: 6,
                  borderRadius: 60,
                  width: 70,
                  height: 70,
                  marginTop: -40,
                  left: -10,
                }}
              ></View>
              <View
                style={{
                  backgroundColor: "#FF6347",
                  padding: 6,
                  borderRadius: 30,
                  width: 50,
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  marginTop: -30,
                  shadowColor: focused ? "#FF6347" : "transparent",
                  shadowOpacity: focused ? 0.5 : 0,
                  shadowRadius: focused ? 8 : 0,
                }}
              >
                <Ionicons name="home" size={28} color="white" />
              </View>
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
              <Ionicons name="person" size={22} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
