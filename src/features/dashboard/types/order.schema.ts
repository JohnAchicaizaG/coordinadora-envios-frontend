import { z } from "zod";

/**
 * Esquema de validación para crear una orden de envío.
 */
export const createOrderSchema = z.object({
    weight: z.coerce.number().positive("Debe ser un número positivo"),
    length: z.coerce.number().positive("Largo inválido"),
    width: z.coerce.number().positive("Ancho inválido"),
    height: z.coerce.number().positive("Alto inválido"),
    productType: z.string().min(2, "Requiere tipo de producto"),
    address: z.string().min(5, "Dirección muy corta"),
    city: z.string().min(2, "Ciudad requerida"),
    originStreet: z.string().min(5, "Dirección de origen muy corta"),
    originCity: z.string().min(2, "Ciudad de origen requerida"),
});
/**
 * Tipo inferido a partir del esquema de validación de creación de orden.
 */
export type CreateOrderForm = z.infer<typeof createOrderSchema>;
