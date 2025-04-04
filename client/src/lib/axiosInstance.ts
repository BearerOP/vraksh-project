
import axios from 'axios';
const SERVER_URL = import.meta.env.VITE_VRAKSH_SERVER_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: SERVER_URL,
  headers: { 'Content-Type': 'application/json' }
}); // Create the axios instance

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before the request is sent
    // For example, add an authentication token to the headers
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('token='))
      ?.split('=')[1];
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    

    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  }
);

export default axiosInstance;