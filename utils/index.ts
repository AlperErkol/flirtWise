import * as FileSystem from "expo-file-system";

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

export const uriToDataURL = async (uri: string): Promise<string> => {
  const base64 = await FileSystem.readAsStringAsync(uri, {
    encoding: FileSystem.EncodingType.Base64,
  });
  const mime = uri.toLowerCase().endsWith(".png") ? "image/png" : "image/jpeg";
  return `data:${mime};base64,${base64}`;
};
