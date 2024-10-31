import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const api = axios.create({
  baseURL: "http://192.168.0.103:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("token");
      const user_id = await AsyncStorage.getItem("user_id");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      if (user_id) {
        config.headers["X-User-Id"] = user_id;
      } else {
        console.log("User ID não encontrado no AsyncStorage");
      }

      return config;
    } catch (error) {
      return config;
    }
  },
  (error) => Promise.reject(error)
);
