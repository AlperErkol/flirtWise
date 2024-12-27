import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { RELATIONSHIP_GOAL_OPTIONS } from "@/constants/Options";
export default function Step2Screen({ navigation, route }: any) {
  const { gender, ageRange } = route.params;
  const [relationshipGoal, setRelationshipGoal] = useState(null);

  const handleNext = () => {
    if (!relationshipGoal) {
      alert("Lütfen bir ilişki amacı seçin.");
      return;
    }
    navigation.navigate("Step3", { gender, ageRange, relationshipGoal });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <GlobalSafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack}>
          <Octicons name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>

        <View style={styles.progressBar}>
          <Octicons
            name="dot-fill"
            size={24}
            color="#FF6347"
            style={styles.dot}
          />
          <Octicons
            name="dot-fill"
            size={24}
            color="#FF6347"
            style={styles.dot}
          />
          <Octicons name="dot" size={24} color="#CCC" style={styles.dot} />
        </View>
      </View>

      <Text style={styles.title}>Select Your Relationship Purpose</Text>

      {RELATIONSHIP_GOAL_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionButton,
            relationshipGoal === option.value && styles.selectedOption,
          ]}
          onPress={() => setRelationshipGoal(option.value as any)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Continue</Text>
      </TouchableOpacity>
    </GlobalSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, paddingHorizontal: 20, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginLeft: 10,
  },
  dot: {
    marginHorizontal: 5,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
  },
  optionButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#f9f9f9",
  },
  selectedOption: {
    backgroundColor: "#FF6347",
    borderColor: "#FF6347",
  },
  optionText: { fontSize: 15, textAlign: "center", fontWeight: "600" },
  nextButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
    textAlign: "center",
  },
});
