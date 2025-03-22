import { z } from "zod";

/**
 * Esquema de validación para el formulario de inicio de sesión.
 *
 * Valida que el correo sea requerido y con formato válido,
 * y que la contraseña tenga al menos 6 caracteres.
 */
export const loginSchema = z.object({
    email: z
        .string({ required_error: "El correo electrónico es obligatorio" })
        .email("Debe ser un correo válido"),
    password: z
        .string({ required_error: "La contraseña es obligatoria" })
        .min(6, "La contraseña debe tener al menos 6 caracteres"),
});

/**
 * Tipo inferido a partir del esquema de validación del login.
 */
export type LoginFormData = z.infer<typeof loginSchema>;
