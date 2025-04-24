import axios from 'axios';

// hago aquí una llamada axios para poder usarla en el resto del código (idea que vi a ver si funciona)
const api = axios.create({
  baseURL: 'https://pbf-backend.onrender.com/api', 
});

// no tengo claro para que funciona, venía en el mismo blog - entendí que es para añadir el token automáticamente
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
