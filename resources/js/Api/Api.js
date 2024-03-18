// src/api/index.js
import axios from 'axios';

const apiBaseUrl = import.meta.env.API_BASE_URL; 
const apiClient = axios.create({
  baseURL: apiBaseUrl,
});

export default apiClient;
