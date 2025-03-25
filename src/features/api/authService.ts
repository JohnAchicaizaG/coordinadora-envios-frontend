import axios from "axios";
import { LoginFormData } from "../auth/validators/loginSchema";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`;

/**
 * Realiza una solicitud POST para iniciar sesión con las credenciales proporcionadas.
 *
 * @param {LoginFormData} data - Datos del formulario de inicio de sesión.
 * @returns {Promise<LoginResponse>} Respuesta de la API con los datos del usuario autenticado y el token.
 */
export const loginRequest = async (data: LoginFormData) => {
    const response = await axios.post(`${API_URL}/login`, data);
    return response.data;
};
