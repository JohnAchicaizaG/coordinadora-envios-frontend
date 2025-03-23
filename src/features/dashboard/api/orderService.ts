import api from "../../../app/axiosConfig";
import { CreateOrderPayload } from "../types/order.types";

/**
 * Realiza una solicitud POST para crear una nueva orden de envío.
 *
 * @param {CreateOrderPayload} data - Datos necesarios para registrar la orden.
 * @returns {Promise<any>} Respuesta de la API con la información de la orden creada.
 */
export const createOrder = async (data: CreateOrderPayload) => {
    const response = await api.post("/orders/create", data);
    return response.data;
};
