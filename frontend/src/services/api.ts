import axios from 'axios'

//Creo una instancia personalizada de axios
const api = axios.create({
    //Defino la URL base para todas las peticiones
    baseURL: 'http://localhost:8080/api',
});

export default api;