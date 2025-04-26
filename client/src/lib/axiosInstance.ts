import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_VRAKSH_SERVER_URL;

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true, // Include credentials (cookies) in requests
}); // Create the axios instance

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Public routes that don't need authentication
    const publicRoutes = ['/api/branch/username/'];
    
    // Check if the current request URL matches any public route
    const isPublicRoute = publicRoutes.some(route => config.url?.includes(route));
    
    // Only add authentication for non-public routes
    if (!isPublicRoute) {
      // Add an authentication token to the headers
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('access_token='))
        ?.split('=')[1];
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;