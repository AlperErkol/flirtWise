import { StyleSheet, View, Text, ActivityIndicator } from "react-native";

export function LoadingOverlay() {
  return (
    <View style={styles.loadingOverlay}>
      <ActivityIndicator size="large" color="#FF6347" />
      <Text style={styles.loadingText}>Analyzing chat...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
});
