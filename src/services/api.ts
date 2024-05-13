import axios from "axios";

const token = localStorage.getItem("token");

export const api = axios.create({
  baseURL: "http://g40kscw.74.207.230.181.sslip.io/api",
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
