enum PlanType {
  WEEKLY = "rc_499_1w",
  QUARTERLY = "rc_4799_1q",
}

type UserPreferences = {
  gender: string;
  ageRange: string;
  interest: string;
};

type AdditionalParams = {
  conversationStyle: string;
  spellingStyle: string;
  riskLevel: string;
};

interface ManualData {
  targetApp: string;
  bio: string;
  profilePhotos: string[];
  age: string;
  gender: string;
  targetGender: string;
  lookingFor: string;
}

type ProfileMaxxingResult = {
  overallScore: number;
  styleVibe: {
    summary: string;
    keywords: string[];
    improvements: string[];
  };
  photoAnalysis: {
    idx: number;
    score: number;
    strength: string;
    fix: string;
  }[];
  bioAnalysis: {
    strengths: string[];
    weaknesses: string[];
    rewriteSuggestion: string;
  };
  detailedScores: {
    firstImpression: number;
    authenticity: number;
    humor: number;
    clarity: number;
  };
  photoOrder: number[];
  psychologyInsight: string;
  expertNotes: string;
  actionChecklist: {
    task: string;
    impact: string;
    effort: string;
  }[];
};

export default PlanType;
export type {
  UserPreferences,
  AdditionalParams,
  ManualData,
  ProfileMaxxingResult,
};
