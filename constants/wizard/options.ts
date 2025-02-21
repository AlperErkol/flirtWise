const GENDER_OPTIONS = [
  { id: "male", label: "male", icon: "man" },
  { id: "female", label: "female", icon: "woman" },
  { id: "other", label: "other", icon: "person" },
];

const AGE_OPTIONS = [
  { id: "18-24", label: "18-24" },
  { id: "25-34", label: "25-34" },
  { id: "35-44", label: "35-44" },
  { id: "45+", label: "45+" },
];

const INTEREST_OPTIONS = [
  { id: "men", label: "men", icon: "man" },
  { id: "women", label: "women", icon: "woman" },
  { id: "both", label: "both", icon: "person" },
];

const COMMUNICATION_STYLES = [
  {
    id: "playful",
    label: "Playful & Humorous",
    emoji: "😊",
  },
  {
    id: "direct",
    label: "Direct & Straightforward",
    emoji: "🎯",
  },
  {
    id: "deep",
    label: "Deep & Intellectual",
    emoji: "🤔",
  },
  {
    id: "casual",
    label: "Casual & Easygoing",
    emoji: "🌟",
  },
];

const INTEREST_AREAS = [
  { id: "sports", label: "Sports & Fitness", emoji: "🏃‍♂️" },
  { id: "arts", label: "Arts & Culture", emoji: "🎨" },
  { id: "travel", label: "Travel & Adventure", emoji: "✈️" },
  { id: "music", label: "Music & Entertainment", emoji: "🎵" },
  { id: "food", label: "Food & Cooking", emoji: "🍳" },
  { id: "tech", label: "Technology & Gaming", emoji: "🎮" },
  { id: "nature", label: "Nature & Outdoors", emoji: "🌲" },
  { id: "books", label: "Reading & Literature", emoji: "📚" },
];

const PREFERENCE_OPTIONS = [
  {
    id: "1",
    title: "gender",
    screen: "preferences/GenderPreferenceScreen",
    icon: "man",
    key: "gender",
    getDisplayValue: (value: string) => value || "notSet",
  },
  {
    id: "2",
    title: "ageRange",
    screen: "preferences/AgePreferenceScreen",
    icon: "calendar",
    key: "age",
    getDisplayValue: (value: string) => value || "notSet",
  },
  {
    id: "3",
    title: "perfectMatch",
    screen: "preferences/MatchPreferenceScreen",
    icon: "heart",
    key: "interest",
    getDisplayValue: (value: string) => value || "notSet",
  },
];

export {
  GENDER_OPTIONS,
  AGE_OPTIONS,
  INTEREST_OPTIONS,
  COMMUNICATION_STYLES,
  INTEREST_AREAS,
  PREFERENCE_OPTIONS,
};
