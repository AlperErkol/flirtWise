const mainFeatures = [
  {
    id: "1",
    title: "Photo Analysis",
    description: "Get smart conversation starters based on photos",
    screen: "PhotoOpenersScreen",
    isPremium: false,
    backgroundColor: "#4F46E5",
    emoji: "📸",
  },
  {
    id: "2",
    title: "Chat Wizard",
    description: "Enhance your conversations with AI-powered suggestions",
    screen: "ChatEnhancerScreen",
    isPremium: true,
    backgroundColor: "#7C3AED",
    emoji: "💬",
  },
];

const secondaryFeatures = [
  {
    id: "3",
    title: "Social Coach",
    description: "Get personalized communication advice",
    screen: "CommunicationCoachSelectionScreen",
    gradient: ["#FF6B6B", "#FF9A8B"],
    emoji: "🎯",
    isPremium: false,
  },
  {
    id: "4",
    title: "Chat Mentor",
    description: "Learn proven techniques",
    screen: "TipsScreen",
    gradient: ["#4FACFE", "#00F2FE"],
    emoji: "💡",
    isPremium: false,
  },
];

export { mainFeatures, secondaryFeatures };
