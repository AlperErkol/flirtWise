import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";

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

  return (
    <TouchableOpacity
      onPress={() => handleFeaturePress(item)}
      style={styles.mainFeatureWrapper}
      key={item.id}
    >
      <View style={styles.mainCard}>
        <View style={styles.cardContent}>
          <View style={styles.iconContainer}>
            <Text style={styles.featureIcon}>{item.emoji}</Text>
          </View>
          <View style={styles.textContainer}>
            <View style={styles.titleRow}>
              <Text style={styles.cardTitle}>{item.title}</Text>
            </View>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        </View>
        <View style={styles.viewButtonContainer}>
          <View style={styles.viewButton}>
            <Text style={styles.viewButtonText}>Get Started</Text>
            <Ionicons name="arrow-forward-outline" size={20} />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  mainFeatureWrapper: {
    marginBottom: 15,
  },
  mainCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cardContent: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#D6BDF7",
    borderWidth: 2,
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
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
    letterSpacing: -0.5,
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
    fontFamily: "Inter_600SemiBold",
    color: "#000",
    letterSpacing: -0.5,
  },
});
