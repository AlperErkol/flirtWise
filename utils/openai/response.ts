import { z } from "zod";

const ChatEnhancerExtraction = z.object({
  enhancers: z.array(z.string()).transform((arr) => 
    arr.map(str => str.replace(/\\"/g, '"').replace(/^"|"$/g, ''))
  ),
});

const PhotoOpenerExtraction = z.object({
  openers: z.array(z.string()).transform((arr) => 
    arr.map(str => str.replace(/\\"/g, '"').replace(/^"|"$/g, ''))
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

export {
  ChatEnhancerExtraction,
  PhotoOpenerExtraction,
  CommunicationTipExtraction,
  PremiumCommunicationTipExtraction,
  CommunicationCoachExtraction,
};
