import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
const Quote = () => {
  return (
    <View style={styles.quoteContainer}>
      <View style={styles.quoteIconContainer}>
        <Ionicons name="dice-outline" size={24} color="#000" />
      </View>
      <Text style={styles.quoteText}>
        Send a random emoji combo – make them guess the meaning! 🦄🍕✨
      </Text>
    </View>
  );
};

export default Quote;

const styles = StyleSheet.create({
  quoteContainer: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    marginTop: 6,
    marginBottom: 20,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  quoteIconContainer: {
    backgroundColor: "#FF6347",
    borderRadius: 14,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    flex: 1,
    letterSpacing: -0.5,
  },
});
