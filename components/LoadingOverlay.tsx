import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import {
  loadingMessages,
  LoadingMessageType,
} from "@/constants/loadingMessages";
import { useState, useEffect } from "react";

interface LoadingOverlayProps {
  type: LoadingMessageType;
}

export function LoadingOverlay({ type }: LoadingOverlayProps) {
  const { t } = useTranslation();
  const messages = loadingMessages[type].map((key) => t(key));
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => {
        if (prevIndex === messages.length - 1) {
          return prevIndex;
        }
        return prevIndex + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={styles.loadingText}>{messages[currentMessageIndex]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
    marginTop: 12,
    textAlign: "center",
    paddingHorizontal: 20,
  },
});
