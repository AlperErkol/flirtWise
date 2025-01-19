const FREE_CATEGORIES = [
  {
    id: "first_impressions",
    isPremium: false,
    title: "First Impressions",
    icon: "👋",
    gradient: ["#FF9A8B", "#FF6B6B"],
    subCategories: [
      {
        id: "profile_presentation",
        title: "Profile Presentation",
        description: "Create an effective profile",
      },
      {
        id: "introduction_tips",
        title: "Introduction Tips",
        description: "Make a strong first impression",
      },
      {
        id: "conversation_starters",
        title: "Conversation Starters",
        description: "Engaging ways to start talking",
      },
    ],
  },
  {
    id: "communication_basics",
    isPremium: false,
    title: "Communication Basics",
    icon: "💭",
    gradient: ["#4FACFE", "#00F2FE"],
    subCategories: [
      {
        id: "question_techniques",
        title: "Question Techniques",
        description: "Keep conversations flowing",
      },
      {
        id: "conversation_topics",
        title: "Best Topics",
        description: "Never run out of things to say",
      },
      {
        id: "active_listening",
        title: "Active Listening",
        description: "Show genuine interest",
      },
    ],
  },
  {
    id: "texting_101",
    isPremium: false,
    title: "Texting 101",
    icon: "📱",
    gradient: ["#43E97B", "#38F9D7"],
    subCategories: [
      {
        id: "text_timing",
        title: "Perfect Timing",
        description: "When to text & response time",
      },
      {
        id: "emoji_mastery",
        title: "Emoji Mastery",
        description: "Express emotions effectively",
      },
      {
        id: "ghosting_prevention",
        title: "Prevent Ghosting",
        description: "Keep conversations alive",
      },
    ],
  },
];

const PREMIUM_CATEGORIES = [
  {
    id: "advanced_psychology",
    isPremium: true,
    title: "Psychology Pro",
    icon: "🧠",
    gradient: ["#FA709A", "#FEE140"],
    subCategories: [
      {
        id: "attraction_signals",
        title: "Attraction Signals",
        description: "Read interest levels accurately",
      },
      {
        id: "emotional_connection",
        title: "Deep Connection",
        description: "Build meaningful bonds",
      },
      {
        id: "confidence_boosters",
        title: "Confidence Boosters",
        description: "Instant confidence techniques",
      },
    ],
  },
  {
    id: "social_success",
    isPremium: true,
    title: "Social Success",
    icon: "🎯",
    gradient: ["#FF3CAC", "#784BA0"],
    subCategories: [
      {
        id: "event_planning",
        title: "Social Planning",
        description: "Organize memorable meetups",
      },
      {
        id: "chemistry_building",
        title: "Chemistry Building",
        description: "Create spark & attraction",
      },
      {
        id: "body_language",
        title: "Body Language Pro",
        description: "Non-verbal communication mastery",
      },
    ],
  },
  {
    id: "advanced_texting",
    isPremium: true,
    title: "Text Like a Pro",
    icon: "✨",
    gradient: ["#13547A", "#80D0C7"],
    subCategories: [
      {
        id: "conversation_hooks",
        title: "Conversation Hooks",
        description: "Keep them wanting more",
      },
      {
        id: "recovery_techniques",
        title: "Chat Recovery",
        description: "Save dying conversations",
      },
      {
        id: "storytelling",
        title: "Text Storytelling",
        description: "Engage through messages",
      },
    ],
  },
];

export { FREE_CATEGORIES, PREMIUM_CATEGORIES };
