const convoStyles = [
  {
    id: "playful",
    title: "Playful",
    key: "playful",
  },
  {
    id: "cool",
    title: "Cool",
    key: "cool",
  },
  {
    id: "witty",
    title: "Witty",
    key: "witty",
  },
  {
    id: "romantic",
    title: "Romantic",
    key: "romanticVibe",
  },
  {
    id: "confident",
    title: "Confident",
    key: "confident",
  },
  {
    id: "flirty",
    title: "Flirty",
    key: "flirty",
  },
];

const spellingStyles = [
  {
    id: "formal",
    title: "Formal",
    key: "formal",
  },
  {
    id: "neutral",
    title: "Neutral",
    key: "neutral",
  },
  {
    id: "loose",
    title: "Loose",
    key: "loose",
  },
  {
    id: "mirroring",
    title: "Mirroring",
    key: "mirroring",
  },
];

const riskLevels = [
  {
    id: "safe",
    title: "Safe",
    key: "safe",
  },
  {
    id: "balanced",
    title: "Balanced",
    key: "balanced",
  },
  {
    id: "spicy",
    title: "Spicy",
    key: "spicy",
  },
];

const TextingVibe = {
  playful:
    "Fun, energetic, and lighthearted messages that spark engaging interactions.",
  cool: "Confident and mysterious messages that intrigue and create attraction.",
  romantic:
    "Sweet, warm, and heartfelt messages that foster deep emotional connection.",
  witty:
    "Clever and humorous messages that showcase intelligence and quick thinking.",
  confident:
    "Bold, direct, and charismatic messages that exude self-assurance.",
  flirty:
    "Charming, teasing, and playfully seductive messages that build attraction.",
};

export const VIBE_REINFORCEMENT: Record<keyof typeof TextingVibe, string> = {
  playful: "include one light onomatopoeia or exclamation (yay, boom, haha).",
  cool: "add one hint of mystery or ellipsis (“…”) without emojis.",
  romantic: "use one sensory adjective (soft, warm, glowing, velvet).",
  witty: "inject one mild pun or clever wordplay.",
  confident: "phrase a direct challenge using verbs like dare, bet, prove.",
  flirty: "add a teasing phrase with a double meaning.",
};

export { TextingVibe, convoStyles, spellingStyles, riskLevels };
