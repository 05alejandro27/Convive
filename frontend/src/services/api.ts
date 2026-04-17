import axios from 'axios'

//Creo una instancia personalizada de axios
const api = axios.create({
    //Defino la URL base para todas las peticiones
    baseURL: 'http://localhost:8080/api',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;