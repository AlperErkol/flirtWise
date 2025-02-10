const FREE_CATEGORIES = [
  {
    id: "first_impression",
    isPremium: false,
    title: "First Impression",
    icon: "✨",
    gradient: ["#FF9A8B", "#FF6B6B"],
    description:
      "Master the art of creating memorable first impressions in dating. Learn essential techniques for profile optimization and authentic self-presentation.",
    subCategories: [
      {
        id: "profile_optimization",
        title: "Profile Magic",
        description: "Create an irresistible dating profile",
      },
      {
        id: "photo_selection",
        title: "Photo Selection",
        description: "Choose photos that attract attention",
      },
      {
        id: "bio_writing",
        title: "Bio Writing",
        description: "Write a bio that stands out",
      },
    ],
  },
  {
    id: "conversation_basics",
    isPremium: false,
    title: "Conversation Basics",
    icon: "💭",
    gradient: ["#4FACFE", "#00F2FE"],
    description:
      "Develop fundamental conversation skills for dating success. Learn how to start and maintain engaging discussions with confidence.",
    subCategories: [
      {
        id: "ice_breakers",
        title: "Ice Breakers",
        description: "Start conversations smoothly",
      },
      {
        id: "flirting_basics",
        title: "Flirting 101",
        description: "Master the basics of flirting",
      },
      {
        id: "engaging_questions",
        title: "Smart Questions",
        description: "Keep conversations flowing",
      },
    ],
  },
  {
    id: "dating_essentials",
    isPremium: false,
    title: "Dating Essentials",
    icon: "💝",
    gradient: ["#43E97B", "#38F9D7"],
    description:
      "Essential dating skills and knowledge for successful relationships. From planning perfect dates to understanding body language.",
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
    title: "Advanced Attraction",
    icon: "🌟",
    gradient: ["#FA709A", "#FEE140"],
    description:
      "Advanced psychological insights and strategies for creating genuine attraction. Learn deeper aspects of dating psychology.",
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
    title: "Dating Strategy",
    icon: "🎯",
    gradient: ["#FF3CAC", "#784BA0"],
    description:
      "Strategic approaches to modern dating, including advanced app techniques and handling complex dating scenarios.",
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
    title: "Relationship Building",
    icon: "💫",
    gradient: ["#13547A", "#80D0C7"],
    description:
      "Expert guidance on building and maintaining meaningful relationships. Learn to create lasting connections and deep emotional bonds.",
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
