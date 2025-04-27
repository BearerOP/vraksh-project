import axios from "axios";

const SERVER_URL = import.meta.env.VITE_VRAKSH_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true, // Include credentials (cookies) in requests
});

// Utility function to get token from cookie
function getAccessTokenFromCookie() {
  return document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="))
    ?.split("=")[1];
}

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const publicRoutes = ["/api/branch/username/"];

    const isPublicRoute = publicRoutes.some((route) =>
      config.url?.includes(route)
    );

    if (!isPublicRoute) {
      // First try to get from cookies
      let token = getAccessTokenFromCookie();

      // Fallback to localStorage if not found
      if (!token) {
        token = localStorage.getItem("access_token") || "";
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
