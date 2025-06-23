import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import { router } from "expo-router";

export function DiagonalSecondaryFeatures({
  leftFeature,
  rightFeature,
}: {
  leftFeature: any;
  rightFeature: any;
}) {
  const { t } = useTranslation();

  const handleFeaturePress = async (feature: any) => {
    router.push(`/features/${feature.screen}` as any);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.leftSide}
        onPress={() => handleFeaturePress(leftFeature)}
      >
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>{t("new")}</Text>
        </View>
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{leftFeature.emoji}</Text>
        </View>
        <Text style={styles.leftTitle}>{t(leftFeature.title)}</Text>
        <Text style={styles.leftDesc}>{t(leftFeature.description)}</Text>
        <View style={styles.leftButton}>
          <Text style={styles.leftButtonText}>{t("getStarted")}</Text>
          <Ionicons name="caret-forward-outline" size={16} color="#FFF" />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.rightSide}
        onPress={() => handleFeaturePress(rightFeature)}
      >
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>{rightFeature.emoji}</Text>
        </View>
        <Text style={styles.rightTitle}>{t(rightFeature.title)}</Text>
        <Text style={styles.rightDesc}>{t(rightFeature.description)}</Text>
        <View style={styles.rightButton}>
          <Text style={styles.rightButtonText}>{t("getStarted")}</Text>
          <Ionicons name="caret-forward-outline" size={16} color="#FF6347" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    flexDirection: "row",
    minHeight: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 8,
    overflow: "hidden",
  },
  leftSide: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FF6347",
    justifyContent: "space-between",
    position: "relative",
  },
  rightSide: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
    justifyContent: "space-between",
  },
  separator: {
    width: 2,
    backgroundColor: "#E0E0E0",
    marginVertical: 20,
  },
  newBadge: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#FFD700",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  newBadgeText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#FF6347",
    letterSpacing: 0.5,
  },
  emojiContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#1c1c1c",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFF",
    marginBottom: 12,
  },
  emoji: {
    fontSize: 20,
  },
  leftTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#FFF",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  leftDesc: {
    fontSize: 13,
    color: "#FFF",
    opacity: 0.9,
    lineHeight: 18,
    marginBottom: 12,
  },
  rightTitle: {
    fontSize: 18,
    fontFamily: "Inter_600SemiBold",
    color: "#000",
    letterSpacing: -0.5,
    marginBottom: 8,
  },
  rightDesc: {
    fontSize: 13,
    color: "#666",
    lineHeight: 18,
    marginBottom: 12,
  },
  leftButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  leftButtonText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#FFF",
    letterSpacing: -0.3,
  },
  rightButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    backgroundColor: "transparent",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#FF6347",
  },
  rightButtonText: {
    fontSize: 13,
    fontFamily: "Inter_500Medium",
    color: "#FF6347",
    letterSpacing: -0.3,
  },
});
