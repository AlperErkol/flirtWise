const getWelcomeMessage = (persona: string) => {
  switch (persona) {
    case "social_coach":
      return "Hi! I'm your social coach. I'll help you have more engaging and meaningful conversations! 🌟 What would you like help with?";
    case "communication_expert":
      return "Hello, I'm your communication expert. I'm here to help you understand and improve your communication skills. 🧠 What's on your mind?";
    case "situation_expert":
      return "Hi, I'm your situation expert. We'll work through challenging scenarios together! 🎯 How can I assist you today?";
    default:
      return "Hello! How can I help you today?";
  }
};

const getPersonaDetails = (persona: string) => {
  switch (persona) {
    case "social_coach":
      return {
        title: "Social Coach",
        description: "Your guide to better conversations",
        gradient: ["#4FACFE", "#00F2FE"],
      };
    case "communication_expert":
      return {
        title: "Communication Expert",
        description: "Deep insights for better interactions",
        gradient: ["#8E2DE2", "#4A00E0"],
      };
    case "situation_expert":
      return {
        title: "Situation Expert",
        description: "Solutions for challenging scenarios",
        gradient: ["#FF416C", "#FF4B2B"],
      };
    default:
      return {
        title: "Communication Coach",
        description: "Your personal guide",
        gradient: ["#4FACFE", "#00F2FE"],
      };
  }
};

export { getWelcomeMessage, getPersonaDetails };
