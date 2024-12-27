import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Octicons } from "@expo/vector-icons";
import GlobalSafeAreaView from "@/components/GlobalSafeAreaView";
import { AGE_OPTIONS, GENDER_OPTIONS } from "@/constants/Options";

export default function Step1Screen({ navigation }: any) {
  const [gender, setGender] = useState(null);
  const [ageRange, setAgeRange] = useState(null);

  const handleNext = () => {
    if (!gender || !ageRange) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    navigation.navigate("Step2", { gender, ageRange });
  };

  return (
    <GlobalSafeAreaView>
      <View style={styles.header}>
        <View style={styles.progressBar}>
          <Octicons
            name="dot-fill"
            size={24}
            color="#FF6347"
            style={styles.dot}
          />
          <Octicons name="dot" size={24} color="#CCC" style={styles.dot} />
          <Octicons name="dot" size={24} color="#CCC" style={styles.dot} />
        </View>
      </View>

      <Text style={styles.title}>Select Gender</Text>

      {GENDER_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionButton,
            gender === option.value && styles.selectedOption,
          ]}
          onPress={() => setGender(option.value as any)}
        >
          <Text style={styles.optionText}>{option.label}</Text>
        </TouchableOpacity>
      ))}

      <Text style={styles.title}>Select Age Range</Text>

      {AGE_OPTIONS.map((option) => (
        <TouchableOpacity
          key={option.value}
          style={[
            styles.optionButton,
            ageRange === option.value && styles.selectedOption,
          ]}
          onPress={() => setAgeRange(option.value as any)}
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  progressBar: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
    width: "100%",
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
