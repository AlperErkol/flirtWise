import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RATE_LIMIT = 20;
const RATE_LIMIT_WINDOW = 5 * 60 * 1000;

class ApiService {
  private static instance = axios.create({
    baseURL: "https://api.openai.com/v1",
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
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

    // Zaman penceresi geçtiyse sayacı sıfırla
    if (Date.now() - this.windowStart > RATE_LIMIT_WINDOW) {
      this.requestCount = 0;
      this.windowStart = Date.now();
    }

    // Rate limit kontrolü
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

  static async post(endpoint: string, data: any) {
    try {
      await this.checkRateLimit();
      const response = await this.instance.post(endpoint, data);
      return response.data;
    } catch (error: any) {
      if (error.message.includes("Rate limit")) {
        throw error;
      }
      if (error.response) {
        switch (error.response.status) {
          case 429:
            throw new Error("API rate limit aşıldı. Lütfen biraz bekleyin.");
          case 401:
            throw new Error("API anahtarı geçersiz.");
          default:
            throw new Error("API isteği başarısız oldu.");
        }
      }
      throw error;
    }
  }
}

export default ApiService;
