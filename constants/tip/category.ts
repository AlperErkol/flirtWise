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
        title: "Date Planning",
        description: "Plan memorable first dates",
      },
      {
        id: "body_language",
        title: "Body Language",
        description: "Read and use body language",
      },
      {
        id: "chemistry_building",
        title: "Chemistry Building",
        description: "Create natural attraction",
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
        title: "Attraction Psychology",
        description: "Understand dating psychology",
      },
      {
        id: "emotional_connection",
        title: "Deep Connection",
        description: "Build meaningful bonds",
      },
      {
        id: "confidence_mastery",
        title: "Confidence Mastery",
        description: "Boost dating confidence",
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
        title: "Dating App Pro",
        description: "Master dating apps",
      },
      {
        id: "attraction_signals",
        title: "Interest Signals",
        description: "Spot and send right signals",
      },
      {
        id: "rejection_handling",
        title: "Rejection Mastery",
        description: "Handle rejection gracefully",
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
        title: "Commitment Signs",
        description: "Recognize relationship potential",
      },
      {
        id: "communication_mastery",
        title: "Communication Pro",
        description: "Advanced dating communication",
      },
      {
        id: "long_term",
        title: "Long-term Success",
        description: "Build lasting connections",
      },
    ],
  },
];

export { FREE_CATEGORIES, PREMIUM_CATEGORIES };
