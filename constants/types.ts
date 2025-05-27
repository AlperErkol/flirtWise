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

export default PlanType;
export type { UserPreferences, AdditionalParams };
