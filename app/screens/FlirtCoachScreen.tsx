import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import { sendFlirtMessage } from "@/utils/flirtCoach";
import Theme from "@/constants/Theme";
import useOfflineStore from "@/store/offlineStore";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { usePremiumStore } from "@/store/usePremiumStore";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { usePaywall } from "@/hooks/usePaywall";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export default function FlirtCoachScreen() {
  const { showPaywall } = usePaywall();


  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const { incrementMessageCount } = usePremiumStore();

  const handleSend = useCallback(async () => {
    if (!userInput.trim()) return;

    const canSendMessage = await incrementMessageCount();
    if (!canSendMessage) {
      const purchased = await showPaywall();
      if (purchased) {
        handleSend();
      }
      return;
    }

    const userMessage: ChatMessage = {
      role: "user",
      content: userInput,
    };

    setChatLog((prev) => [...prev, userMessage]);
    setUserInput("");
    setIsTyping(true);

    try {
      const aiMessage = await sendFlirtMessage([...chatLog, userMessage]);
      setChatLog((prev) => [
        ...prev,
        {
          role: "assistant",
          content: aiMessage.content,
        },
      ]);
    } catch (error: any) {
      setChatLog((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.message.includes("Rate limit")
            ? "Çok fazla mesaj gönderdiniz. Lütfen biraz bekleyin."
            : "Bir hata oluştu. Lütfen tekrar deneyin.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [userInput, chatLog, isOnline, incrementMessageCount]);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ paddingBottom: 20 }}
      >
        {chatLog.map((msg: any, index) => {
          const isUser = msg.role === "user";
          return (
            <LinearGradient
              key={index}
              colors={isUser ? ["#FF9A8B", "#FF6F61"] : ["#E6E6FA", "#E6E6FA"]}
              style={[
                styles.messageBubble,
                isUser ? styles.userBubble : styles.aiBubble,
              ]}
            >
              <Text style={styles.messageText}>{msg.content}</Text>
            </LinearGradient>
          );
        })}
        {isTyping && <View style={styles.typingIndicator}></View>}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="What’s your question? Let’s make it fun!"
          placeholderTextColor="#999"
          value={userInput}
          onChangeText={setUserInput}
        />
        <TouchableOpacity
          onPress={handleSend}
          disabled={isTyping}
          style={styles.sendButton}
        >
          <Ionicons
            name="send"
            size={24}
            color={isTyping ? "#ccc" : "#FF6F61"}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Theme.colors.background,
  },
  header: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "transparent",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  chatContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  messageBubble: {
    padding: 12,
    borderRadius: 20,
    marginVertical: 5,
    maxWidth: "80%",
    alignSelf: "flex-start",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  userBubble: {
    alignSelf: "flex-end",
  },
  aiBubble: {
    alignSelf: "flex-start",
  },
  messageText: {
    fontSize: 16,
    color: "#333",
  },
  typingIndicator: {
    alignSelf: "flex-start",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: "#333",
  },
  sendButton: {
    marginLeft: 10,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
});
