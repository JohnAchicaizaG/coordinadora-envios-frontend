import { describe, it, expect } from "vitest";
import filtersReducer, {
    setFilters,
    resetFilters,
    fetchReportData,
} from "../features/dashboard/slices/filtersSlice";
import {
    FiltersState,
    ReportOrder,
    TransporterMetric,
} from "../features/dashboard/types/transporterMetric";

describe("filtersSlice", () => {
    const initialState: FiltersState = {
        filters: {
            status: "",
            routeId: "",
            transporterId: "",
            startDate: "",
            endDate: "",
        },
        results: [],
        metrics: [],
        loading: false,
        error: null,
    };

    const sampleOrder: ReportOrder = {
        orderId: 1,
        originAddress: "Bogotá",
        destination: "Cali",
        productType: "Libros",
        weight: "10",
        dimensions: "10x10x10",
        status: "delivered",
        created_at: "2025-03-22T10:00:00Z",
        routeName: "Ruta Norte",
        transporterName: "Juan",
    };

    const sampleMetric: TransporterMetric = {
        transporterId: 2,
        transporterName: "Juan",
        deliveredCount: 1,
        avgDeliveryTimeMinutes: 100,
        averageDeliveryTimeHours: 1.66,
        totalDeliveredOrders: 1,
    };

    const sampleFilters: FiltersState["filters"] = {
        status: "delivered",
        routeId: "2",
        transporterId: "3",
        startDate: "2025-03-01",
        endDate: "2025-03-31",
    };

    it("debería retornar el estado inicial", () => {
        expect(filtersReducer(undefined, { type: "@@INIT" })).toEqual(
            initialState,
        );
    });

    it("debería manejar setFilters", () => {
        const nextState = filtersReducer(
            initialState,
            setFilters(sampleFilters),
        );
        expect(nextState.filters).toEqual(sampleFilters);
    });

    it("debería manejar resetFilters", () => {
        const customState: FiltersState = {
            ...initialState,
            filters: sampleFilters,
        };
        const nextState = filtersReducer(customState, resetFilters());
        expect(nextState.filters).toEqual(initialState.filters);
    });

    it("debería manejar fetchReportData.pending", () => {
        const action = { type: fetchReportData.pending.type };
        const nextState = filtersReducer(initialState, action);
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it("debería manejar fetchReportData.fulfilled", () => {
        const payload = { orders: [sampleOrder], metrics: [sampleMetric] };
        const action = {
            type: fetchReportData.fulfilled.type,
            payload,
        };
        const nextState = filtersReducer(initialState, action);
        expect(nextState.loading).toBe(false);
        expect(nextState.results).toEqual([sampleOrder]);
        expect(nextState.metrics).toEqual([sampleMetric]);
    });

    it("debería manejar fetchReportData.rejected", () => {
        const action = {
            type: fetchReportData.rejected.type,
            payload: "Error personalizado",
        };
        const nextState = filtersReducer(initialState, action);
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Error personalizado");
    });
});
