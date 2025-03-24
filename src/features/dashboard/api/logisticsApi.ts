import axios from "../../../app/axiosConfig";
import { RouteForm, TransporterForm, UserForm } from "../types/forms";

/**
 * Registra un nuevo usuario en el sistema.
 *
 * @function
 * @param {UserForm} data - Los datos del formulario del usuario.
 * @returns {Promise} Promesa que resuelve la respuesta del servidor.
 *
 * @example
 * registerUser({ name: "Juan", email: "juan@example.com", password: "123456" });
 */
export const registerUser = (data: UserForm) =>
    axios.post("/auth/register", data);

/**
 * Registra una nueva ruta logística en el sistema.
 *
 * @function
 * @param {RouteForm} data - Los datos del formulario de la ruta.
 * @returns {Promise} Promesa que resuelve la respuesta del servidor.
 *
 * @example
 * registerRoute({ name: "Ruta Norte", origin: "Bogotá", destination: "Medellín" });
 */
export const registerRoute = (data: RouteForm) =>
    axios.post("/logistics/routes", data);

/**
 * Registra un nuevo transportador en el sistema.
 *
 * @function
 * @param {TransporterForm} data - Los datos del formulario del transportador.
 * @returns {Promise} Promesa que resuelve la respuesta del servidor.
 *
 * @example
 * registerTransporter({ name: "Pedro Pérez", vehicle: "Camión", plate: "XYZ123" });
 */
export const registerTransporter = (data: TransporterForm) =>
    axios.post("/logistics/transporters", data);
