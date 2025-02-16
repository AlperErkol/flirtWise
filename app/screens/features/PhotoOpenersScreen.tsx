import React, { useState, useRef, useMemo, useEffect } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import useProfileStore from "../../../store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import Theme from "@/constants/Theme";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { useRateUs } from "@/hooks/useRateUs";
import CustomBottomSheetView from "@/components/CustomBottomSheetView";
import pickImage from "@/common/image";
import AdditionalInfoModal from "@/components/AdditionalInfoModal";
import handleImageProcessing from "@/common/photo";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function PhotoOpenersScreen({ navigation, route }: any) {
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const bottomSheetRef = useRef<BottomSheet>(null);
  const { checkAndShowRateUs } = useRateUs();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [conversationStyle, setConversationStyle] = useState("");

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
    setLoading(true);
    setSuggestions([]);
    const suggestions = await handleImageProcessing(
      selectedImage as any,
      userProfile,
      "photo_openers",
      additionalInfo,
      conversationStyle
    );
    setSuggestions(suggestions);
    setLoading(false);
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

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
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
            <TouchableOpacity
              style={styles.pickButton}
              onPress={pickImageHandler}
            >
              <Text style={styles.pickText}>Upload an Image</Text>
            </TouchableOpacity>
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
                {(additionalInfo.trim().length > 0 ||
                  conversationStyle.trim().length > 0) && (
                  <Ionicons name="checkmark-circle" size={24} color="#4F46E5" />
                )}
              </View>
              <View style={styles.addInfoContainer}>
                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => setIsModalVisible(true)}
                >
                  {additionalInfo.trim().length > 0 ||
                  conversationStyle.trim().length > 0 ? (
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
                onPress={pickImageHandler}
              >
                <Text style={styles.uploadButtonText}>Upload a New Image</Text>
              </TouchableOpacity>
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
          title="Suggested Openers"
          suggestions={suggestions}
          bottomSheetRef={bottomSheetRef}
        />
      </BottomSheet>
      <AdditionalInfoModal
        visible={isModalVisible}
        onClose={onModalClose}
        additionalInfo={additionalInfo}
        onChangeText={setAdditionalInfo}
        conversationStyle={conversationStyle}
        setConversationStyle={setConversationStyle}
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
  uploadButtonText: {
    color: "#FF6347",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    letterSpacing: -0.5,
  },
});
