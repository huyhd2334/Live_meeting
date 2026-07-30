import axios from "axios";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:8386/api"
    : "/api";

// API for all requests
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// API for login/refresh
const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const getNewAccessToken = async () => {
  try {
    const response = await authApi.post("/auth/refresh-accesstoken");
    return response.status === 200;
  } catch (err) {
    return false;
  }
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/logout") &&
      !originalRequest.url.includes("/auth/refresh-accesstoken")
    ) {
      originalRequest._retry = true;

      const refreshed = await getNewAccessToken();

      if (refreshed) {
        return api(originalRequest);
      }
    }

    return Promise.reject(error);
  }
);

export default api;