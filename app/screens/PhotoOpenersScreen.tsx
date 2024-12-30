import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import useProfileStore from "../../store/profileStore";
import { LinearGradient } from "expo-linear-gradient";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { uploadImageToCloudinary } from "@/utils/cloudinary";
import { generatePhotoOpeners } from "@/utils/photoOpeners";
import Theme from "@/constants/Theme";
import { useRouter } from "expo-router";
import { usePremiumStore } from "@/store/usePremiumStore";

export default function PhotoOpenersScreen() {
  const userProfile = useProfileStore((state: any) => state.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { incrementPhotoCount } = usePremiumStore();

  const handleImageProcessing = async (imageUri: any) => {
    const canAnalyzePhoto = await incrementPhotoCount();
    if (!canAnalyzePhoto) {
      Alert.alert(
        "Daily Limit Reached",
        "You've reached your daily photo analysis limit. Upgrade to Premium+ for unlimited analysis!",
        [
          { text: "Cancel" },
          {
            text: "Upgrade to Premium+",
            onPress: () => router.push("/screens/FeedbackScreen"),
          },
        ]
      );
      return;
    }

    setLoading(true);
    setSuggestions([]);

    try {
      const cloudinaryImage: any = await uploadImageToCloudinary(imageUri);
      const imageUrl = cloudinaryImage.secure_url;
      const newSuggestions = await generatePhotoOpeners(imageUrl, userProfile);
      setSuggestions(newSuggestions);
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
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // Sadece fotoğraf seçimi
      allowsEditing: false, // Fotoğrafı kırpmayı devre dışı bırakır
      quality: 1, // En yüksek kaliteyi korur
    });
    if (!pickerResult.canceled) {
      const imageUri = pickerResult.assets[0].uri;
      setSelectedImage(imageUri as any);
      handleImageProcessing(imageUri);
    }
  };

  return (
    <LinearGradient
      colors={["#E6E6FA", "#E6E6FA"]}
      style={styles.gradientBackground}
    >
      <GlobalSafeAreaView>
        <Header logo={true} centered={true} showBackButton={true} />
        {!selectedImage && (
          <View style={styles.heroContainer}>
            <Image
              source={require("../../assets/images/photo-based.png")}
              style={styles.heroImage}
            />
          </View>
        )}
        {selectedImage && (
          <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
        )}

        {loading && <ActivityIndicator style={styles.indicator} size="small" />}

        <ScrollView style={{ marginTop: 20 }}>
          {suggestions.map((sugg, idx) => (
            <Text key={idx} style={styles.suggestionText}>
              {sugg}
            </Text>
          ))}
        </ScrollView>

        <TouchableOpacity style={styles.pickButton} onPress={pickImage}>
          <Text style={styles.pickText}>Pick a Photo</Text>
        </TouchableOpacity>
      </GlobalSafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradientBackground: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
  },
  heroContainer: {
    marginTop: 150,
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
    padding: 15,
    borderRadius: 10,
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    width: "90%",
  },
  pickText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  imagePreview: {
    width: "100%",
    height: 350,
    borderRadius: 10,
    resizeMode: "cover",
    marginVertical: 10,
  },
  suggestionText: {
    backgroundColor: "#f2f2f2",
    marginBottom: 6,
    padding: 10,
    borderRadius: 10,
    color: Theme.colors.text,
    borderColor: "#D6BDF7",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    fontFamily: "Inter_700Bold",
  },
  indicator: {
    marginTop: 10,
  },
});
