// app/utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: '/api', // lub pełny URL do twojego API, jeśli jest hostowane oddzielnie
});

export default api;