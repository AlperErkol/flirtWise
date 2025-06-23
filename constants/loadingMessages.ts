export const loadingMessages = {
  profileMaxxing: [
    "profileMaxxingLoading1",
    "profileMaxxingLoading2",
    "profileMaxxingLoading3",
    "profileMaxxingLoading4",
  ],
  photoOpeners: [
    "photoOpenersLoading1",
    "photoOpenersLoading2",
    "photoOpenersLoading3",
    "photoOpenersLoading4",
  ],
  chatEnhancer: [
    "chatEnhancerLoading1",
    "chatEnhancerLoading2",
    "chatEnhancerLoading3",
    "chatEnhancerLoading4",
  ],
} as const;

export type LoadingMessageType = keyof typeof loadingMessages;
