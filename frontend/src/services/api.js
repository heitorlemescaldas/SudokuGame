import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Adicionar interceptor para incluir o token JWT em todas as requisições
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // Supondo que o token esteja armazenado no localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
