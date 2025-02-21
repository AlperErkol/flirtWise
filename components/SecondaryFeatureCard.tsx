import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";
import BadgeComponent from "./badge";

export function SecondaryFeatureCard({ item }: { item: any }) {
  const handleFeaturePress = async (feature: any) => {
    router.push(`/features/${feature.screen}` as any);
  };

  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => handleFeaturePress(item)}
      style={styles.mainFeatureWrapper}
      key={item.id}
    >
      <View
        style={[
          styles.mainCard,
          { backgroundColor: item.dark ? "#FF6347" : "#FFF" },
        ]}
      >
        <View style={styles.cardContent}>
          <View style={styles.emojiContainer}>
            <Text style={{ fontSize: 24 }}>{item.emoji}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              marginBottom: 6,
            }}
          >
            <Text
              style={[styles.cardTitle, { color: item.dark ? "#FFF" : "#000" }]}
            >
              {t(item.title)}
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: item.dark ? "#FFF" : "#000",
              }}
            >
              {t(item.description)}
            </Text>
          </View>
          <View style={styles.badgeContainer}>
            <Text style={styles.badge}>Get Started</Text>
            <Ionicons name="caret-forward-outline" size={24} color="#FFF" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainFeatureWrapper: {
    flex: 1,
    marginBottom: 15,
  },
  mainCard: {
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
  },
  cardContent: {
    padding: 20,
    flexDirection: "column",
    gap: 10,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  featureIcon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 19,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    letterSpacing: -0.5,
    width: 120,
  },
  cardDesc: {
    fontSize: 14,
    color: "#666",
    letterSpacing: -0.5,
  },
  viewButtonContainer: {
    borderTopWidth: 2,
    borderColor: "#D6BDF7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  viewButtonText: {
    fontSize: 15,
    fontFamily: "Inter_500Medium",
    color: "#000",
    letterSpacing: -0.5,
  },
  startButtonContainer: {
    backgroundColor: "#FF6347",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  badge: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#FFF",
    letterSpacing: -0.5,
  },
  badgeContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#FF6347",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 16,
    textAlign: "center",
  },
});
