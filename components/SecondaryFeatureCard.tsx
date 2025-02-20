import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import BadgeComponent from "./badge";

export function SecondaryFeatureCard({
  feature,
  navigation,
}: {
  feature: any;
  navigation: any;
}) {
  const { t } = useTranslation();

  const handleFeaturePress = async (feature: any) => {
    navigation.navigate(`${feature.screen}`);
  };

  return (
    <TouchableOpacity
      style={[
        styles.secondaryCardWrapper,
        { backgroundColor: feature.dark ? "#FF6347" : "#FFF" },
      ]}
      onPress={() => handleFeaturePress(feature)}
    >
      <View style={styles.cardContent}>
        <View style={styles.contentContainer}>
          <Ionicons
            name={feature.icon}
            size={24}
            color={feature.dark ? "#FFF" : "#000"}
          />
          <View>
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
    fontSize: 19,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    marginBottom: 4,
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
});
