import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RemoteConfigService from "./RemoteConfigService";

const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;
const TIMEOUT = 50000;

class ApiService {
  private static instance = axios.create({
    baseURL: "https://api.openai.com/v1",
    headers: {
      "Content-Type": "application/json",
    },
  });

  private static requestCount = 0;
  private static windowStart = Date.now();

  private static async loadRequestCount() {
    try {
      const data = await AsyncStorage.getItem("api_rate_limit");
      if (data) {
        const { count, timestamp } = JSON.parse(data);
        if (Date.now() - timestamp > RATE_LIMIT_WINDOW) {
          this.requestCount = 0;
          this.windowStart = Date.now();
        } else {
          this.requestCount = count;
          this.windowStart = timestamp;
        }
      }
    } catch (error) {
      console.error("Rate limit verisi yüklenemedi:", error);
    }
  }

  private static async saveRequestCount() {
    try {
      await AsyncStorage.setItem(
        "api_rate_limit",
        JSON.stringify({
          count: this.requestCount,
          timestamp: this.windowStart,
        })
      );
    } catch (error) {
      console.error("Rate limit verisi kaydedilemedi:", error);
    }
  }

  private static async checkRateLimit() {
    await this.loadRequestCount();

    if (Date.now() - this.windowStart > RATE_LIMIT_WINDOW) {
      this.requestCount = 0;
      this.windowStart = Date.now();
    }

    if (this.requestCount >= RATE_LIMIT) {
      const waitTime = RATE_LIMIT_WINDOW - (Date.now() - this.windowStart);
      throw new Error(
        `Rate limit aşıldı. Lütfen ${Math.ceil(
          waitTime / 1000
        )} saniye bekleyin.`
      );
    }

    this.requestCount++;
    await this.saveRequestCount();
  }

  private static async getHeaders() {
    const apiKey = RemoteConfigService.getOpenAIApiKey();
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    };
  }

  static async post(endpoint: string, data: any) {
    try {
      await this.checkRateLimit();
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT);

      const headers = await this.getHeaders();
      const response = await this.instance.post(endpoint, data, {
        headers,
        signal: controller.signal,
        timeout: TIMEOUT,
      });

      clearTimeout(timeoutId);
      return response.data;
    } catch (error: any) {
      if (error.name === "AbortError") {
        throw new Error("İstek zaman aşımına uğradı. Lütfen tekrar deneyin.");
      }
      if (error.message.includes("Rate limit")) {
        throw error;
      }
      if (error.response) {
        console.log("error.response", error.response);
        switch (error.response.status) {
          case 429:
            throw new Error("API rate limit aşıldı. Lütfen biraz bekleyin.");
          case 401:
            throw new Error("Geçersiz API anahtarı.");
          default:
            throw new Error("API isteği başarısız oldu.");
        }
      }
      throw error;
    }
  }
}

export default ApiService;
