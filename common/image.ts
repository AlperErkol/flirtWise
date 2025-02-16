import * as ImagePicker from "expo-image-picker";

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
    return imageUri;
  }
};

export default pickImage;
