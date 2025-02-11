import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  KeyboardAvoidingView,
  Switch,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useProfileStore from "../../../store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { uploadImageToCloudinary } from "@/services/cloudinary";
import { enhanceChat } from "@/services/chat/enhancer";
import AdditionalInfoModal from "@/components/AdditionalInfoModal";
import { useRateUs } from "@/hooks/useRateUs";

export default function ChatEnhancerScreen() {
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isDeadConversation, setIsDeadConversation] = useState(false);
  const [hasAdditionalInfo, setHasAdditionalInfo] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { checkAndShowRateUs } = useRateUs();

  useEffect(() => {
    if (suggestions.length > 0) {
      bottomSheetRef.current?.expand();
    }
  }, [suggestions]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      allowsEditing: false,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri as any);
    }
  };

  const handleImageProcessing = async (imageUri: string) => {
    setLoading(true);
    setSuggestions([]);

    try {
      const cloudinaryImage: any = await uploadImageToCloudinary(imageUri);
      const imageUrl = cloudinaryImage.secure_url;
      const newSuggestions = await enhanceChat(
        imageUrl,
        userProfile,
        additionalInfo,
        isDeadConversation
      );

      setLoading(false);
      setSuggestions(newSuggestions);
    } catch (error) {
      setLoading(false);
      setSuggestions([
        "An error occurred while enhancing the chat. Please try again.",
      ] as any);
    }
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
                <View style={styles.heroContainer}>
                  <View style={styles.instructionContainer}>
                    <Text style={styles.instructionText}>
                      Upload a chat screenshot that you want to enhance
                    </Text>
                  </View>
                  <Image
                    source={require("@/assets/images/chat-enhancer.png")}
                    style={styles.heroImage}
                  />
                </View>

                <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                  <Text style={styles.pickText}>Upload a Screenshot</Text>
                </TouchableOpacity>
              </>
            ) : (
              <View>
                <Image
                  source={{ uri: selectedImage }}
                  style={styles.imagePreview}
                />
                <View style={styles.switchRow}>
                  <Text style={styles.switchLabel}>
                    Is this a stucked conversation?
                  </Text>
                  <Switch
                    value={isDeadConversation}
                    onValueChange={setIsDeadConversation}
                    trackColor={{ false: "#D1D5DB", true: "#4F46E5" }}
                    thumbColor={isDeadConversation ? "#FFFFFF" : "#FFFFFF"}
                  />
                </View>
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
                    onPress={() => handleImageProcessing(selectedImage)}
                  >
                    <Text style={styles.buttonText}>Enhance Chat ⚡️</Text>
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
                      Upload a Screenshot
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
          <Text style={styles.loadingText}>Analyzing chat...</Text>
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
              <Text style={styles.bottomSheetTitle}>Chat Suggestions</Text>
            </View>
            <TouchableOpacity
              onPress={() => bottomSheetRef.current?.close()}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

          {suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestionContainer}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
              <View style={styles.suggestionActions}>
                <TouchableOpacity
                  style={styles.copyButton}
                  onPress={() => Clipboard.setStringAsync(suggestion)}
                >
                  <Ionicons name="copy-outline" size={20} color="#666" />
                  <Text style={styles.copyText}>Copy</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
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

  generateButton: {
    backgroundColor: "#007aff",
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "90%",
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
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },

  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#fff",
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
    fontWeight: "700",
    color: "#333",
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
});
