import {
  convoStyles,
  riskLevels,
  spellingStyles,
} from "@/constants/settings/convo-style";
import Theme from "@/constants/Theme";
import { useTranslation } from "@/hooks/useTranslation";
import React from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import {
  RISK_PROMPT,
  RiskLevel,
  SPELLING_RULE,
  SpellingStyle,
} from "@/prompts/config";
import { AdditionalParams } from "@/constants/types";

interface ToneMessagingModalProps {
  visible: boolean;
  onClose: () => void;
  additionalSettings: AdditionalParams;
  setAdditionalSettings: (settings: AdditionalParams) => void;
}

export default function ToneMessagingModal({
  visible,
  onClose,
  additionalSettings,
  setAdditionalSettings,
}: ToneMessagingModalProps) {
  const { t } = useTranslation();

  const updateConversationStyle = (style: string) => {
    setAdditionalSettings({
      ...additionalSettings,
      conversationStyle:
        additionalSettings.conversationStyle === style ? "" : style,
    });
  };

  const updateSpellingStyle = (style: SpellingStyle) => {
    setAdditionalSettings({
      ...additionalSettings,
      spellingStyle:
        additionalSettings.spellingStyle === style ? "medium" : style,
    });
  };

  const updateRiskLevel = (level: RiskLevel) => {
    setAdditionalSettings({
      ...additionalSettings,
      riskLevel: additionalSettings.riskLevel === level ? "medium" : level,
    });
  };

  const getSpellingStyleDescription = (): string => {
    return SPELLING_RULE[
      additionalSettings.spellingStyle as keyof typeof SPELLING_RULE
    ];
  };

  const getRiskLevelDescription = (): string => {
    return RISK_PROMPT[
      additionalSettings.riskLevel as keyof typeof RISK_PROMPT
    ];
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t("conversationStyle")}</Text>
              <View style={styles.convoStyleRow}>
                {convoStyles.map((style) => (
                  <TouchableOpacity
                    key={style.id}
                    style={[
                      styles.convoStyleButton,
                      additionalSettings.conversationStyle === style.id &&
                        styles.selectedConvoStyle,
                    ]}
                    onPress={() => updateConversationStyle(style.id)}
                  >
                    <Text
                      style={[
                        styles.convoStyleButtonText,
                        additionalSettings.conversationStyle === style.id &&
                          styles.selectedConvoStyleText,
                      ]}
                    >
                      {t(style.key)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t("spellingStyle")}</Text>
              <View style={styles.optionButtonsContainer}>
                {spellingStyles.map((level) => (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.optionButton,
                      additionalSettings.spellingStyle === level.id &&
                        styles.selectedOptionButton,
                    ]}
                    onPress={() =>
                      updateSpellingStyle(level.id as SpellingStyle)
                    }
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        additionalSettings.spellingStyle === level.id &&
                          styles.selectedOptionButtonText,
                      ]}
                    >
                      {t(level.key)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.description}>
                {getSpellingStyleDescription()}
              </Text>
            </View>

            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{t("riskLevel")}</Text>
              <View style={styles.optionButtonsContainer}>
                {riskLevels.map((level) => (
                  <TouchableOpacity
                    key={level.id}
                    style={[
                      styles.optionButton,
                      additionalSettings.riskLevel === level.id &&
                        styles.selectedOptionButton,
                    ]}
                    onPress={() => updateRiskLevel(level.id as RiskLevel)}
                  >
                    <Text
                      style={[
                        styles.optionButtonText,
                        additionalSettings.riskLevel === level.id &&
                          styles.selectedOptionButtonText,
                      ]}
                    >
                      {t(level.key)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.description}>
                {getRiskLevelDescription()}
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>{t("close")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={onClose}>
                <Text style={styles.buttonText}>{t("save")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    width: "90%",
    maxWidth: 420,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },

  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    marginBottom: 14,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.6,
    color: "#1F2937",
  },
  convoStyleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 8,
  },
  convoStyleButton: {
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 16,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedConvoStyle: {
    borderColor: Theme.colors.primary,
    backgroundColor: `${Theme.colors.primary}10`,
  },
  convoStyleButtonText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#374151",
    letterSpacing: -0.5,
  },
  selectedConvoStyleText: {
    color: Theme.colors.primary,
  },
  optionButtonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    justifyContent: "space-between",
  },
  optionButton: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 46,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  selectedOptionButton: {
    borderColor: Theme.colors.primary,
    backgroundColor: `${Theme.colors.primary}15`,
  },
  optionButtonText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#374151",
    letterSpacing: -0.5,
    textAlign: "center",
    lineHeight: 16,
  },
  selectedOptionButtonText: {
    color: Theme.colors.primary,
    fontFamily: "Inter_600SemiBold",
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "center",
    lineHeight: 16,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  submitButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flex: 1,
    marginLeft: 8,
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  cancelButton: {
    backgroundColor: "#6B7280",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flex: 1,
    marginRight: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
    fontSize: 16,
  },
});
