import axios from "axios";

/**
 * Instancia de Axios configurada con la URL base de la API definida en las variables de entorno.
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

/**
 * Interceptor de solicitudes que agrega el token de autenticación a las cabeceras,
 * excepto para las rutas que no requieren autenticación.
 */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken");

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
