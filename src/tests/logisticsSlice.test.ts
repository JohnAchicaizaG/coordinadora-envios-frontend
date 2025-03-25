import { describe, it, expect } from "vitest";
import logisticsReducer from "../features/dashboard/slices/logisticsSlice";
import {
    fetchRoutes,
    fetchTransporters,
} from "../features/dashboard/slices/logisticsSlice";

const initialState = {
    routes: [],
    transporters: [],
    loading: false,
    error: null,
};

describe("logisticsSlice", () => {
    it("should return the initial state", () => {
        expect(logisticsReducer(undefined, { type: "@@INIT" })).toEqual(
            initialState,
        );
    });

    it("should handle fetchRoutes.pending", () => {
        const nextState = logisticsReducer(
            initialState,
            fetchRoutes.pending(""),
        );
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it("should handle fetchRoutes.fulfilled", () => {
        const routesPayload = [
            { id: 1, name: "Ruta 1", created_at: "2024-01-01" },
        ];
        const nextState = logisticsReducer(
            initialState,
            fetchRoutes.fulfilled(routesPayload, ""),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.routes).toEqual(routesPayload);
    });

    it("should handle fetchRoutes.rejected", () => {
        const nextState = logisticsReducer(
            initialState,
            fetchRoutes.rejected(null, "", undefined, "Error al obtener rutas"),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Error al obtener rutas");
    });

    it("should handle fetchTransporters.pending", () => {
        const nextState = logisticsReducer(
            initialState,
            fetchTransporters.pending(""),
        );
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it("should handle fetchTransporters.fulfilled", () => {
        const transportersPayload = [
            {
                id: 1,
                name: "Juan Pérez",
                available: 5,
                capacity: 100,
                created_at: "2024-01-01",
            },
        ];
        const nextState = logisticsReducer(
            initialState,
            fetchTransporters.fulfilled(transportersPayload, ""),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.transporters).toEqual(transportersPayload);
    });

    it("should handle fetchTransporters.rejected", () => {
        const nextState = logisticsReducer(
            initialState,
            fetchTransporters.rejected(
                null,
                "",
                undefined,
                "Error al obtener transportistas",
            ),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Error al obtener transportistas");
    });
});
