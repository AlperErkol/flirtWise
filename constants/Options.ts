const GENDER_OPTIONS = [
  { id: "male", label: "Male", value: "male" },
  { id: "female", label: "Female", value: "female" },
  { id: "n/a", label: "N/A", value: "n/a" },
];

const AGE_OPTIONS = [
  { label: "18-24", value: "18-24", id: "18-24" },
  { label: "25-34", value: "25-34", id: "25-34" },
  { label: "35-44", value: "35-44", id: "35-44" },
  { label: "45+", value: "45+", id: "45+" },
];

const INTEREST_OPTIONS = [
  { label: "Men", value: "male", id: "male" },
  { label: "Women", value: "female", id: "female" },
  { label: "Both", value: "both", id: "both" },
];

const EXPERIENCE_OPTIONS = [
  { id: "beginner", label: "Beginner", description: "New to flirting" },
  { id: "intermediate", label: "Intermediate", description: "Some experience" },
  { id: "advanced", label: "Advanced", description: "Experienced" },
];
export { GENDER_OPTIONS, AGE_OPTIONS, INTEREST_OPTIONS, EXPERIENCE_OPTIONS };
