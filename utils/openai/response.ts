import { z } from "zod";

const ChatEnhancerExtraction = z.object({
  enhancers: z
    .array(z.string())
    .transform((arr) =>
      arr.map((str) => str.replace(/\\"/g, '"').replace(/^"|"$/g, ""))
    ),
});

const PhotoOpenerExtraction = z.object({
  openers: z
    .array(z.string())
    .transform((arr) =>
      arr.map((str) => str.replace(/\\"/g, '"').replace(/^"|"$/g, ""))
    ),
});

const CommunicationTipExtraction = z.object({
  mainTip: z.string(),
  explanation: z.string(),
  successRate: z.string(),
  examples: z.array(z.string()),
  doAndDonts: z.object({
    do: z.array(z.string()),
    dont: z.array(z.string()),
  }),
});

const PremiumCommunicationTipExtraction = z.object({
  mainTip: z.string(),
  explanation: z.string(),
  successRate: z.string(),
  examples: z.array(z.string()),
  doAndDonts: z.object({
    do: z.array(z.string()),
    dont: z.array(z.string()),
  }),
  premiumContent: z.object({
    situationalVariations: z.object({
      casual: z.string(),
      romantic: z.string(),
      recovery: z.string(),
    }),
    psychologyInsight: z.string(),
    expertNotes: z.string(),
    successRate: z.string(),
  }),
});
const CommunicationCoachExtraction = z.object({
  response: z.string(),
  tone: z.enum(["casual", "professional", "empathetic"]).optional(),
  suggestedTopics: z.array(z.string()).optional(),
});

const ProfileMaxxingExtraction = z.object({
  overallScore: z.number(),
  styleVibe: z.object({
    summary: z.string(),
    keywords: z.array(z.string()),
    improvements: z.array(z.string()),
  }),
  photoAnalysis: z.array(
    z.object({
      idx: z.number(),
      score: z.number(),
      strength: z.string(),
      fix: z.string(),
    })
  ),
  bioAnalysis: z.object({
    strengths: z.array(z.string()),
    weaknesses: z.array(z.string()),
    rewriteSuggestion: z.string(),
  }),
  detailedScores: z.object({
    firstImpression: z.number(),
    authenticity: z.number(),
    humor: z.number(),
    clarity: z.number(),
  }),
  photoOrder: z.array(z.number()),
  psychologyInsight: z.string(),
  expertNotes: z.string(),
  actionChecklist: z.array(
    z.object({
      task: z.string(),
      impact: z.string(),
      effort: z.string(),
    })
  ),
});

export {
  ChatEnhancerExtraction,
  PhotoOpenerExtraction,
  CommunicationTipExtraction,
  PremiumCommunicationTipExtraction,
  CommunicationCoachExtraction,
  ProfileMaxxingExtraction,
};
