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
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useProfileStore from "../../store/profileStore";
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

export default function ChatEnhancerScreen() {
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  useEffect(() => {
    if (suggestions.length > 0) {
      bottomSheetRef.current?.expand();
    }
  }, [suggestions]);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert("Gallery access permission denied!");
      return;
    }
    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!pickerResult.canceled) {
      const imageUri = pickerResult.assets[0].uri;
      setSelectedImage(imageUri as any);
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
        additionalInfo
      );
      setSuggestions(newSuggestions);
      bottomSheetRef.current?.expand();
    } catch (error) {
      setSuggestions([
        "An error occurred while enhancing the chat. Please try again.",
      ] as any);
    } finally {
      setLoading(false);
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
                    source={require("../../assets/images/chat-enhancer.png")}
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
                <TextInput
                  style={styles.input}
                  placeholder="Add more details about the person or context..."
                  placeholderTextColor="#9CA3AF"
                  value={additionalInfo}
                  onChangeText={setAdditionalInfo}
                  multiline
                />
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
                    <Ionicons name="camera-outline" size={24} color="#fff" />
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
    fontSize: 20,
    fontFamily: "Inter_700Bold",
    color: "#1F2937",
    textAlign: "center",
    lineHeight: 28,
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
    fontWeight: "bold",
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
  generateText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: "70%",
    borderRadius: 10,
    resizeMode: "cover",
    marginVertical: 10,
  },
  suggestionText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#333",
    padding: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    gap: 12,
  },
  analyzeButton: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  uploadButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: "#000000",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  suggestionActions: {
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    padding: 12,
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
});
