import { StyleSheet } from "react-native";
import Theme from "./Theme";

const globalStyles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    letterSpacing: -0.5,
    fontFamily: "Inter_600SemiBold",
  },
  primaryButton: {
    backgroundColor: Theme.colors.primary,
  },
  secondaryButton: {
    backgroundColor: "#4F46E5",
  },
  transparentButton: {
    backgroundColor: "transparent",
    color: "#000",
  },
});

export default globalStyles;
