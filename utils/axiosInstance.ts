import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.openai.com/v1",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer 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`,
  },
});

export default axiosInstance;
