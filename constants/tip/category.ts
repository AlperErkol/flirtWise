const FREE_CATEGORIES = [
  {
    id: "first_impression",
    isPremium: false,
    title: "firstImpression",
    icon: "✨",
    gradient: ["#FF9A8B", "#FF6B6B"],
    description: "firstImpressionDescription",
    subCategories: [
      {
        id: "profile_optimization",
        title: "profileMagic",
        description: "profileMagicDescription",
      },
      {
        id: "photo_selection",
        title: "photoSelection",
        description: "photoSelectionDescription",
      },
      {
        id: "bio_writing",
        title: "bioWriting",
        description: "bioWritingDescription",
      },
    ],
  },
  {
    id: "conversation_basics",
    isPremium: false,
    title: "conversationBasics",
    icon: "💭",
    gradient: ["#4FACFE", "#00F2FE"],
    description: "conversationBasicsDescription",
    subCategories: [
      {
        id: "ice_breakers",
        title: "iceBreakers",
        description: "iceBreakersDescription",
      },
      {
        id: "flirting_basics",
        title: "flirtingBasics",
        description: "flirtingBasicsDescription",
      },
      {
        id: "engaging_questions",
        title: "smartQuestions",
        description: "smartQuestionsDescription",
      },
    ],
  },
  {
    id: "dating_essentials",
    isPremium: false,
    title: "datingEssentials",
    icon: "💝",
    gradient: ["#43E97B", "#38F9D7"],
    description: "datingEssentialsDescription",
    subCategories: [
      {
        id: "date_planning",
        title: "datePlanning",
        description: "datePlanningDescription",
      },
      {
        id: "body_language",
        title: "bodyLanguage",
        description: "bodyLanguageDescription",
      },
      {
        id: "chemistry_building",
        title: "chemistryBuilding",
        description: "chemistryBuildingDescription",
      },
    ],
  },
];

const PREMIUM_CATEGORIES = [
  {
    id: "advanced_attraction",
    isPremium: true,
    title: "advancedAttraction",
    icon: "🌟",
    gradient: ["#FA709A", "#FEE140"],
    description: "advancedAttractionDescription",
    subCategories: [
      {
        id: "psychology_attraction",
        title: "attractionPsychology",
        description: "attractionPsychologyDescription",
      },
      {
        id: "emotional_connection",
        title: "deepConnection",
        description: "deepConnectionDescription",
      },
      {
        id: "confidence_mastery",
        title: "confidenceMastery",
        description: "confidenceMasteryDescription",
      },
    ],
  },
  {
    id: "dating_strategy",
    isPremium: true,
    title: "datingStrategy",
    icon: "🎯",
    gradient: ["#FF3CAC", "#784BA0"],
    description: "datingStrategyDescription",
    subCategories: [
      {
        id: "dating_apps",
        title: "datingAppPro",
        description: "datingAppProDescription",
      },
      {
        id: "attraction_signals",
        title: "interestSignals",
        description: "interestSignalsDescription",
      },
      {
        id: "rejection_handling",
        title: "rejectionMastery",
        description: "rejectionMasteryDescription",
      },
    ],
  },
  {
    id: "relationship_building",
    isPremium: true,
    title: "relationshipBuilding",
    icon: "💫",
    gradient: ["#13547A", "#80D0C7"],
    description: "relationshipBuildingDescription",
    subCategories: [
      {
        id: "commitment_signs",
        title: "commitmentSigns",
        description: "commitmentSignsDescription",
      },
      {
        id: "communication_mastery",
        title: "communicationPro",
        description: "communicationProDescription",
      },
      {
        id: "long_term",
        title: "longTermSuccess",
        description: "longTermSuccessDescription",
      },
    ],
  },
];

export { FREE_CATEGORIES, PREMIUM_CATEGORIES };
