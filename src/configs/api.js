import axios from "axios";
import { getCookie, setCookies } from "../utils/cookies";
import { getNewTokens } from "../services/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (request) => {
    const token = getCookie("accessToken");
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const res = await getNewTokens();

      if (!res?.response) return;
      
      setCookies(res.response.data)
      
      return api(originalRequest)
    }
  }
);

export default api;
