import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../app/axiosConfig";
import { RootState } from "../../../app/store";
import { AxiosError } from "axios";

export interface Order {
    orderId: number;
    productType: string;
    destination: string;
    weight: string;
    status: string;
    created_at: string;
}

interface OrdersState {
    orders: Order[];
    loading: boolean;
    error: string | null;
}

const initialState: OrdersState = {
    orders: [],
    loading: false,
    error: null,
};

// 🔄 Thunk para obtener órdenes (opcional: con filtro de estado)
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

export const selectOrders = (state: RootState) => state.orders.orders;
export const selectOrdersLoading = (state: RootState) => state.orders.loading;

export default ordersSlice.reducer;
