import React, { useState, useRef, useMemo, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import CustomBottomSheetView from "@/components/CustomBottomSheetView";
import pickImage from "@/common/image";
import AdditionalInfoModal from "@/components/AdditionalInfoModal";
import ToneMessagingModal from "@/components/ToneMessagingModal";
import handleImageProcessing from "@/common/photo";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Button } from "@rneui/themed";
import globalStyles from "@/constants/style";
import { useTranslation } from "@/hooks/useTranslation";
import { useRateUs } from "@/hooks/useRateUs";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { usePaywall } from "@/hooks/usePaywall";
import { AdditionalParams } from "@/constants/types";

export default function PhotoOpenersScreen() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [photoContext, setPhotoContext] = useState("");
  const [additionalSettings, setAdditionalSettings] =
    useState<AdditionalParams>({
      conversationStyle: "",
      spellingStyle: "medium",
      riskLevel: "medium",
    });
  const [isAdditionalInfoModalVisible, setIsAdditionalInfoModalVisible] =
    useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [isToneModalVisible, setIsToneModalVisible] = useState(false);
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
      "photo_openers",
      photoContext,
      additionalSettings
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

  const hasAdditionalInfo = photoContext.trim().length > 0;
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
            <View style={styles.instructionContainer}>
              <Text style={styles.instructionText}>
                {t("photoAnalysisInstruction")}
              </Text>
            </View>
            <View style={styles.heroContainer}>
              <Image
                source={require("@/assets/images/photo-based.png")}
                style={styles.heroImage}
              />
            </View>
            <Button
              title={t("uploadImage")}
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
              <Button
                title={t("generateOpeners")}
                buttonStyle={[globalStyles.button, globalStyles.primaryButton]}
                titleStyle={globalStyles.buttonText}
                onPress={startAnalysis}
                style={{ display: "flex", alignItems: "center" }}
              />
              <Button
                title={t("uploadNewImage")}
                buttonStyle={[
                  globalStyles.button,
                  globalStyles.transparentButton,
                ]}
                titleStyle={[
                  globalStyles.buttonText,
                  globalStyles.transparentButton,
                ]}
                onPress={pickImageHandler}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              />
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
          title={t("suggestedOpeners")}
          suggestions={suggestions}
          bottomSheetRef={bottomSheetRef}
        />
      </BottomSheet>

      <AdditionalInfoModal
        visible={isAdditionalInfoModalVisible}
        onClose={onAdditionalInfoModalClose}
        additionalInfo={photoContext}
        onChangeText={setPhotoContext}
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

export const styles = StyleSheet.create({
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
  pickText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    letterSpacing: -0.5,
    fontFamily: "Inter_600SemiBold",
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
  bottomSheetContent: {
    flex: 1,
    padding: 20,
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
    color: "#000000",
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
  additionalButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    padding: 4,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
