import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "https://hr-manager-backend.onrender.com/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
