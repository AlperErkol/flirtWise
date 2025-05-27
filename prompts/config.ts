export type RiskLevel = "soft" | "medium" | "bold";
export type SpellingStyle = "strict" | "medium" | "loose" | "mirror";

export const RISK_PROMPT: Record<RiskLevel, string> = {
  soft: "polite curiosity, no physical dares",
  medium: "playful challenge, light innuendo",
  bold: "confident challenge, direct flirt (avoid explicit content)",
};

export const SPELLING_RULE: Record<SpellingStyle, string> = {
  strict:
    "standard capitalization & punctuation; avoid contractions; no emojis",
  medium: "readable, casual punctuation; natural contractions; no emojis",
  loose:
    "all-lowercase, minimal punctuation; contractions & 1-2 slang ok; no emojis",
  mirror: "imitate their CAPS/lowercase & punctuation density; no emojis",
} as const;

export const SPELLING_STYLE_LABELS: Record<SpellingStyle, string> = {
  strict: "Formal & perfect",
  medium: "Casual & clear",
  loose: "all lowercase",
  mirror: "Match their style",
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
