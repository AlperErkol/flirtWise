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
    const imageUri = await pickImage();
    setSelectedImage(imageUri as any);
  };

  const startAnalysis = async () => {
    if (!isLoading && !isProMember) {
      await showPaywall();
      return;
    }

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
      <Header
        logo={true}
        showBackButton={true}
        showAddButton={!!selectedImage}
        onAddPress={pickImageHandler}
      />
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

            <View style={styles.separator} />

            <View style={styles.settingsContainer}>
              <TouchableOpacity
                style={[
                  styles.settingCard,
                  hasAdditionalInfo && styles.settingCardActive,
                ]}
                onPress={() => setIsAdditionalInfoModalVisible(true)}
              >
                <View style={styles.settingCardContent}>
                  <View style={styles.settingCardLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="information-circle"
                        size={24}
                        color={hasAdditionalInfo ? "#4F46E5" : "#666"}
                      />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingTitle}>
                        {t("photoContext")}
                      </Text>
                      <Text style={styles.settingSubtitle}>
                        {hasAdditionalInfo
                          ? t("contextAdded")
                          : t("addContextForBetterResults")}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.settingCardRight}>
                    {hasAdditionalInfo ? (
                      <View style={styles.statusBadge}>
                        <Ionicons name="checkmark" size={16} color="#FFF" />
                      </View>
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.settingCard,
                  hasToneSettings && styles.settingCardActive,
                ]}
                onPress={() => setIsToneModalVisible(true)}
              >
                <View style={styles.settingCardContent}>
                  <View style={styles.settingCardLeft}>
                    <View style={styles.iconContainer}>
                      <Ionicons
                        name="chatbubbles"
                        size={24}
                        color={hasToneSettings ? "#4F46E5" : "#666"}
                      />
                    </View>
                    <View style={styles.settingTextContainer}>
                      <Text style={styles.settingTitle}>
                        {t("toneMessagingStyle")}
                      </Text>
                      <Text style={styles.settingSubtitle}>
                        {hasToneSettings
                          ? t("styleConfigured")
                          : t("customizeMessagingTone")}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.settingCardRight}>
                    {hasToneSettings ? (
                      <View style={styles.statusBadge}>
                        <Ionicons name="checkmark" size={16} color="#FFF" />
                      </View>
                    ) : (
                      <Ionicons name="chevron-forward" size={20} color="#666" />
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title={t("generateOpeners")}
                buttonStyle={[globalStyles.button, globalStyles.primaryButton]}
                titleStyle={globalStyles.buttonText}
                onPress={startAnalysis}
                style={{ display: "flex", alignItems: "center" }}
              />
              <View style={styles.hintContainer}>
                <Text style={styles.hintText}>{t("uploadNewImageHint")}</Text>
              </View>
            </View>
          </View>
        )}
      </View>

      {loading && <LoadingOverlay type="photoOpeners" />}

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
    height: 320,
    borderRadius: 10,
    resizeMode: "contain",
    marginVertical: 10,
  },
  separator: {
    height: 1,
    backgroundColor: "#9CA3AF",
    marginVertical: 16,
    marginHorizontal: 16,
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
  settingsContainer: {
    gap: 16,
    marginVertical: 16,
  },
  settingCard: {
    backgroundColor: "#FAFAFA",
    borderRadius: 16,
    padding: 16,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  settingCardActive: {
    borderColor: "#4F46E5",
    backgroundColor: "#F8FAFF",
  },
  settingCardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  settingCardLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  settingCardRight: {
    marginLeft: 12,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#1F2937",
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    letterSpacing: -0.2,
    lineHeight: 18,
  },
  statusBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#4F46E5",
    justifyContent: "center",
    alignItems: "center",
  },
  hintContainer: {
    alignItems: "center",
  },
  hintText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    textAlign: "center",
    letterSpacing: -0.2,
  },
});
