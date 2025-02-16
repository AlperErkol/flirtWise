import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { useTranslation } from "@/hooks/useTranslation";

type BottomSheetComponentProps = {
  title: string;
  suggestions: string[];
  bottomSheetRef: any;
};

const CustomBottomSheetView: React.FunctionComponent<
  BottomSheetComponentProps
> = ({ title, suggestions, bottomSheetRef }) => {
  const { t } = useTranslation();
  const handleCopy = async (suggestion: string) => {
    await Clipboard.setStringAsync(suggestion);
    Toast.show({
      text1: t("copiedToClipboard"),
      type: "success",
      position: "bottom",
      text1Style: {
        fontFamily: "Inter_500Medium",
        fontSize: 16,
        color: "#000",
        letterSpacing: -0.5,
      },
    });
  };

  return (
    <BottomSheetView style={styles.bottomSheetContent}>
      <View style={styles.bottomSheetHeader}>
        <View style={styles.titleContainer}>
          <Ionicons name="sparkles" size={24} color="#FFD700" />
          <Text style={styles.bottomSheetTitle}>{title}</Text>
        </View>
        <TouchableOpacity
          onPress={() => bottomSheetRef.current?.close()}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={32} color="#666" />
        </TouchableOpacity>
      </View>

      {suggestions.length > 0 ? (
        suggestions.map((suggestion, index) => (
          <View key={index} style={styles.suggestionContainer}>
            <Text style={styles.suggestionText}>{suggestion}</Text>
            <View style={styles.suggestionActions}>
              <TouchableOpacity
                style={styles.copyButton}
                onPress={() => handleCopy(suggestion)}
              >
                <Ionicons name="copy-outline" size={20} color="#000" />
                <Text style={styles.copyText}>{t("copy")}</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))
      ) : (
        <Text style={styles.noSuggestionsText}>
          {t("noSuggestionsAvailable")}
        </Text>
      )}
    </BottomSheetView>
  );
};

const styles = StyleSheet.create({
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
  suggestionActions: {
    borderTopWidth: 1,
    borderTopColor: "#e5e5e5",
    paddingTop: 12,
  },
  noSuggestionsText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 20,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    gap: 8,
  },
  copyText: {
    color: "#000",
    fontSize: 14,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
  suggestionText: {
    color: "#000",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 12,
    fontFamily: "Inter_500Medium",
    letterSpacing: -0.5,
  },
});

export default CustomBottomSheetView;
