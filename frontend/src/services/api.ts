import axios from 'axios'

//Creo una instancia personalizada de axios
const api = axios.create({
    //Defino la URL base para todas las peticiones y una alternativa por si falla (Sería en local solo)
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('communityId');
            window.location.href = '/login/1';
        }
        return Promise.reject(error);
    }
);

export default api;