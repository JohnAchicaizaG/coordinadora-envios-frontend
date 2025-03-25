import { describe, it, expect } from "vitest";
import ordersReducer, {
    fetchOrders,
} from "../features/dashboard/slices/ordersSlice";
import { OrdersState, Order } from "../features/dashboard/slices/ordersSlice";

describe("ordersSlice", () => {
    const initialState: OrdersState = {
        orders: [],
        loading: false,
        error: null,
    };

    const mockOrders: Order[] = [
        {
            orderId: 1,
            productType: "Electrónica",
            destination: "Bogotá",
            weight: "10",
            status: "pending",
            created_at: "2025-03-25T12:00:00Z",
        },
    ];

    it("should return the initial state", () => {
        expect(ordersReducer(undefined, { type: "@@INIT" })).toEqual(
            initialState,
        );
    });

    it("should handle fetchOrders.pending", () => {
        const nextState = ordersReducer(
            initialState,
            fetchOrders.pending("", undefined),
        );
        expect(nextState.loading).toBe(true);
        expect(nextState.error).toBeNull();
    });

    it("should handle fetchOrders.fulfilled", () => {
        const nextState = ordersReducer(
            initialState,
            fetchOrders.fulfilled(mockOrders, "", undefined),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.orders).toEqual(mockOrders);
    });

    it("should handle fetchOrders.rejected", () => {
        const nextState = ordersReducer(
            initialState,
            fetchOrders.rejected(
                new Error(),
                "",
                undefined,
                "Error al obtener órdenes",
            ),
        );
        expect(nextState.loading).toBe(false);
        expect(nextState.error).toBe("Error al obtener órdenes");
    });
});
