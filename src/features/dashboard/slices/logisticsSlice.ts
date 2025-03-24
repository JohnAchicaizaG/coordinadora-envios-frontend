// src/features/dashboard/slices/logisticsSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../app/axiosConfig";
import { AxiosError } from "axios";
import { RootState } from "../../../app/store";

// 👉 Interfaces
export interface Route {
    id: number;
    name: string;
    created_at: string;
}

export interface Transporter {
    id: number;
    name: string;
    available: number;
    capacity: number;
    created_at: string;
}

// 👉 Estado inicial
interface LogisticsState {
    routes: Route[];
    transporters: Transporter[];
    loading: boolean;
    error: string | null;
}

const initialState: LogisticsState = {
    routes: [],
    transporters: [],
    loading: false,
    error: null,
};

// ✅ Thunk: Obtener rutas
export const fetchRoutes = createAsyncThunk<
    Route[],
    void,
    { rejectValue: string }
>("logistics/fetchRoutes", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get("/logistics/routes");
        return res.data.data.routes;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Error al obtener rutas",
        );
    }
});

// ✅ Thunk: Obtener transportistas
export const fetchTransporters = createAsyncThunk<
    Transporter[],
    void,
    { rejectValue: string }
>("logistics/fetchTransporters", async (_, { rejectWithValue }) => {
    try {
        const res = await axios.get("/logistics/transporters");
        return res.data.data.transporters;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Error al obtener transportistas",
        );
    }
});

// ✅ Slice
const logisticsSlice = createSlice({
    name: "logistics",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Rutas
        builder.addCase(fetchRoutes.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchRoutes.fulfilled, (state, action) => {
            state.loading = false;
            state.routes = action.payload;
        });
        builder.addCase(fetchRoutes.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al obtener rutas";
        });

        // Transportistas
        builder.addCase(fetchTransporters.pending, (state) => {
            state.loading = true;
            state.error = null;
        });
        builder.addCase(fetchTransporters.fulfilled, (state, action) => {
            state.loading = false;
            state.transporters = action.payload;
        });
        builder.addCase(fetchTransporters.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || "Error al obtener transportistas";
        });
    },
});

// ✅ Selectores
export const selectRoutes = (state: RootState) => state.logistics.routes;
export const selectTransporters = (state: RootState) =>
    state.logistics.transporters;
export const selectLogisticsLoading = (state: RootState) =>
    state.logistics.loading;
export const selectLogisticsError = (state: RootState) => state.logistics.error;

// ✅ Exporta el reducer por defecto
export default logisticsSlice.reducer;
