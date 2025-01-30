const getWelcomeMessage = (persona: string) => {
  switch (persona) {
    case "dating_coach":
      return "Hi! I'm your Dating Coach. I'll help you navigate the dating world with confidence! 💝 What would you like help with?";
    case "flirting_expert":
      return "Hello, I'm your Flirting Expert. Ready to master the art of modern flirting? 💫 What's on your mind?";
    case "relationship_guru":
      return "Hi, I'm your Relationship Guru. Let's handle any dating challenge together! ❤️ How can I assist you today?";
    default:
      return "Hello! How can I help you today?";
  }
};

const getPersonaDetails = (persona: string) => {
  switch (persona) {
    case "dating_coach":
      return {
        title: "Dating Coach",
        description: "Your guide to better dating",
        gradient: ["#4FACFE", "#00F2FE"],
      };
    case "flirting_expert":
      return {
        title: "Flirting Expert",
        description: "Master modern flirting",
        gradient: ["#8E2DE2", "#4A00E0"],
      };
    case "relationship_guru":
      return {
        title: "Relationship Guru",
        description: "Navigate dating challenges",
        gradient: ["#FF416C", "#FF4B2B"],
      };
    default:
      return {
        title: "Dating Coach",
        description: "Your personal guide",
        gradient: ["#4FACFE", "#00F2FE"],
      };
  }
};

export { getWelcomeMessage, getPersonaDetails };
