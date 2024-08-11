import axios from "axios";

const apiUrl = process.env.NODE_ENV === "production" ? "/api" : "//localhost:3000/api";

if (!apiUrl) {
  throw new Error("API_URL is not defined");
}

const api = axios.create({
  baseURL: apiUrl,
});

api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("jwt-taskify") as string;
    token = token?.slice(1, -1);

    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;