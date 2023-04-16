import axios from "axios";

export const axiosInstanceAuth = axios.create({
  baseURL: "http://localhost:3400/",
  headers: {
    authorization: localStorage.getItem("token"),
  },
});

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3400/",
});
