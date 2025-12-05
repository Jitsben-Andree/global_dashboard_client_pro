import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8010/api',
  withCredentials: true, // IMPORTANTE: Permite enviar/recibir cookies HttpOnly
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;