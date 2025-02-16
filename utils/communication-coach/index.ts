const getWelcomeMessage = (persona: string) => {
  switch (persona) {
    case "dating_coach":
      return "datingCoachWelcome";
    case "flirting_expert":
      return "flirtingExpertWelcome";
    case "relationship_guru":
      return "relationshipGuruWelcome";
    default:
      return "datingCoachWelcome";
  }
};

const getPersonaDetails = (persona: string) => {
  switch (persona) {
    case "dating_coach":
      return {
        title: "datingCoach",
        description: "datingCoachDetail",
        gradient: ["#4FACFE", "#00F2FE"],
      };
    case "flirting_expert":
      return {
        title: "flirtingExpert",
        description: "flirtingExpertDetail",
        gradient: ["#8E2DE2", "#4A00E0"],
      };
    case "relationship_guru":
      return {
        title: "relationshipGuru",
        description: "relationshipGuruDetail",
        gradient: ["#FF416C", "#FF4B2B"],
      };
    default:
      return {
        title: "datingCoach",
        description: "datingCoachDetail",
        gradient: ["#4FACFE", "#00F2FE"],
      };
  }
};

export { getWelcomeMessage, getPersonaDetails };
