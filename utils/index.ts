export const getRiskLevel = (riskLevel: string) => {
  switch (riskLevel) {
    case "soft":
      return 0.7;
    case "medium":
      return 0.8;
    case "bold":
      return 0.9;
    default:
      return 0.8;
  }
};
