// src/tests/OrderForm.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import OrderForm from "../features/dashboard/components/OrderForm"; // Ajusta si la ruta cambia
import { MemoryRouter } from "react-router-dom";

// Mocks necesarios
vi.mock("@/features/dashboard/api/orderService", () => ({
    createOrder: vi.fn(),
}));
vi.mock("@/shared/utils/toastUtils", () => ({
    showSuccessToast: vi.fn(),
    showErrorToast: vi.fn(),
}));

describe("OrderForm", () => {
    it("debe renderizar todos los campos del formulario", () => {
        render(<OrderForm />, { wrapper: MemoryRouter });

        expect(screen.getByLabelText("Peso")).toBeInTheDocument();
        expect(screen.getByLabelText("Largo (cm)")).toBeInTheDocument();
        expect(screen.getByLabelText("Ancho (cm)")).toBeInTheDocument();
        expect(screen.getByLabelText("Alto (cm)")).toBeInTheDocument();
        expect(screen.getByLabelText("Tipo de producto")).toBeInTheDocument();
        expect(
            screen.getByLabelText("Dirección de origen (Calle, número, etc.)"),
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Ciudad de origen")).toBeInTheDocument();
        expect(
            screen.getByLabelText("Dirección (Calle, número, etc.)"),
        ).toBeInTheDocument();
        expect(screen.getByLabelText("Ciudad")).toBeInTheDocument();

        expect(
            screen.getByRole("button", { name: /crear orden/i }),
        ).toBeInTheDocument();
    });
});
