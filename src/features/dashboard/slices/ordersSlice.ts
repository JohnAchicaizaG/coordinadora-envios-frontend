/**
 * @fileoverview Slice de Redux para manejar el estado de las órdenes
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../app/axiosConfig";
import { RootState } from "../../../app/store";
import { AxiosError } from "axios";

/**
 * @typedef {Object} Order
 * @property {number} orderId - Identificador único de la orden
 * @property {string} productType - Tipo de producto
 * @property {string} destination - Destino de la orden
 * @property {string} weight - Peso del producto
 * @property {string} status - Estado actual de la orden
 * @property {string} created_at - Fecha de creación de la orden
 */
export interface Order {
    orderId: number;
    productType: string;
    destination: string;
    weight: string;
    status: string;
    created_at: string;
}

/**
 * @typedef {Object} OrdersState
 * @property {Order[]} orders - Lista de órdenes
 * @property {boolean} loading - Estado de carga
 * @property {string|null} error - Mensaje de error si existe
 */
export interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
};

/**
 * Thunk para obtener órdenes del servidor
 * @param {string|undefined} status - Filtro opcional por estado de la orden
 * @returns {Promise<Order[]>} Lista de órdenes
 * @throws {string} Mensaje de error si la petición falla
 */
export const fetchOrders = createAsyncThunk<
    Order[],
    string | undefined,
    { rejectValue: string }
>("orders/fetchAll", async (status, { rejectWithValue }) => {
    try {
        const url = status ? `/orders/admin?status=${status}` : "/orders/admin";

        const response = await axios.get(url);
        return response.data.data.orders;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Error al obtener órdenes",
        );
    }
});

/**
 * Slice de Redux para manejar el estado de las órdenes
 */
const ordersSlice = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload;
            })
            .addCase(fetchOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

/**
 * Selector para obtener la lista de órdenes
 * @param {RootState} state - Estado global de Redux
 * @returns {Order[]} Lista de órdenes
 */
export const selectOrders = (state: RootState) => state.orders.orders;

/**
 * Selector para obtener el estado de carga
 * @param {RootState} state - Estado global de Redux
 * @returns {boolean} Estado de carga
 */
export const selectOrdersLoading = (state: RootState) => state.orders.loading;

export default ordersSlice.reducer;
