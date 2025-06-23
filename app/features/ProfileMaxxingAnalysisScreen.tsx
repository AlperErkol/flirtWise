import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import Header from "@/components/Header";
import { Ionicons } from "@expo/vector-icons";
import pickImage from "@/common/image";
import { LoadingOverlay } from "@/components/LoadingOverlay";
import { Button } from "@rneui/themed";
import globalStyles from "@/constants/style";
import { useTranslation } from "@/hooks/useTranslation";
import { runProfileMaxxing } from "@/services/profile-maxxing";
import { ManualData } from "@/constants/types";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import { useRevenueCat } from "@/hooks/useRevenueCat";
import { usePaywall } from "@/hooks/usePaywall";

export default function ProfileMaxxingAnalysisScreen() {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [noPhotos, setNoPhotos] = useState(false);
  const { isProMember, isLoading } = useRevenueCat();
  const { showPaywall } = usePaywall();
  const [manualData, setManualData] = useState<ManualData>({
    targetApp: "",
    bio: "",
    profilePhotos: [] as string[],
    age: "",
    gender: "",
    targetGender: "",
    lookingFor: "",
  });

  const targetApps = [
    { label: "Instagram", value: "instagram" },
    { label: "Tinder", value: "tinder" },
    { label: "Bumble", value: "bumble" },
    { label: "Hinge", value: "hinge" },
  ];

  const genderOptions = [
    { label: t("female"), value: "female" },
    { label: t("male"), value: "male" },
    { label: t("preferNotToSay"), value: "other" },
  ];

  const targetGenderOptions = [
    { label: t("women"), value: "women" },
    { label: t("men"), value: "men" },
    { label: t("both"), value: "both" },
  ];

  const lookingForOptions = [
    { label: t("seriousRelationship"), value: "serious" },
    { label: t("friendship"), value: "friendship" },
    { label: t("casualDating"), value: "casual" },
  ];

  const pickProfileImageHandler = async () => {
    if (manualData.profilePhotos.length >= 4) {
      Alert.alert(t("error"), t("maxPhotosReached"));
      return;
    }

    const imageUri = await pickImage();
    if (imageUri) {
      setManualData((prev) => ({
        ...prev,
        profilePhotos: [...prev.profilePhotos, imageUri],
      }));
    }
  };

  const removeProfileImage = (index: number) => {
    setManualData((prev) => ({
      ...prev,
      profilePhotos: prev.profilePhotos.filter((_, i) => i !== index),
    }));
  };

  const startAnalysis = async () => {
    if (!isLoading && !isProMember) {
      await showPaywall();
      return;
    }

    setLoading(true);
    const requiredFields = [
      "targetApp",
      "bio",
      "age",
      "gender",
      "targetGender",
      "lookingFor",
    ];
    const missingFields = requiredFields.filter((field) => {
      return !manualData[field as keyof typeof manualData];
    });

    if (
      missingFields.length > 0 ||
      (!noPhotos && manualData.profilePhotos.length === 0)
    ) {
      Alert.alert(t("error"), t("pleaseFillRequiredFields"));
      setLoading(false);
      return;
    }

    if (manualData.bio.length > 100) {
      Alert.alert(t("error"), t("bioTooLong"));
      setLoading(false);
      return;
    }

    try {
      const aiText = await runProfileMaxxing(manualData);
      setLoading(false);
      router.push({
        pathname: "/features/ProfileMaxxingResultScreen",
        params: {
          aiText,
        },
      } as any);
    } catch (error) {
      setLoading(false);
      Alert.alert(t("error"), t("analysisFailed"));
    }
  };

  const validateFirstStep = () => {
    const requiredFields = [
      "targetApp",
      "bio",
      "age",
      "gender",
      "targetGender",
      "lookingFor",
    ];

    const missingFields = requiredFields.filter((field) => {
      return !manualData[field as keyof typeof manualData];
    });

    if (missingFields.length > 0) {
      Alert.alert(t("error"), t("pleaseFillRequiredFields"));
      return false;
    }

    if (manualData.bio.length > 100) {
      Alert.alert(t("error"), t("bioTooLong"));
      return false;
    }

    return true;
  };

  const goToNextStep = () => {
    if (validateFirstStep()) {
      setCurrentStep(2);
    }
  };

  const goToPreviousStep = () => {
    setCurrentStep(1);
  };

  const finalizeAnalysis = () => {
    if (!noPhotos && manualData.profilePhotos.length === 0) {
      Alert.alert(
        t("error"),
        "Lütfen en az bir profil fotoğrafı ekleyin veya fotoğraf olmadığını belirtin"
      );
      return;
    }

    if (noPhotos) {
      setManualData((prev) => ({
        ...prev,
        profilePhotos: [],
      }));
    }

    startAnalysis();
  };

  const showGenderPicker = () => {
    const options = genderOptions.map((option) => option.label);

    Alert.alert(t("selectGender"), t("chooseYourGender"), [
      ...options.map((option) => ({
        text: option,
        onPress: () => {
          const selectedOption = genderOptions.find(
            (opt) => opt.label === option
          );
          if (selectedOption) {
            setManualData((prev) => ({
              ...prev,
              gender: selectedOption.value,
            }));
          }
        },
      })),
      {
        text: t("cancel"),
        style: "cancel",
      },
    ]);
  };

  const showTargetGenderPicker = () => {
    const options = targetGenderOptions.map((option) => option.label);

    Alert.alert(t("selectTargetGender"), t("chooseTargetGender"), [
      ...options.map((option) => ({
        text: option,
        onPress: () => {
          const selectedOption = targetGenderOptions.find(
            (opt) => opt.label === option
          );
          if (selectedOption) {
            setManualData((prev) => ({
              ...prev,
              targetGender: selectedOption.value,
            }));
          }
        },
      })),
      {
        text: t("cancel"),
        style: "cancel",
      },
    ]);
  };

  const showLookingForPicker = () => {
    const options = lookingForOptions.map((option) => option.label);

    Alert.alert(t("selectLookingFor"), t("chooseLookingFor"), [
      ...options.map((option) => ({
        text: option,
        onPress: () => {
          const selectedOption = lookingForOptions.find(
            (opt) => opt.label === option
          );
          if (selectedOption) {
            setManualData((prev) => ({
              ...prev,
              lookingFor: selectedOption.value,
            }));
          }
        },
      })),
      {
        text: t("cancel"),
        style: "cancel",
      },
    ]);
  };

  const showManualAppPicker = () => {
    const options = targetApps.map((app) => app.label);

    Alert.alert(t("selectApp"), t("chooseTargetApp"), [
      ...options.map((option) => ({
        text: option,
        onPress: () => {
          const selectedApp = targetApps.find((app) => app.label === option);
          if (selectedApp) {
            setManualData((prev) => ({
              ...prev,
              targetApp: selectedApp.value,
            }));
          }
        },
      })),
      {
        text: t("cancel"),
        style: "cancel",
      },
    ]);
  };

  const getGenderLabel = (value: string) => {
    const option = genderOptions.find((opt) => opt.value === value);
    return option && option.label;
  };

  const getTargetGenderLabel = (value: string) => {
    const option = targetGenderOptions.find((opt) => opt.value === value);
    return option && option.label;
  };

  const getLookingForLabel = (value: string) => {
    const option = lookingForOptions.find((opt) => opt.value === value);
    return option && option.label;
  };

  const getManualAppLabel = (value: string) => {
    const app = targetApps.find((app) => app.value === value);
    return app ? app.label : t("selectApp");
  };

  return (
    <GlobalSafeAreaView>
      <Header logo={true} showBackButton={true} />
      <View style={styles.paginationContainer}>
        <View
          style={[
            styles.dot,
            currentStep === 1
              ? styles.activeDot
              : currentStep === 2
              ? styles.completedDot
              : styles.inactiveDot,
          ]}
        />
        <View
          style={[
            styles.dot,
            currentStep === 2 ? styles.activeDot : styles.inactiveDot,
          ]}
        />
      </View>
      {currentStep === 2 ? (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>{t("profilePhotos")}</Text>
            <Text style={styles.subInstructionText}>
              {t("profilePhotosSubtitle")}
            </Text>
          </View>

          <View style={styles.noPhotosContainer}>
            <Text style={styles.noPhotosText}>{t("noPhotos")}</Text>
            <Switch
              value={noPhotos}
              onValueChange={(value) => {
                setNoPhotos(value);
                if (value) {
                  setManualData((prev) => ({
                    ...prev,
                    profilePhotos: [],
                  }));
                }
              }}
              trackColor={{ false: "#d3d3d3", true: "#4F46E5" }}
              thumbColor="#fff"
            />
          </View>

          <View
            style={[styles.photoGrid, noPhotos && styles.disabledPhotoGrid]}
          >
            {Array.from({ length: 4 }).map((_, index) => (
              <TouchableOpacity
                key={index}
                style={styles.photoSlot}
                onPress={
                  index < manualData.profilePhotos.length
                    ? () => removeProfileImage(index)
                    : pickProfileImageHandler
                }
                disabled={index > manualData.profilePhotos.length || noPhotos}
              >
                {manualData.profilePhotos[index] ? (
                  <>
                    <Image
                      source={{
                        uri: manualData.profilePhotos[index],
                      }}
                      style={styles.selectedPhoto}
                    />
                    <TouchableOpacity
                      style={styles.removeButton}
                      onPress={() => removeProfileImage(index)}
                      disabled={noPhotos}
                    >
                      <Ionicons name="close-circle" size={24} color="#FF4444" />
                    </TouchableOpacity>
                  </>
                ) : index === manualData.profilePhotos.length ? (
                  <View
                    style={[
                      styles.addPhotoContainer,
                      noPhotos && styles.disabledAddPhoto,
                    ]}
                  >
                    <Ionicons
                      name="camera"
                      size={32}
                      color={noPhotos ? "#CCC" : "#666"}
                    />
                    <Text
                      style={[
                        styles.addPhotoText,
                        noPhotos && styles.disabledText,
                      ]}
                    >
                      {t("addPhoto")}
                    </Text>
                  </View>
                ) : (
                  <View style={styles.emptySlot}>
                    <Ionicons name="image-outline" size={24} color="#CCC" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.wizardButtonContainer}>
            <TouchableOpacity
              style={styles.circularBackButton}
              onPress={goToPreviousStep}
            >
              <Ionicons name="chevron-back" size={24} color="#000" />
            </TouchableOpacity>
            <Button
              title={t("startAnalysis")}
              buttonStyle={[
                globalStyles.button,
                globalStyles.primaryButton,
                styles.expandedButton,
              ]}
              titleStyle={globalStyles.buttonText}
              onPress={finalizeAnalysis}
            />
          </View>
        </ScrollView>
      ) : (
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.instructionContainer}>
            <Text style={styles.instructionText}>
              {t("generalInformation")}
            </Text>
            <Text style={styles.subInstructionText}>
              {t("generalInformationSubtitle")}
            </Text>
            <View style={styles.requiredInfoContainer}>
              <Text style={styles.requiredInfoText}>
                <Text style={styles.requiredDotExample}>•</Text>{" "}
                {t("requiredFieldsInfo")}
              </Text>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Text style={styles.inputLabel}>{t("targetApp")}</Text>
                <Text style={styles.requiredDot}>•</Text>
              </View>
              <TouchableOpacity
                style={styles.selectorButton}
                onPress={showManualAppPicker}
              >
                <Text
                  style={[
                    styles.selectorText,
                    !manualData.targetApp && styles.placeholderText,
                  ]}
                >
                  {getManualAppLabel(manualData.targetApp)}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#666" />
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelContainer}>
                <Text style={styles.inputLabel}>
                  {t("bio")} ({manualData.bio.length}/100)
                </Text>
                <Text style={styles.requiredDot}>•</Text>
              </View>
              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder={t("enterBio")}
                placeholderTextColor="#666"
                value={manualData.bio}
                onChangeText={(text) => {
                  if (text.length <= 100) {
                    setManualData((prev) => ({ ...prev, bio: text }));
                  }
                }}
                multiline
                numberOfLines={3}
                maxLength={100}
              />
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.halfInputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.inputLabel}>{t("age")}</Text>
                  <Text style={styles.requiredDot}>•</Text>
                </View>
                <TextInput
                  style={styles.textInput}
                  placeholder={t("enterAge")}
                  placeholderTextColor="#666"
                  value={manualData.age}
                  onChangeText={(text) =>
                    setManualData((prev) => ({ ...prev, age: text }))
                  }
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.halfInputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.inputLabel}>{t("gender")}</Text>
                  <Text style={styles.requiredDot}>•</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectorButton}
                  onPress={showGenderPicker}
                >
                  <Text
                    style={[
                      styles.selectorText,
                      !manualData.gender && styles.placeholderText,
                    ]}
                  >
                    {getGenderLabel(manualData.gender)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.halfInputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.inputLabel}>{t("targetGender")}</Text>
                  <Text style={styles.requiredDot}>•</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectorButton}
                  onPress={showTargetGenderPicker}
                >
                  <Text
                    style={[
                      styles.selectorText,
                      !manualData.targetGender && styles.placeholderText,
                    ]}
                  >
                    {getTargetGenderLabel(manualData.targetGender)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
              </View>

              <View style={styles.halfInputGroup}>
                <View style={styles.labelContainer}>
                  <Text style={styles.inputLabel}>{t("lookingFor")}</Text>
                  <Text style={styles.requiredDot}>•</Text>
                </View>
                <TouchableOpacity
                  style={styles.selectorButton}
                  onPress={showLookingForPicker}
                >
                  <Text
                    style={[
                      styles.selectorText,
                      !manualData.lookingFor && styles.placeholderText,
                    ]}
                  >
                    {getLookingForLabel(manualData.lookingFor)}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Button
              title={t("next")}
              buttonStyle={[globalStyles.button, globalStyles.primaryButton]}
              titleStyle={globalStyles.buttonText}
              onPress={goToNextStep}
            />
          </View>
        </ScrollView>
      )}
      {loading && <LoadingOverlay type="profileMaxxing" />}
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
    width: "100%",
  },
  dot: {
    height: 3,
    marginHorizontal: 2,
    flex: 1,
  },
  activeDot: {
    backgroundColor: "#4F46E5",
  },
  completedDot: {
    backgroundColor: "#4F46E5",
  },
  inactiveDot: {
    backgroundColor: "#d3d3d3",
  },
  instructionContainer: {
    paddingVertical: 12,
  },
  instructionText: {
    fontSize: 24,
    fontFamily: "Inter_700Bold",
    color: "#000",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  subInstructionText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#666",
    letterSpacing: -0.3,
  },
  requiredInfoContainer: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#F8F9FA",
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: "#FF4444",
  },
  requiredInfoText: {
    fontSize: 14,
    fontFamily: "Inter_400Regular",
    color: "#666",
    letterSpacing: -0.2,
  },
  requiredDotExample: {
    fontSize: 16,
    color: "#FF4444",
  },
  photoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 8,
  },
  photoSlot: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
    overflow: "hidden",
    position: "relative",
  },
  smallPhotoSlot: {
    width: "30%",
    aspectRatio: 1,
    marginBottom: 8,
    borderRadius: 8,
    overflow: "hidden",
    position: "relative",
  },
  selectedPhoto: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  removeButton: {
    position: "absolute",
    top: 4,
    right: 4,
    backgroundColor: "white",
    borderRadius: 12,
  },
  addPhotoContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#E0E0E0",
    borderStyle: "dashed",
  },
  addPhotoText: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    color: "#666",
    letterSpacing: -0.2,
  },
  smallAddPhotoText: {
    marginTop: 4,
    fontSize: 10,
    fontFamily: "Inter_500Medium",
    color: "#666",
    textAlign: "center",
    letterSpacing: -0.1,
  },
  emptySlot: {
    flex: 1,
    backgroundColor: "#FAFAFA",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
    letterSpacing: -0.3,
  },
  requiredDot: {
    fontSize: 18,
    color: "#FF4444",
    marginLeft: 4,
    lineHeight: 16,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    backgroundColor: "#FAFAFA",
    letterSpacing: -0.1,
    color: "#000",
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    overflow: "hidden",
  },
  picker: {
    height: 50,
    fontSize: 16,
  },
  buttonContainer: {
    paddingBottom: 24,
  },
  wizardButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 24,
    gap: 12,
  },
  secondaryButton: {
    backgroundColor: "#E0E0E0",
    flex: 1,
  },
  secondaryButtonText: {
    color: "#000",
  },
  selectorButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    padding: 16,
    backgroundColor: "#FAFAFA",
  },
  selectorText: {
    fontSize: 16,
    fontFamily: "Inter_400Regular",
    color: "#000",
    letterSpacing: -0.2,
  },
  placeholderText: {
    color: "#666",
  },
  formContainer: {},
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
    marginBottom: 20,
  },
  halfInputGroup: {
    width: "48%",
  },
  circularBackButton: {
    backgroundColor: "#E0E0E0",
    borderRadius: 24,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  expandedButton: {
    flex: 1,
  },
  noPhotosContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    marginBottom: 20,
  },
  noPhotosText: {
    fontSize: 16,
    fontFamily: "Inter_500Medium",
    color: "#000",
    letterSpacing: -0.3,
  },
  disabledPhotoGrid: {
    opacity: 0.5,
  },
  disabledAddPhoto: {
    borderColor: "#CCC",
  },
  disabledText: {
    color: "#CCC",
  },
});
