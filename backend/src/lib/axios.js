import axios from "axios";

const api = axios.create({
  baseURL: process.env.RAG_API_URL || "http://127.0.0.1:8000",
  withCredentials: true,
});

export default api;
