import React, { useState, useCallback, useRef } from "react";
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

const ChatMessage = ({ message }: { message: ChatMessage }) => (
  <View style={message.role === "user" ? styles.userMessage : styles.aiMessage}>
    <Text>{message.content}</Text>
  </View>
);

const TypingIndicator = () => (
  <View style={styles.aiMessage}>
    <Text>Typing...</Text>
  </View>
);

export default function FlirtCoachScreen() {
  const scrollViewRef = useRef<ScrollView>(null);
  const { showPaywall } = usePaywall();

  const [chatLog, setChatLog] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const isOnline = useOfflineStore((state) => state.isOnline);
  const { incrementMessageCount } = usePremiumStore();

  const onChangeText = useCallback((text: string) => {
    setUserInput(text);
  }, []);

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
            ? "You've sent too many messages. Please wait a moment."
            : "An error occurred. Please try again.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [userInput, chatLog, isOnline, incrementMessageCount]);

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior="height"
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
        keyboardShouldPersistTaps="handled"
      >
        {chatLog.map((message, index) => (
          <ChatMessage key={index} message={message} />
        ))}
        {isTyping && <TypingIndicator />}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={userInput}
          placeholder="Ask anything about flirting..."
          placeholderTextColor="#666"
          multiline
          scrollEnabled
          onChangeText={onChangeText}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Ionicons name="send" size={24} color="#FF6347" />
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
  keyboardAvoidingView: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: "#f5f5f5",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    fontSize: 16,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#FF6347",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "80%",
  },
  aiMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#f5f5f5",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "80%",
  },
});
