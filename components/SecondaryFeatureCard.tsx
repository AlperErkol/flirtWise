import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

export function SecondaryFeatureCard({
  feature,
  navigation,
}: {
  feature: any;
  navigation: any;
}) {
  const handleFeaturePress = async (feature: any) => {
    navigation.navigate(`${feature.screen}`);
  };

  return (
    <TouchableOpacity
      style={styles.secondaryCardWrapper}
      onPress={() => handleFeaturePress(feature)}
    >
      <LinearGradient
        colors={feature.gradient as any}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.secondaryCard}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{feature.emoji}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.secondaryCardTitle}>{feature.title}</Text>
          <Text style={styles.secondaryCardDesc}>{feature.description}</Text>
        </View>
        <View style={styles.secondaryViewButtonContainer}>
          <View style={styles.secondaryViewButton}>
            <Text style={styles.secondaryViewButtonText}>View</Text>
            <Ionicons color={"#FFF"} name="arrow-forward-outline" size={20} />
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  secondaryFeatureContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  secondaryCardWrapper: {
    flex: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  secondaryCard: {
    padding: 16,
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginBottom: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 20,
  },
  secondaryCardTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  secondaryCardDesc: {
    fontSize: 13,
    fontFamily: "Inter_400Regular",
    color: "#FFF",
    letterSpacing: -0.2,
  },
  contentContainer: {
    marginBottom: 16,
  },
  secondaryViewButtonContainer: {
    borderTopWidth: 1,
    borderColor: "#D6BDF7",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
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
});
