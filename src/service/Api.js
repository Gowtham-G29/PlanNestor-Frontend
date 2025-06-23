import axios from "axios";

export const API_BASE_URL="https://plannestornew.onrender.com";

const api=axios.create({baseURL:API_BASE_URL})


api.interceptors.request.use((config) => {
  const jwt = localStorage.getItem("jwt");
  if (jwt) {
    config.headers["Authorization"] = `Bearer ${jwt}`;
  }
  return config;
});
api.defaults.headers.post["Content-Type"]="application/json"

export default api;