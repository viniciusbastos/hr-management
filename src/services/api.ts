import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL + "/api",
  // withCredentials: true,
  headers: {
    "Authorization": `Bearer ${token}`,
  },
  
});
