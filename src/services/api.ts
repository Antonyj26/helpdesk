import axios from "axios";

export const api = axios.create({
  baseURL: "https://helpdesk-api-gg31.onrender.com",
});

api.interceptors.request.use((config) => {
  const userData = localStorage.getItem("@helpdesk:user");

  if (userData) {
    const { token } = JSON.parse(userData);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});
