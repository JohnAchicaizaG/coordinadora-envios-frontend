import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { Provider } from "react-redux";
import { store } from "../app/store"; // Asegúrate que la ruta es correcta

describe("DashboardLayout", () => {
    it("se renderiza correctamente sin errores", () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <DashboardLayout />
                </MemoryRouter>
            </Provider>,
        );

        const logo = screen.getAllByAltText("Logo Coordinadora");
        expect(logo.length).toBeGreaterThan(0);

        const main = screen.getByRole("main");
        expect(main).toBeInTheDocument();
    });
});
