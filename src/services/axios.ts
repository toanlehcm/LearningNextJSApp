import { useLoadingStore } from "@/stores/useLoadingStore";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 15000,
});

// ================================
// 🔥 REQUEST INTERCEPTOR
// ================================
axiosInstance.interceptors.request.use(
  (config) => {
    // useLoadingStore.getState().increase(); // Show loading.
    return config;
  },
  (error) => {
    // useLoadingStore.getState().decrease();
    return Promise.reject(error);
  }
);

// ================================
// 🔥 RESPONSE INTERCEPTOR
// ================================
axiosInstance.interceptors.response.use(
  (response) => {
    // useLoadingStore.getState().decrease(); // Hide loading.
    return response;
  },
  (error) => {
    // useLoadingStore.getState().decrease();
    return Promise.reject(error);
  }
);

export default axiosInstance;
