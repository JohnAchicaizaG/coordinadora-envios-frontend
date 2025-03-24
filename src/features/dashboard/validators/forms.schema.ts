import { z } from "zod";
import { Role } from "../types/forms";

/**
 * Esquema de validación para usuarios
 * @description Define la estructura y validaciones para los datos de usuario
 */
export const userSchema = z.object({
    email: z.string().email("Correo no válido"),
    password: z.string().min(6, "Mínimo 6 caracteres"),
    role: z.nativeEnum(Role),
});

/**
 * Esquema de validación para rutas
 * @description Define la estructura y validaciones para los datos de ruta
 */
export const routeSchema = z.object({
    name: z.string().min(1, "Nombre requerido"),
});

/**
 * Esquema de validación para transportadores
 * @description Define la estructura y validaciones para los datos de transportador
 */
export const transporterSchema = z.object({
    name: z.string().min(1, "Nombre requerido"),
    capacity: z
        .number({ invalid_type_error: "Debe ser número" })
        .positive("Debe ser mayor a 0"),
    available: z.enum(["true", "false"]).transform((val) => val === "true"),
});

// Tipos inferidos
/**
 * Tipo inferido del esquema de usuario
 */
export type UserSchema = z.infer<typeof userSchema>;

/**
 * Tipo inferido del esquema de ruta
 */
export type RouteSchema = z.infer<typeof routeSchema>;

/**
 * Tipo inferido del esquema de transportador
 */
export type TransporterSchema = z.infer<typeof transporterSchema>;
