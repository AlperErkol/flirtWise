export type RiskLevel = "safe" | "balanced" | "spicy";
export type SpellingStyle = "formal" | "neutral" | "loose" | "mirroring";

export const RISK_PROMPT: Record<RiskLevel, string> = {
  safe: "polite curiosity, no physical dares",
  balanced: "playful challenge, light innuendo",
  spicy: "confident challenge, direct flirt (avoid explicit content)",
};

export const SPELLING_RULE: Record<SpellingStyle, string> = {
  formal:
    "standard capitalization & punctuation; avoid contractions; no emojis",
  neutral: "readable, casual punctuation; natural contractions; no emojis",
  loose:
    "all-lowercase, minimal punctuation; contractions & 1-2 slang ok; no emojis",
  mirroring: "imitate their CAPS/lowercase & punctuation density; no emojis",
} as const;

export const SPELLING_STYLE_LABELS: Record<SpellingStyle, string> = {
  formal: "Formal & perfect",
  neutral: "Casual & clear",
  loose: "all lowercase",
  mirroring: "Match their style",
} as const;

export function ageTone(ageRange: string): string {
  switch (ageRange) {
    case "18-24":
      return "lively & casual; light slang permitted; no emojis";
    case "25-35":
      return "polished yet playful; ambition/career references welcome";
    default:
      return "refined wording; avoid trendy slang; warm & engaging";
  }
}
