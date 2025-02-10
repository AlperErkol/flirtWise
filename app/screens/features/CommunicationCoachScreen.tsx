import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import Theme from "@/constants/Theme";
import CoachHeader from "@/components/CoachHeader";
import {
  getWelcomeMessage,
  getPersonaDetails,
} from "@/utils/communication-coach";
import { sendCommunicationCoachMessage } from "@/services/chat/coach";
import useProfileStore from "@/store/profileStore";

type PersonaStyleType = {
  messageColor: string;
  inputBgColor: string;
};

type PersonaStyles = {
  dating_coach: PersonaStyleType;
  flirting_expert: PersonaStyleType;
  relationship_guru: PersonaStyleType;
};

const PERSONA_STYLES: PersonaStyles = {
  dating_coach: {
    messageColor: "#4FACFE",
    inputBgColor: "rgba(79, 172, 254, 0.1)",
  },
  flirting_expert: {
    messageColor: "#8E2DE2",
    inputBgColor: "rgba(142, 45, 226, 0.1)",
  },
  relationship_guru: {
    messageColor: "#FF416C",
    inputBgColor: "rgba(255, 65, 108, 0.1)",
  },
};

type RouteParams = {
  persona: keyof PersonaStyles;
};

type Props = {
  route: { params: RouteParams };
  navigation: any;
};

export default function CommunicationCoachScreen({ route, navigation }: Props) {
  const { persona } = route.params;
  const personaStyle = PERSONA_STYLES[persona];
  const scrollViewRef = useRef<ScrollView>(null);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useProfileStore((state: any) => state.userProfile);

  const [chatHistory, setChatHistory] = useState<any>(() => {
    return [
      {
        role: "ai",
        content: getWelcomeMessage(persona),
      },
    ];
  });

  const personaDetails = getPersonaDetails(persona);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage("");

    const updatedHistory = [
      ...chatHistory,
      { role: "user", content: userMessage },
    ];
    setChatHistory(updatedHistory);

    setIsLoading(true);
    scrollViewRef.current?.scrollToEnd({ animated: true });

    try {
      const response = await sendCommunicationCoachMessage({
        persona,
        userInfo,
        chatHistory: updatedHistory,
      });

      setChatHistory([
        ...updatedHistory,
        { role: "ai", content: response.response },
      ]);
      scrollViewRef.current?.scrollToEnd({ animated: true });
    } catch (error: any) {
      setChatHistory([
        ...updatedHistory,
        {
          role: "ai",
          content: "Sorry, I couldn't process your message. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [chatHistory]);

  return (
    <View style={styles.container}>
      <CoachHeader
        persona={persona}
        title={personaDetails.title}
        description={personaDetails.description}
        gradient={personaDetails.gradient}
        onBackPress={() => navigation.goBack()}
      />

      <ScrollView
        ref={scrollViewRef}
        style={styles.messagesContainer}
        contentContainerStyle={styles.messagesContent}
      >
        {chatHistory.map((msg: any, index: any) => (
          <View
            key={index}
            style={[
              msg.role === "user" ? styles.userMessage : styles.aiMessage,
              {
                backgroundColor:
                  msg.role === "user"
                    ? personaStyle.messageColor
                    : personaStyle.inputBgColor,
              },
            ]}
          >
            <Text
              style={[
                styles.messageText,
                { color: msg.role === "user" ? "#FFF" : Theme.colors.text },
              ]}
            >
              {msg.content}
            </Text>
          </View>
        ))}
        {isLoading && (
          <View
            style={[
              styles.aiMessage,
              { backgroundColor: personaStyle.inputBgColor },
            ]}
          >
            <ActivityIndicator color={personaStyle.messageColor} />
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.inputWrapper}>
          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: "#fff",
                borderWidth: 1.5,
                borderColor: Theme.colors.border,
              },
            ]}
            value={message}
            onChangeText={setMessage}
            placeholder="Type your message..."
            placeholderTextColor={Theme.colors.textLight}
            multiline
            textAlignVertical="center"
            numberOfLines={1}
            editable={!isLoading}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={[
              styles.sendButton,
              {
                backgroundColor:
                  message.trim() && !isLoading ? Theme.colors.primary : "#eee",
              },
            ]}
            disabled={!message.trim() || isLoading}
          >
            <Ionicons
              name="send"
              size={20}
              color={message.trim() && !isLoading ? "#fff" : "#999"}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 35,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 80,
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    lineHeight: 24,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  userMessage: {
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "80%",
  },
  aiMessage: {
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 16,
    marginVertical: 4,
    maxWidth: "80%",
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
});
