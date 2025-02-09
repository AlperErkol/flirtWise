import Purchases from "react-native-purchases";

class RevenueCatService {
  private static initialized = false;
  private static IOS_API_KEY = "appl_TvvyCFvFSroRvVfDHICvelkQChX";

  static async initialize() {
    try {
      await Purchases.configure({
        apiKey: this.IOS_API_KEY,
      });

      await Purchases.syncPurchases();
      this.initialized = true;
      console.log("RevenueCat initialized successfully");
    } catch (error) {
      console.error("RevenueCat initialization failed:", error);
      throw error;
    }
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
