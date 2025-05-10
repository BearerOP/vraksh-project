import axios from "axios";
import type { AxiosError, AxiosRequestConfig } from "axios";

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

interface QueuedRequest {
  resolve: (token: string) => void;
  reject: (error: Error) => void;
}

let isRefreshing = false;
let failedQueue: QueuedRequest[] = [];

const processQueue = (error: Error | null = null, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const publicRoutes = ["/api/branch/username/", "/api/auth/refresh"];

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

interface RefreshTokenResponse {
  data: {
    access_token: string;
    success: boolean;
  };
}

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If the error is not 401 or the request has already been retried, reject
    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      // If a refresh is already in progress, queue this request
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      })
        .then((token) => {
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return axiosInstance(originalRequest);
        })
        .catch((err) => Promise.reject(err));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Get current token for refresh attempt
      const currentToken = getAccessTokenFromCookie() || localStorage.getItem("access_token");
      
      if (!currentToken) {
        throw new Error("No access token available");
      }

      const response = await axiosInstance.get<RefreshTokenResponse>("/api/auth/refresh", {
        headers: {
          Authorization: `Bearer ${currentToken}`
        }
      });

      const { access_token } = response.data.data;

      if (access_token) {
        // Update token in cookie and localStorage
        document.cookie = `access_token=${access_token}; path=/; secure; samesite=strict`;
        localStorage.setItem("access_token", access_token);

        // Update Authorization header
        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token}`;
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
        }

        // Process queued requests
        processQueue(null, access_token);

        return axiosInstance(originalRequest);
      }
    } catch (refreshError) {
      processQueue(refreshError as Error, null);
      // Clear tokens and redirect to login
      document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
      localStorage.removeItem("access_token");
      window.location.href = import.meta.env.VITE_VRAKSH_URL + "/auth/login";
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

export default axiosInstance;
