import React, { useState, useRef, useMemo } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  Clipboard,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useProfileStore from "../../store/profileStore";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { generatePhotoOpeners } from "@/utils/photoOpeners";
import Theme from "@/constants/Theme";
import { usePremiumStore } from "@/store/usePremiumStore";
import { usePaywall } from "@/hooks/usePaywall";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";

export default function PhotoOpenersScreen() {
  const { showPaywall } = usePaywall();
  const { isPremium, incrementPhotoCount } = usePremiumStore();
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [showResults, setShowResults] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleImageProcessing = async (imageUri: string) => {
    if (!isPremium) {
      const canAnalyzePhoto = await incrementPhotoCount();
      console.log("canAnalyzePhoto", canAnalyzePhoto);
      if (!canAnalyzePhoto) {
        Alert.alert(
          "Photo Analysis Limit Reached",
          "You've reached your free photo analysis limit. Upgrade to Premium+ for unlimited photo analyses!",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Upgrade to Premium+",
              onPress: async () => {
                const purchased = await showPaywall();
                if (purchased) {
                  handleImageProcessing(imageUri);
                }
              },
            },
          ]
        );
        setSelectedImage(null);
        return;
      }
    }

    setLoading(true);
    setSuggestions([]);

    try {
      const cloudinaryImage: any = await uploadImageToCloudinary(imageUri);
      const imageUrl = cloudinaryImage.secure_url;
      const newSuggestions = await generatePhotoOpeners(imageUrl, userProfile);
      setSuggestions(newSuggestions);
      bottomSheetRef.current?.expand();
    } catch (error) {
      setSuggestions(["An error occurred, please try again."] as any);
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
      setShowResults(false);
    }
  };

  const startAnalysis = async () => {
    setLoading(true);
    await handleImageProcessing(selectedImage as any);
    bottomSheetRef.current?.snapToIndex(0);
  };

  const copyToClipboard = async (text: string) => {
    await Clipboard.setString(text);
    Alert.alert("Success", "Tip copied to clipboard!");
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
                  <Image
                    source={require("../../assets/images/photo-based.png")}
                    style={styles.heroImage}
                  />
                </View>
                <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
                  <Text style={styles.pickText}>Pick a Photo</Text>
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
                    onPress={startAnalysis}
                  >
                    <Text style={styles.buttonText}>Generate Openers ⚡️</Text>
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
          <Text style={styles.loadingText}>Analyzing photo...</Text>
        </View>
      )}

      <BottomSheet
        ref={bottomSheetRef}
        index={-1}
        snapPoints={["60%"]}
        backgroundStyle={styles.bottomSheetBackground}
        handleIndicatorStyle={styles.bottomSheetIndicator}
        backdropComponent={renderBackdrop}
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

          {suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestionContainer}>
              <Text style={styles.suggestionText}>{suggestion}</Text>
              <TouchableOpacity
                style={styles.copyIcon}
                onPress={() => Clipboard.setString(suggestion)}
              >
                <Ionicons name="copy-outline" size={24} color="#666" />
              </TouchableOpacity>
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
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    color: "#333",
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
    flexDirection: "row",
    alignItems: "center",
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
    fontSize: 16,
    fontWeight: "600",
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
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  copyIcon: {
    padding: 4,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
});
