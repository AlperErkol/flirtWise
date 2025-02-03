import remoteConfig from "@react-native-firebase/remote-config";

class RemoteConfigService {
  static async initialize() {
    try {
      await remoteConfig().setDefaults({
        openai_api_key: "",
      });

      await remoteConfig().fetchAndActivate();
    } catch (error) {
      console.error("Remote Config başlatılamadı:", error);
    }
  }

  static getOpenAIApiKey(): string {
    try {
      return remoteConfig().getValue("openai_api_key").asString();
    } catch (error) {
      console.error("OpenAI API anahtarı alınamadı:", error);
      return "";
    }
  }
}

export default RemoteConfigService;
