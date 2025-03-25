import { describe, it, expect } from "vitest";
import { loginSchema } from "../features/auth/validators/loginSchema";

describe("loginSchema", () => {
    it("valida correctamente un formulario válido", () => {
        const result = loginSchema.safeParse({
            email: "user@example.com",
            password: "123456",
        });

        expect(result.success).toBe(true);
    });

    it("falla si el email es inválido", () => {
        const result = loginSchema.safeParse({
            email: "correo-invalido",
            password: "123456",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().email?._errors).toContain(
                "Debe ser un correo válido",
            );
        }
    });

    it("falla si la contraseña tiene menos de 6 caracteres", () => {
        const result = loginSchema.safeParse({
            email: "user@example.com",
            password: "123",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().password?._errors).toContain(
                "La contraseña debe tener al menos 6 caracteres",
            );
        }
    });

    it("falla si faltan ambos campos", () => {
        const result = loginSchema.safeParse({});

        expect(result.success).toBe(false);
        if (!result.success) {
            const formatted = result.error.format();
            expect(formatted.email?._errors).toContain(
                "El correo electrónico es obligatorio",
            );
            expect(formatted.password?._errors).toContain(
                "La contraseña es obligatoria",
            );
        }
    });
});
