// axiosConfig.js
import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:8088', 
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt_token'); 
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;
