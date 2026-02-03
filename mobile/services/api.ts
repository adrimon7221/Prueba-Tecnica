import axios from 'axios';
import { API_URL } from '@/constants/config';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      console.error('Error de respuesta:', error.response.data);
      throw new Error(error.response.data.message || 'Error del servidor');
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      console.error('Error de red:', error.request);
      throw new Error('No se pudo conectar con el servidor');
    } else {
      // Algo pasó al configurar la petición
      console.error('Error:', error.message);
      throw new Error('Error en la petición');
    }
  }
);

export default api;
