import { describe, it, expect } from "vitest";
import {
    userSchema,
    routeSchema,
    transporterSchema,
} from "../features/dashboard/validators/forms.schema";
import { Role } from "../shared/constants/roles";

describe("userSchema", () => {
    it("valida un usuario válido", () => {
        const result = userSchema.safeParse({
            email: "admin@example.com",
            password: "secret123",
            role: Role.Admin,
        });

        expect(result.success).toBe(true);
    });

    it("falla con correo inválido", () => {
        const result = userSchema.safeParse({
            email: "no-es-correo",
            password: "secret123",
            role: Role.Admin,
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().email?._errors).toContain(
                "Correo no válido",
            );
        }
    });

    it("falla si contraseña es muy corta", () => {
        const result = userSchema.safeParse({
            email: "admin@example.com",
            password: "123",
            role: Role.Admin,
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().password?._errors).toContain(
                "Mínimo 6 caracteres",
            );
        }
    });

    it("falla si el rol no es válido", () => {
        const result = userSchema.safeParse({
            email: "admin@example.com",
            password: "secret123",
            role: "invalid-role",
        });

        expect(result.success).toBe(false);
    });
});

describe("routeSchema", () => {
    it("valida una ruta válida", () => {
        const result = routeSchema.safeParse({ name: "Ruta 1" });
        expect(result.success).toBe(true);
    });

    it("falla si el nombre está vacío", () => {
        const result = routeSchema.safeParse({ name: "" });
        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().name?._errors).toContain(
                "Nombre requerido",
            );
        }
    });
});

describe("transporterSchema", () => {
    it("valida un transportador válido", () => {
        const result = transporterSchema.safeParse({
            name: "Camión 1",
            capacity: 1000,
            available: "true",
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.available).toBe(true);
        }
    });

    it("falla si el nombre está vacío", () => {
        const result = transporterSchema.safeParse({
            name: "",
            capacity: 1000,
            available: "true",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().name?._errors).toContain(
                "Nombre requerido",
            );
        }
    });

    it("falla si la capacidad no es número", () => {
        const result = transporterSchema.safeParse({
            name: "Camión",
            capacity: "no-es-numero",
            available: "true",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().capacity?._errors).toContain(
                "Debe ser número",
            );
        }
    });

    it("falla si la capacidad es negativa", () => {
        const result = transporterSchema.safeParse({
            name: "Camión",
            capacity: -5,
            available: "true",
        });

        expect(result.success).toBe(false);
        if (!result.success) {
            expect(result.error.format().capacity?._errors).toContain(
                "Debe ser mayor a 0",
            );
        }
    });

    it("transforma available a boolean true", () => {
        const result = transporterSchema.safeParse({
            name: "Camión",
            capacity: 500,
            available: "true",
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.available).toBe(true);
        }
    });

    it("transforma available a boolean false", () => {
        const result = transporterSchema.safeParse({
            name: "Camión",
            capacity: 500,
            available: "false",
        });

        expect(result.success).toBe(true);
        if (result.success) {
            expect(result.data.available).toBe(false);
        }
    });
});
