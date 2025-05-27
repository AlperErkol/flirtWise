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
            <Text style={styles.modalTitle}>{t("photoContext")}</Text>
            <TextInput
              style={styles.textArea}
              multiline
              numberOfLines={4}
              placeholder={t("photoContextPlaceholder")}
              placeholderTextColor="#999"
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    width: "90%",
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    minHeight: 100,
    fontFamily: "Inter_400Regular",
    letterSpacing: -0.5,
    fontSize: 16,
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
