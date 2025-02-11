import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import * as ImagePicker from "expo-image-picker";
import useProfileStore from "../../../store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import { usePremiumStore } from "@/store/usePremiumStore";
import { usePaywall } from "@/hooks/usePaywall";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { uploadImageToCloudinary } from "@/services/cloudinary";
import { generatePhotoOpeners } from "@/services/photo";
import AdditionalInfoModal from "@/components/AdditionalInfoModal";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { useRateUs } from "@/hooks/useRateUs";

export default function PhotoOpenersScreen() {
  const { showPaywall } = usePaywall();
  const { incrementPhotoCount, dailyPhotoCount } = usePremiumStore();
  const { isProMember } = useRevenueCat();
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hasAdditionalInfo, setHasAdditionalInfo] = useState(false);
  const { checkAndShowRateUs } = useRateUs();

  useEffect(() => {
    if (suggestions.length > 0) {
      bottomSheetRef.current?.expand();
    }
  }, [suggestions]);

  const handleImageProcessing = async (imageUri: string) => {
    if (!isProMember) {
      setLoading(true);
      const canAnalyzePhoto = await incrementPhotoCount();
      if (!canAnalyzePhoto) {
        setLoading(false);
        Alert.alert(
          "Photo Analysis Limit Reached",
          "You've reached your free photo analysis limit. Upgrade to Premium+ for unlimited photo analyses!",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Upgrade to Premium+",
              onPress: async () => {
                await showPaywall();
              },
            },
          ]
        );
        return;
      }
    }

    try {
      const cloudinaryImage: any = await uploadImageToCloudinary(imageUri);
      const imageUrl = cloudinaryImage.secure_url;
      const newSuggestions = await generatePhotoOpeners(
        imageUrl,
        userProfile,
        additionalInfo
      );

      if (Array.isArray(newSuggestions) && newSuggestions.length > 0) {
        setSuggestions(newSuggestions);
      } else {
        console.error("Invalid suggestions format:", newSuggestions);
        setSuggestions(["No valid suggestions generated. Please try again."]);
      }
    } catch (error) {
      console.error("Error in handleImageProcessing:", error);
      setSuggestions(["An error occurred, please try again."]);
    } finally {
      setLoading(false);
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Gallery access permission denied!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });
    if (!pickerResult.canceled) {
      const imageUri = pickerResult.assets[0].uri;
      setSelectedImage(imageUri as any);
    }
  };

  const startAnalysis = async () => {
    setLoading(true);
    setSuggestions([]);
    await handleImageProcessing(selectedImage as any);
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

  const handleSubmit = () => {
    if (additionalInfo.trim().length > 0) {
      setHasAdditionalInfo(true);
    } else {
      setHasAdditionalInfo(false);
    }
    setAdditionalInfo(additionalInfo);
    setModalVisible(false);
  };

  const remainingAnalyzes = 1 - dailyPhotoCount;

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            {!selectedImage ? (
              <>
                <View style={styles.instructionContainer}>
                  <Text style={styles.instructionText}>
                    Upload a photo or story that you want to reply
                  </Text>
                </View>
                <View style={styles.heroContainer}>
                  <Image
                    source={require("@/assets/images/photo-based.png")}
                    style={styles.heroImage}
                  />
                </View>
                <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                  <Text style={styles.pickText}>Upload an Image</Text>
                </TouchableOpacity>
                {!isProMember && (
                  <TouchableOpacity
                    style={styles.analyzeAllowance}
                    onPress={showPaywall}
                  >
                    <Text style={styles.analyzeAllowanceText}>
                      {remainingAnalyzes} analyze left
                    </Text>
                  </TouchableOpacity>
                )}
              </>
            ) : (
              <View>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.imagePreview}
                />
                <View style={styles.switchRow}>
                  <View style={styles.switchLabelContainer}>
                    <Text style={styles.switchLabel}>Additional Context</Text>
                    {hasAdditionalInfo && (
                      <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#4F46E5"
                      />
                    )}
                  </View>
                  <View style={styles.addInfoContainer}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={() => setModalVisible(true)}
                    >
                      {hasAdditionalInfo ? (
                        <Text style={styles.additionalButtonText}>Edit</Text>
                      ) : (
                        <Text style={styles.additionalButtonText}>Add</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={styles.analyzeButton}
                    onPress={startAnalysis}
                  >
                    <Text style={styles.buttonText}>Generate Openers ⚡️</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.uploadButton}
                    onPress={pickImage}
                  >
                    <Text
                      style={{
                        color: "#FF6347",
                        fontSize: 16,
                        fontFamily: "Inter_600SemiBold",
                        letterSpacing: -0.5,
                      }}
                    >
                      Upload a New Image
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#FF6347" />
          <Text style={styles.loadingText}>Analyzing photo...</Text>
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["70%"]}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        backdropComponent={renderBackdrop}
        onClose={() => {
          checkAndShowRateUs();
        }}
      >
        <BottomSheetView style={styles.bottomSheetContent}>
          <View style={styles.bottomSheetHeader}>
            <View style={styles.titleContainer}>
              <Ionicons name="sparkles" size={24} color="#FFD700" />
              <Text style={styles.bottomSheetTitle}>Suggested Openers</Text>
            </View>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {suggestions.length > 0 ? (
            suggestions.map((suggestion, index) => (
              <View key={index} style={styles.suggestionContainer}>
                <Text style={styles.suggestionText}>{suggestion}</Text>
                <View style={styles.suggestionActions}>
                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={() => Clipboard.setString(suggestion)}
                  >
                    <Ionicons name="copy-outline" size={20} color="#666" />
                    <Text style={styles.copyText}>Copy</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))
          ) : (
            <Text style={styles.noSuggestionsText}>
              No suggestions available
            </Text>
          )}
        </BottomSheetView>
      </BottomSheet>

      <AdditionalInfoModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        additionalInfo={additionalInfo}
        onChangeText={setAdditionalInfo}
        onSubmit={handleSubmit}
      />
    </GlobalSafeAreaView>
  );
}

export const styles = StyleSheet.create({
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
  pickButtonContainer: {
    backgroundColor: Theme.colors.primary,
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "90%",
  },
  pickButton: {
    backgroundColor: Theme.colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
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
  suggestionText: {
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  indicator: {
    marginTop: 10,
  },

  input: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: "white",
    fontSize: 16,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    color: "#374151",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    minHeight: 100,
    textAlignVertical: "top",
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 12,
  },
  analyzeButton: {
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  uploadButton: {
    padding: 16,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
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
  bottomSheetContent: {
    flex: 1,
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
  },

  closeButton: {
    padding: 4,
  },
  suggestionContainer: {
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    marginBottom: 16,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  copyIcon: {
    padding: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#fff",
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },

  suggestionActions: {
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingTop: 12,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-end",
  },
  copyText: {
    color: "#666",
    fontSize: 14,
    fontWeight: "500",
  },
  noSuggestionsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  heroTitle: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#1F2937",
    textAlign: "center",
    marginBottom: 8,
  },
  heroSubtitle: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#6B7280",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  addInfoButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 8,
    margin: 15,
  },
  addInfoButtonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
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
    color: "#374151",
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
    fontWeight: "600",
    padding: 4,
  },
  switchLabelContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  analyzeAllowance: {
    backgroundColor: "#000",
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: "center",
  },
  analyzeAllowanceText: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
});
