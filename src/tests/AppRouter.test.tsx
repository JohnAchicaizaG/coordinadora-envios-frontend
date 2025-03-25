// src/tests/AppRouter.test.tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import { AppRouter } from "../router";

vi.mock("../features/auth/pages/LoginPage", () => ({
    default: () => <div data-testid="login-page">Login Page</div>,
}));

describe("AppRouter", () => {
    it("renderiza correctamente la ruta '/' y muestra la página de login", () => {
        render(
            <Provider store={store}>
                <AppRouter />
            </Provider>,
        );

        expect(screen.getByTestId("login-page")).toBeInTheDocument();
    });
});
