import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import BadgeComponent from "./badge";
import { router } from "expo-router";

export function MainFeatureCard({ feature }: { feature: any }) {
  const { t } = useTranslation();

  const handleFeaturePress = async (feature: any) => {
    router.push(`/features/${feature.screen}` as any);
  };

  return (
    <TouchableOpacity
      style={[
        styles.secondaryCardWrapper,
        { backgroundColor: feature.dark ? "#1c1c1c" : "#FFF" },
      ]}
      onPress={() => handleFeaturePress(feature)}
    >
      <View style={styles.cardContent}>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.emojiContainer,
              { backgroundColor: feature.dark ? "#323232" : "#f1f1f1" },
            ]}
          >
            <Text style={{ fontSize: 24 }}>{feature.emoji}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text
              style={[
                styles.secondaryCardTitle,
                { color: feature.dark ? "#FFF" : "#000" },
              ]}
            >
              {t(feature.title)}
            </Text>
            <Text
              style={[
                styles.secondaryCardDesc,
                { color: feature.dark ? "#FFF" : "#000" },
              ]}
            >
              {t(feature.description)}
            </Text>
          </View>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ display: "flex", flexDirection: "row", gap: 4 }}>
            {feature.tags.map((tag: string) => (
              <BadgeComponent key={tag} value={tag} isDark={feature.dark} />
            ))}
          </View>
          <View
            style={[
              styles.startButtonContainer,
              { backgroundColor: feature.dark ? "#FFF" : "#FF6347" },
            ]}
          >
            <Ionicons
              name="caret-forward-outline"
              size={26}
              color={feature.dark ? "#FF6347" : "#FFF"}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  secondaryCardWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  secondaryCardTitle: {
    color: "#FFF",
    marginBottom: 4,
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
  secondaryCardDesc: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  contentContainer: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  secondaryViewButtonContainer: {
    borderTopWidth: 1,
    borderColor: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  secondaryViewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  secondaryViewButtonText: {
    fontSize: 15,
    fontFamily: "Inter_600SemiBold",
    color: "#fff",
    letterSpacing: -0.5,
  },
  cardContent: {
    padding: 20,
  },
  startButtonContainer: {
    borderRadius: 44,
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
