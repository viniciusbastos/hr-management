import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "https://hr-manager-api-46054cada309.herokuapp.com/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
