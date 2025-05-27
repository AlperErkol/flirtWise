import convoStyles from "@/constants/settings/convo-style";
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
      spellingStyle: style,
    });
  };

  const updateRiskLevel = (level: RiskLevel) => {
    setAdditionalSettings({
      ...additionalSettings,
      riskLevel: level,
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
              <View style={styles.riskButtonsRow}>
                {["strict", "medium", "loose", "mirror"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.riskLevelButton,
                      additionalSettings.spellingStyle === level &&
                        styles.selectedRiskLevel,
                    ]}
                    onPress={() => updateSpellingStyle(level as SpellingStyle)}
                  >
                    <Text
                      style={[
                        styles.riskLevelButtonText,
                        additionalSettings.spellingStyle === level &&
                          styles.selectedRiskLevelText,
                      ]}
                    >
                      {level === "strict"
                        ? t("strict")
                        : level === "medium"
                        ? t("medium")
                        : level === "loose"
                        ? t("loose")
                        : t("mirror")}
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
              <View style={styles.riskButtonsRow}>
                {["soft", "medium", "bold"].map((level) => (
                  <TouchableOpacity
                    key={level}
                    style={[
                      styles.riskLevelButton,
                      additionalSettings.riskLevel === level &&
                        styles.selectedRiskLevel,
                    ]}
                    onPress={() => updateRiskLevel(level as RiskLevel)}
                  >
                    <Text
                      style={[
                        styles.riskLevelButtonText,
                        additionalSettings.riskLevel === level &&
                          styles.selectedRiskLevelText,
                      ]}
                    >
                      {level === "soft"
                        ? t("soft")
                        : level === "medium"
                        ? t("medium")
                        : t("bold")}
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
    maxHeight: "80%",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 20,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.5,
    textAlign: "left",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    marginBottom: 12,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
  convoStyleRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 8,
  },
  convoStyleButton: {
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    borderWidth: 2,
    borderColor: "#F3F4F6",
  },
  selectedConvoStyle: {
    borderColor: Theme.colors.primary,
  },
  convoStyleButtonText: {
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#000",
    letterSpacing: -0.5,
  },
  selectedConvoStyleText: {
    color: Theme.colors.primary,
  },
  riskButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    gap: 8,
  },
  riskLevelButton: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#F3F4F6",
    alignItems: "center",
  },
  selectedRiskLevel: {
    borderColor: Theme.colors.primary,
  },
  riskLevelButtonText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#000",
    letterSpacing: -0.5,
  },
  selectedRiskLevelText: {
    color: Theme.colors.primary,
  },
  description: {
    fontSize: 12,
    fontFamily: "Inter_400Regular",
    color: "#666",
    fontStyle: "italic",
    marginTop: 8,
    textAlign: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
  },
  cancelButton: {
    backgroundColor: "#666",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 10,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
    fontSize: 16,
  },
});
