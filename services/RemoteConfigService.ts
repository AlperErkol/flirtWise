import remoteConfig from "@react-native-firebase/remote-config";

class RemoteConfigService {
  private static initialized = false;

  static async initialize() {
    try {
      console.log("Initializing Remote Config...");
      await remoteConfig().setDefaults({
        openai_api_key: "",
      });

      await remoteConfig().setConfigSettings({
        minimumFetchIntervalMillis: 0, // Set to 0 for development, 3600000 (1 hour) for production
      });

      const fetchedRemotely = await remoteConfig().fetchAndActivate();
      this.initialized = true;

      console.log(
        "Remote Config initialized, fetched remotely:",
        fetchedRemotely
      );

      // Check API key
      return fetchedRemotely;
    } catch (error) {
      console.error("Failed to initialize Remote Config:", error);
      throw error;
    }
  }

  static getOpenAIApiKey(): string {
    if (!this.initialized) {
      console.warn("RemoteConfig not yet initialized!");
      return "";
    }

    try {
      const apiKey = remoteConfig().getValue("openai_api_key").asString();
      if (!apiKey) {
        console.warn("OpenAI API key is empty!");
      }
      return apiKey;
    } catch (error) {
      console.error("Failed to get OpenAI API key:", error);
      return "";
    }
  }

  static getOpenAIModelFast(): string {
    if (!this.initialized) {
      console.warn("RemoteConfig not yet initialized!");
      return "";
    }

    try {
      const apiKey = remoteConfig().getValue("openai_model_fast").asString();
      if (!apiKey) {
        console.warn("openai_model_fast is empty!");
      }
      return apiKey;
    } catch (error) {
      console.error("Failed to get OpenAI API key:", error);
      return "";
    }
  }

  static getOpenAIModelSlow(): string {
    if (!this.initialized) {
      console.warn("RemoteConfig not yet initialized!");
      return "";
    }

    try {
      const apiKey = remoteConfig().getValue("openai_model_slow").asString();
      if (!apiKey) {
        console.warn("openai_model_slow is empty!");
      }
      return apiKey;
    } catch (error) {
      console.error("Failed to get OpenAI API key:", error);
      return "";
    }
  }
}

export default RemoteConfigService;
