import { describe, it, expect } from "vitest";
import authReducer, { logout, login } from "../features/auth/slices/authSlice";
import { AuthState } from "../features/auth/types/authTypes";
import { Role } from "../shared/constants/roles";

describe("authSlice", () => {
    const initialState: AuthState = {
        user: null,
        accessToken: null,
        loading: false,
        error: null,
    };

    const mockUser = {
        id: 1,
        name: "John",
        email: "john@example.com",
        role: Role.Admin,
    };

    it("should return the initial state", () => {
        expect(authReducer(undefined, { type: "@@INIT" })).toEqual(
            initialState,
        );
    });

    it("should handle login.pending", () => {
        const nextState = authReducer(
            initialState,
            login.pending("", {
                email: "john@example.com",
                password: "password",
            }),
        );
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it("should handle login.fulfilled", () => {
        const payload = {
            user: mockUser,
            accessToken: "mock-token",
        };

        const nextState = authReducer(
            initialState,
            login.fulfilled(payload, "", {
                email: "john@example.com",
                password: "password",
            }),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.user).toEqual(payload.user);
        expect(nextState.accessToken).toEqual(payload.accessToken);
    });

    it("should handle login.rejected", () => {
        const nextState = authReducer(
            initialState,
            login.rejected(
                new Error(),
                "",
                {
                    email: "john@example.com",
                    password: "password",
                },
                "Credenciales inválidas",
            ),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Credenciales inválidas");
    });

    it("should handle logout", () => {
        const loggedInState: AuthState = {
            user: mockUser,
            accessToken: "token123",
            loading: false,
            error: null,
        };

        const nextState = authReducer(loggedInState, logout());
        expect(nextState.user).toBeNull();
        expect(nextState.accessToken).toBeNull();
    });
});
