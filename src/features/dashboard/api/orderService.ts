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

/**
 * Actualiza el estado de una orden existente.
 *
 * @param {number} orderId - ID de la orden a actualizar.
 * @param {string} status - Nuevo estado para la orden.
 * @returns {Promise<any>} Respuesta de la API con la información de la orden actualizada.
 */
export const updateOrderStatus = async (orderId: number, status: string) => {
    const response = await api.patch(`/orders/${orderId}/status`, { status });
    return response.data;
};

/**
 * Asigna una orden a una ruta y un transportador específicos.
 *
 * @param {Object} payload - Objeto con los datos de asignación.
 * @param {number} payload.orderId - ID de la orden a asignar.
 * @param {number} payload.routeId - ID de la ruta a la que se asignará la orden.
 * @param {number} payload.transporterId - ID del transportador al que se asignará la orden.
 * @returns {Promise<any>} Respuesta de la API con la información de la asignación realizada.
 */
export const assignOrder = async (payload: {
    orderId: number;
    routeId: number;
    transporterId: number;
}) => {
    const response = await api.post("/orders/assign", payload);
    return response.data;
};
