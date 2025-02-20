const mainFeatures = [
  {
    id: "1",
    title: "photoAnalysisTitle",
    description: "photoAnalysisDescription",
    screen: "PhotoOpenersScreen",
    icon: "camera-outline",
    dark: true,
  },
  {
    id: "2",
    title: "chatWizardTitle",
    description: "chatWizardDescription",
    screen: "ChatEnhancerScreen",
    icon: "chatbubble-ellipses-outline",
    dark: false,
  },
];

const secondaryFeatures = [
  {
    id: "3",
    title: "flirtingCoachTitle",
    description: "flirtingCoachDescription",
    screen: "CommunicationCoachSelectionScreen",
    dark: true,
    icon: "school",
    tags: ["guide", "oneToOneHelp"],
  },
  {
    id: "4",
    title: "flirtingTipsTitle",
    description: "flirtingTipsDescription",
    screen: "TipsScreen",
    dark: false,
    icon: "bulb",
    tags: ["quickTips", "instant"],
  },
];

export { mainFeatures, secondaryFeatures };
