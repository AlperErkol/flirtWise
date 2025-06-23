import React from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import { useTranslation } from "@/hooks/useTranslation";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { ProfileMaxxingResult } from "@/constants/types";
import Header from "@/components/Header";
import { useLocalSearchParams } from "expo-router";
import { router } from "expo-router";

export default function ProfileMaxxingResultScreen() {
  const { t } = useTranslation();
  const { aiText } = useLocalSearchParams();
  const result: ProfileMaxxingResult = JSON.parse(aiText as string);

  const handleClosePress = () => {
    router.push("/");
  };
  if (!result) {
    return (
      <GlobalSafeAreaView>
        <View style={styles.container}>
          <Text>Sonuç bulunamadı</Text>
        </View>
      </GlobalSafeAreaView>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "#28a745"; // Yeşil
    if (score >= 60) return "#ffc107"; // Sarı
    if (score >= 40) return "#fd7e14"; // Turuncu
    return "#dc3545"; // Kırmızı
  };

  const renderScoreIndicator = (score: number) => {
    const filledBoxes = Math.ceil((score / 10) * 4);
    const boxes = [];

    for (let i = 0; i < 4; i++) {
      boxes.push(
        <View
          key={i}
          style={[
            styles.scoreBox,
            {
              backgroundColor:
                i < filledBoxes ? getScoreColor(score * 10) : "#e9ecef",
            },
          ]}
        />
      );
    }

    return <View style={styles.scoreIndicatorContainer}>{boxes}</View>;
  };

  const renderScoreSection = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        📊 {t("profileMaxxingOverallScore")}
      </Text>
      <View style={styles.scoreContainer}>
        <Text
          style={[
            styles.scoreText,
            { color: getScoreColor(result.overallScore) },
          ]}
        >
          {result.overallScore}
        </Text>
        <Text style={styles.scoreLabel}>/ 100</Text>
      </View>
      <View style={styles.scoreBreakdown}>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreItemLabel}>
            {t("profileMaxxingFirstImpression")}
          </Text>
          <View style={styles.scoreItemValueContainer}>
            <Text style={styles.scoreItemValue}>
              {result.detailedScores.firstImpression}
            </Text>
            {renderScoreIndicator(result.detailedScores.firstImpression)}
          </View>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreItemLabel}>
            {t("profileMaxxingAuthenticity")}
          </Text>
          <View style={styles.scoreItemValueContainer}>
            <Text style={styles.scoreItemValue}>
              {result.detailedScores.authenticity}
            </Text>
            {renderScoreIndicator(result.detailedScores.authenticity)}
          </View>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreItemLabel}>{t("profileMaxxingHumor")}</Text>
          <View style={styles.scoreItemValueContainer}>
            <Text style={styles.scoreItemValue}>
              {result.detailedScores.humor}
            </Text>
            {renderScoreIndicator(result.detailedScores.humor)}
          </View>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.scoreItemLabel}>
            {t("profileMaxxingClarity")}
          </Text>
          <View style={styles.scoreItemValueContainer}>
            <Text style={styles.scoreItemValue}>
              {result.detailedScores.clarity}
            </Text>
            {renderScoreIndicator(result.detailedScores.clarity)}
          </View>
        </View>
      </View>
    </View>
  );

  const renderStyleVibeSection = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>✨ {t("profileMaxxingStyleVibe")}</Text>
      <Text style={styles.summaryText}>{result.styleVibe?.summary}</Text>
      <View style={styles.keywordsContainer}>
        {result.styleVibe.keywords.map((keyword, index) => (
          <View key={index} style={styles.keywordChip}>
            <Text style={styles.keywordText}>{keyword}</Text>
          </View>
        ))}
      </View>
      <View style={styles.improvementsContainer}>
        {result.styleVibe.improvements.map((improvement, index) => (
          <View key={index} style={styles.improvementItem}>
            <Text style={styles.improvementText}>✅ {improvement}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderPhotoAnalysis = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        📸 {t("profileMaxxingPhotoAnalysis")}
      </Text>
      {result.photoAnalysis.map((analysis, index) => (
        <View key={index} style={styles.photoAnalysisItem}>
          <View style={styles.photoAnalysisHeader}>
            <Text style={styles.photoNumber}>Fotoğraf {analysis.idx}</Text>
            <Text
              style={[
                styles.photoScore,
                { color: getScoreColor(analysis.score * 10) },
              ]}
            >
              {analysis.score}/10
            </Text>
          </View>
          <Text style={styles.strengthText}>{analysis.strength}</Text>
          <Text style={styles.fixText}>✅ {analysis.fix}</Text>
        </View>
      ))}
    </View>
  );

  const renderBioAnalysis = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        📝 {t("profileMaxxingBioAnalysis")}
      </Text>
      <View style={styles.bioStrengths}>
        <Text style={styles.subSectionTitle}>
          💪 {t("profileMaxxingStrengths")}
        </Text>
        {result.bioAnalysis.strengths.map((strength, index) => (
          <Text key={index} style={styles.bioText}>
            • {strength}
          </Text>
        ))}
      </View>
      <View style={styles.bioWeaknesses}>
        <Text style={styles.subSectionTitle}>
          ⚠️ {t("profileMaxxingWeaknesses")}
        </Text>
        {result.bioAnalysis.weaknesses.map((weakness, index) => (
          <Text key={index} style={styles.bioText}>
            • {weakness}
          </Text>
        ))}
      </View>
      <View style={styles.rewriteSuggestion}>
        <Text style={styles.subSectionTitle}>
          {t("profileMaxxingRewriteSuggestion")}
        </Text>
        <Text style={styles.suggestionText}>
          ✅ {result.bioAnalysis.rewriteSuggestion}
        </Text>
      </View>
    </View>
  );

  const renderActionChecklist = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        📋 {t("profileMaxxingActionChecklist")}
      </Text>
      {result.actionChecklist.map((item, index) => (
        <View key={index} style={styles.checklistItem}>
          <Text style={styles.taskText}>✅ {item.task}</Text>
          <View style={styles.taskDetails}>
            <Text style={styles.impactText}>
              {t("profileMaxxingImpact")}: {item.impact}
            </Text>
            <Text style={styles.effortText}>
              {t("profileMaxxingEffort")}: {item.effort}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderExpertNotes = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        🎯 {t("profileMaxxingExpertNotes")}
      </Text>
      <Text style={styles.expertNotesText}>{result.expertNotes}</Text>
    </View>
  );

  const renderPsychologyInsight = () => (
    <View style={styles.card}>
      <Text style={styles.sectionTitle}>
        🧠 {t("profileMaxxingPsychologyInsight")}
      </Text>
      <Text style={styles.psychologyText}>{result.psychologyInsight}</Text>
    </View>
  );

  return (
    <GlobalSafeAreaView>
      <Header
        logo
        showBackButton
        showCloseButton
        onClosePress={handleClosePress}
      />
      <ScrollView style={styles.container}>
        {renderScoreSection()}
        {renderStyleVibeSection()}
        {renderPhotoAnalysis()}
        {renderBioAnalysis()}
        {renderActionChecklist()}
        {renderExpertNotes()}
        {renderPsychologyInsight()}
      </ScrollView>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333",
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  scoreContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 48,
    fontWeight: "bold",
  },
  scoreLabel: {
    fontSize: 24,
    marginLeft: 8,
    color: "#666",
  },
  scoreBreakdown: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  scoreItem: {
    width: "48%",
    marginBottom: 16,
  },
  scoreItemLabel: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  scoreItemValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  scoreItemValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  scoreIndicatorContainer: {
    flexDirection: "row",
    gap: 2,
  },
  scoreBox: {
    width: 8,
    height: 8,
    borderRadius: 2,
  },
  summaryText: {
    fontSize: 16,
    marginBottom: 16,
    color: "#333",
    lineHeight: 22,
  },
  keywordsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 16,
  },
  keywordChip: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  keywordText: {
    fontSize: 14,
    color: "#ffffff",
    fontWeight: "500",
  },
  improvementsContainer: {
    marginTop: 8,
  },
  improvementItem: {
    marginBottom: 8,
  },
  improvementText: {
    fontSize: 14,
    color: "#333",
    lineHeight: 20,
  },
  photoAnalysisItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4a90e2",
  },
  photoAnalysisHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  photoNumber: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  photoScore: {
    fontSize: 16,
    fontWeight: "600",
  },
  strengthText: {
    fontSize: 14,
    marginBottom: 8,
    color: "#333",
    lineHeight: 20,
  },
  fixText: {
    fontSize: 14,
    color: "#28a745",
    lineHeight: 20,
  },
  bioStrengths: {
    marginBottom: 16,
  },
  bioWeaknesses: {
    marginBottom: 16,
  },
  bioText: {
    fontSize: 14,
    marginBottom: 4,
    color: "#333",
    lineHeight: 20,
  },
  rewriteSuggestion: {
    marginTop: 16,
    padding: 12,
    backgroundColor: "#e8f5e8",
    borderRadius: 8,
  },
  suggestionText: {
    fontSize: 14,
    fontStyle: "italic",
    color: "#28a745",
    lineHeight: 20,
  },
  checklistItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: "#e8f5e8",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#28a745",
  },
  taskText: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#28a745",
    lineHeight: 22,
  },
  taskDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  impactText: {
    fontSize: 14,
    color: "#666",
  },
  effortText: {
    fontSize: 14,
    color: "#666",
  },
  expertNotesText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
  psychologyText: {
    fontSize: 14,
    lineHeight: 22,
    color: "#333",
  },
});
