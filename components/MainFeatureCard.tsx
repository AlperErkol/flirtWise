import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";

export function MainFeatureCard({
  item,
  navigation,
}: {
  item: any;
  navigation: any;
}) {
  const handleFeaturePress = async (feature: any) => {
    navigation.navigate(`${feature.screen}`);
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
          { backgroundColor: item.dark ? "#1C1C1C" : "#FFF" },
        ]}
      >
        <View style={styles.cardContent}>
          <Text
            style={[styles.cardTitle, { color: item.dark ? "#FFF" : "#000" }]}
          >
            {t(item.title)}
          </Text>
          <View
            style={{
              backgroundColor: item.dark ? "#323232" : "#F3F3F3",
              borderRadius: 34,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              paddingLeft: 8,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                color: item.dark ? "#999" : "#000",
                letterSpacing: -0.5,
                fontFamily: "Inter_500Medium",
              }}
            >
              {t("getStarted")}
            </Text>
            <View style={styles.startButtonContainer}>
              <Ionicons name="caret-forward-outline" size={22} color="#FFF" />
            </View>
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
    gap: 50,
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
    fontSize: 22,
    fontFamily: "Inter_600SemiBold",
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
    borderRadius: 34,
    width: 34,
    height: 34,
    justifyContent: "center",
    alignItems: "center",
  },
});
