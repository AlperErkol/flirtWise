import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import AdditionalInfoModal from "@/components/AdditionalInfoModal";
import ToneMessagingModal from "@/components/ToneMessagingModal";
import CustomBottomSheetView from "@/components/CustomBottomSheetView";
import pickImage from "@/common/image";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import handleImageProcessing from "@/common/photo";
import { Button } from "@rneui/themed";
import globalStyles from "@/constants/style";
import { useTranslation } from "@/hooks/useTranslation";
import { useRateUs } from "@/hooks/useRateUs";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { usePaywall } from "@/hooks/usePaywall";
import { AdditionalParams } from "@/constants/types";

export default function ChatEnhancerScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [chatContext, setChatContext] = useState("");
  const [isDeadConversation, setIsDeadConversation] = useState(false);
  const [isAdditionalInfoModalVisible, setIsAdditionalInfoModalVisible] =
    useState(false);
  const [isToneModalVisible, setIsToneModalVisible] = useState(false);
  const [additionalSettings, setAdditionalSettings] =
    useState<AdditionalParams>({
      conversationStyle: "",
      spellingStyle: "medium",
      riskLevel: "medium",
    });
  const { t } = useTranslation();
  const { checkAndShowRateUs, incrementActionCount } = useRateUs();
  const { isProMember, isLoading } = useRevenueCat();
  const { showPaywall } = usePaywall();

  useEffect(() => {
    if (suggestions.length > 0) {
      bottomSheetRef.current?.expand();
    }
  }, [suggestions]);

  const pickImageHandler = async () => {
    if (!isLoading && !isProMember) {
      await showPaywall();
      return;
    } else {
      const imageUri = await pickImage();
      setSelectedImage(imageUri as any);
    }
  };

  const startAnalysis = async () => {
    setLoading(true);
    setSuggestions([]);
    const suggestions = await handleImageProcessing(
      selectedImage as any,
      "chat_enhancer",
      chatContext,
      additionalSettings,
      isDeadConversation
    );
    setSuggestions(suggestions);
    setLoading(false);

    await incrementActionCount();
    await checkAndShowRateUs();
  };

  const renderBackdrop = useMemo(
    () => (props: any) =>
      (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.6}
        />
      ),
    []
  );

  const onAdditionalInfoModalClose = () => {
    setIsAdditionalInfoModalVisible(false);
  };

  const onToneModalClose = () => {
    setIsToneModalVisible(false);
  };

  const hasAdditionalInfo = chatContext.trim().length > 0;
  const hasToneSettings =
    additionalSettings.conversationStyle?.trim().length > 0 ||
    additionalSettings.spellingStyle !== "medium" ||
    additionalSettings.riskLevel !== "medium";

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />

      <View style={styles.container}>
        {!selectedImage ? (
          <>
            <View style={styles.heroContainer}>
              <View style={styles.instructionContainer}>
                <Text style={styles.instructionText}>
                  {t("chatEnhancerInstruction")}
                </Text>
              </View>
              <Image
                source={require("@/assets/images/chat-enhancer.png")}
                style={styles.heroImage}
              />
            </View>

            <Button
              title={t("uploadScreenshot")}
              buttonStyle={[globalStyles.button, globalStyles.primaryButton]}
              titleStyle={globalStyles.buttonText}
              onPress={pickImageHandler}
              style={{ display: "flex", alignItems: "center" }}
            />
          </>
        ) : (
          <View>
            <Image
              source={{ uri: selectedImage }}
              style={styles.imagePreview}
            />

            <View style={styles.switchRow}>
              <Text style={styles.switchLabel}>{t("isStuckConversation")}</Text>
              <Switch
                value={isDeadConversation}
                onValueChange={setIsDeadConversation}
                trackColor={{ false: "#D1D5DB", true: "#4F46E5" }}
                thumbColor={isDeadConversation ? "#FFFFFF" : "#FFFFFF"}
              />
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchLabelContainer}>
                <Text style={styles.switchLabel}>{t("photoContext")}</Text>
                {hasAdditionalInfo && (
                  <Ionicons name="checkmark-circle" size={24} color="#4F46E5" />
                )}
              </View>
              <View style={styles.addInfoContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setIsAdditionalInfoModalVisible(true)}
                >
                  <Text style={styles.additionalButtonText}>
                    {hasAdditionalInfo ? t("edit") : t("add")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.switchRow}>
              <View style={styles.switchLabelContainer}>
                <Text style={styles.switchLabel}>
                  {t("toneMessagingStyle")}
                </Text>
                {hasToneSettings && (
                  <Ionicons name="checkmark-circle" size={24} color="#4F46E5" />
                )}
              </View>
              <View style={styles.addInfoContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setIsToneModalVisible(true)}
                >
                  <Text style={styles.additionalButtonText}>
                    {hasToneSettings ? t("edit") : t("add")}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <View style={styles.buttonRow}>
                <View style={styles.enhanceButtonContainer}>
                  <Button
                    title={t("enhanceChat")}
                    buttonStyle={[
                      globalStyles.button,
                      globalStyles.primaryButton,
                    ]}
                    titleStyle={globalStyles.buttonText}
                    onPress={() => startAnalysis()}
                  />
                </View>
                <View style={styles.uploadButtonContainer}>
                  <Button
                    title={t("newImage")}
                    buttonStyle={[
                      globalStyles.button,
                      globalStyles.transparentButton,
                    ]}
                    titleStyle={[globalStyles.buttonText, { color: "#000" }]}
                    onPress={pickImageHandler}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
      {loading && <LoadingOverlay />}
      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["80%"]}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        backdropComponent={renderBackdrop}
      >
        <CustomBottomSheetView
          title={t("chatSuggestions")}
          suggestions={suggestions}
          bottomSheetRef={bottomSheetRef}
        />
      </BottomSheet>

      <AdditionalInfoModal
        visible={isAdditionalInfoModalVisible}
        onClose={onAdditionalInfoModalClose}
        additionalInfo={chatContext}
        onChangeText={setChatContext}
      />

      <ToneMessagingModal
        visible={isToneModalVisible}
        onClose={onToneModalClose}
        additionalSettings={additionalSettings}
        setAdditionalSettings={setAdditionalSettings}
      />
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  instructionContainer: {
    paddingHorizontal: 16,
    paddingTop: 32,
    alignItems: "center",
  },
  instructionText: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#000",
    textAlign: "center",
    letterSpacing: -0.8,
  },
  heroContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heroImage: {
    width: "100%",
    height: 500,
    resizeMode: "contain",
  },
  pickButton: {
    backgroundColor: Theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
  pickText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
  imagePreview: {
    width: "100%",
    height: 400,
    borderRadius: 10,
    resizeMode: "contain",
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 12,
    marginTop: 16,
  },
  analyzeButton: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
  bottomSheetBackground: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  bottomSheetIndicator: {
    backgroundColor: "#FF6347",
    width: 40,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 4,
    marginBottom: 4,
  },
  switchLabel: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#000",
    letterSpacing: -0.5,
  },
  addInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  addButton: {
    backgroundColor: "#000",
    padding: 5,
    borderRadius: 12,
  },
  addedInfoBadge: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  addedInfoText: {
    color: "#4CAF50",
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  additionalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
    padding: 4,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  buttonRow: {
    flexDirection: "row",
    gap: 8,
  },
  enhanceButtonContainer: {
    flex: 2,
  },
  uploadButtonContainer: {
    flex: 1,
  },
  enhanceButton: {
    flex: 2,
  },
  uploadButton: {
    flex: 1,
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#000",
  },
  uploadButtonText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
});
