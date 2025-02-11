import Purchases from "react-native-purchases";

class RevenueCatService {
  private static initialized = false;
  private static IOS_API_KEY = "appl_TvvyCFvFSroRvVfDHICvelkQChX";
  private static initializationPromise: Promise<void> | null = null;

  static async initialize() {
    if (this.initialized) {
      return;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = (async () => {
      try {
        await Purchases.configure({
          apiKey: this.IOS_API_KEY,
        });
        this.initialized = true;
        console.log("RevenueCat initialized successfully");
      } catch (error) {
        console.error("RevenueCat initialization failed:", error);
        throw error;
      } finally {
        this.initializationPromise = null;
      }
    })();

    return this.initializationPromise;
  }

  static async resetState() {
    try {
      this.initialized = false;
      await Purchases.invalidateCustomerInfoCache();
      await this.initialize();
      console.log("RevenueCat state reset successfully");
    } catch (error) {
      console.error("RevenueCat state reset failed:", error);
      throw error;
    }
  }

  static async getCustomerInfo() {
    if (!this.initialized) {
      await this.initialize();
    }
    return Purchases.getCustomerInfo();
  }

  static async getOfferings() {
    if (!this.initialized) {
      await this.initialize();
    }
    return Purchases.getOfferings();
  }
}

export default RevenueCatService;
