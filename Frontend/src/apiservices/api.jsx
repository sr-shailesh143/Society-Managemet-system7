import axios from "axios";
import constant from "../constant/constant";

const api = axios.create({
  baseURL: constant.API, // Base URL from constants
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Allows cookies for cross-origin requests if needed
});

export default api;
