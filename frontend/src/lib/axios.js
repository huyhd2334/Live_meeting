import axios from "axios";

const BASE_URL =  import.meta.env.MODE === "development"
                                            ? "https://ctpt0djm-8386.asse.devtunnels.ms/api"
                                            : "/api";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, 
});

// Gọi API refresh token
export const getNewAccessToken = async () => {
  try {
    await api.post("/auth/refresh-accesstoken");
    return true
  } catch (err) {
    return false
  }
};

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      const refreshed = await getNewAccessToken();
      if (refreshed) {
        return api(original);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
