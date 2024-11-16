import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
});

// Add an interceptor to dynamically set the token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
