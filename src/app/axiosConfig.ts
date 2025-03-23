import axios from "axios";

/**
 * Instancia de Axios configurada con la URL base de la API definida en las variables de entorno.
 * Esta instancia se puede reutilizar en toda la aplicación para hacer peticiones HTTP.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Interceptor de solicitudes que agrega el token de autenticación (Bearer Token)
 * a las cabeceras de las peticiones, excepto para las rutas excluidas como login y register.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

        // Rutas que no requieren autenticación
        const excludedPaths = ["/auth/login", "/auth/register"];

        const isExcluded = excludedPaths.some((path) =>
            config.url?.includes(path),
        );

        if (!isExcluded && token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error),
);

export default api;
