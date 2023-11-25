import axios from "axios";
import { getToken } from "../api";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000",
});

axiosInstance.interceptors.request.use(
  (config) => {
    const info = getToken();
    config.headers.Authorization = `Bearer ${info?.access_token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
