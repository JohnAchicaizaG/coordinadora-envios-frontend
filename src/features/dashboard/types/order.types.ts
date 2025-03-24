/**
 * Estructura de los datos necesarios para crear una orden de envío.
 */
export interface CreateOrderPayload {
    /** Peso del paquete en kilogramos */
    weight: number;

    /** Dimensiones del paquete en formato "LxAxH" (ej. "40x30x20") */
    dimensions: string;

    /** Descripción del tipo de producto a enviar */
    productType: string;

    /** Dirección completa de origen (incluye ciudad) */
    originAddress: string;

    /** Dirección completa de destino (incluye ciudad) */
    destinationAddress: string;
}
