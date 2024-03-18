import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "https://api-hr-manager-6a1f85c2202b.herokuapp.com/",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
