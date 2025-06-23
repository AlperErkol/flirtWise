import Theme from "@/constants/Theme";
import { useTranslation } from "@/hooks/useTranslation";
import React from "react";
import {
  Modal,
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface AdditionalInfoModalProps {
  visible: boolean;
  onClose: () => void;
  additionalInfo: string;
  onChangeText: (text: string) => void;
}

export default function AdditionalInfoModal({
  visible,
  onClose,
  additionalInfo,
  onChangeText,
}: AdditionalInfoModalProps) {
  const { t } = useTranslation();

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
            <View style={styles.titleContainer}>
              <Text style={styles.modalTitle}>{t("photoContext")}</Text>
              <TouchableOpacity
                style={[
                  styles.clearButton,
                  additionalInfo.trim().length === 0 &&
                    styles.clearButtonDisabled,
                ]}
                onPress={() => onChangeText("")}
                disabled={additionalInfo.trim().length === 0}
              >
                <Ionicons
                  name="trash-outline"
                  size={16}
                  color={
                    additionalInfo.trim().length === 0 ? "#9CA3AF" : "white"
                  }
                  style={styles.clearButtonIcon}
                />
                <Text
                  style={[
                    styles.clearButtonText,
                    additionalInfo.trim().length === 0 &&
                      styles.clearButtonTextDisabled,
                  ]}
                >
                  {t("clear")}
                </Text>
              </TouchableOpacity>
            </View>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder={t("photoContextPlaceholder")}
              placeholderTextColor="#9CA3AF"
              value={additionalInfo}
              onChangeText={onChangeText}
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.buttonText}>{t("close")}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={onClose}>
                <Text style={styles.buttonText}>{t("add")}</Text>
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
    maxWidth: 400,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 12,
  },
  modalTitle: {
    fontSize: 22,
    fontFamily: "Inter_700Bold",
    letterSpacing: -0.6,
    color: "#1F2937",
    flex: 1,
  },
  textArea: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderRadius: 16,
    padding: 16,
    minHeight: 120,
    fontFamily: "Inter_400Regular",
    letterSpacing: -0.3,
    fontSize: 16,
    backgroundColor: "#FAFAFA",
    textAlignVertical: "top",
    color: "#374151",
    lineHeight: 22,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  submitButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 16,
    flex: 1,
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
    letterSpacing: -0.4,
    fontSize: 16,
  },
  clearButton: {
    backgroundColor: "#EF4444",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#EF4444",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  clearButtonIcon: {
    marginRight: 4,
  },
  clearButtonDisabled: {
    backgroundColor: "#D1D5DB",
    shadowOpacity: 0,
    elevation: 0,
  },
  clearButtonText: {
    color: "white",
    textAlign: "center",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.4,
    fontSize: 14,
  },
  clearButtonTextDisabled: {
    color: "#9CA3AF",
  },
});
