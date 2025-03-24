import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../app/axiosConfig";
import { AxiosError } from "axios";
import { RootState } from "../../../app/store";

/**
 * @typedef {Object} Route
 * @property {number} id - Identificador único de la ruta
 * @property {string} name - Nombre de la ruta
 * @property {string} created_at - Fecha de creación de la ruta
 */
export interface Route {
    id: number;
    name: string;
    created_at: string;
}

/**
 * @typedef {Object} Transporter
 * @property {number} id - Identificador único del transportista
 * @property {string} name - Nombre del transportista
 * @property {number} available - Número de transportistas disponibles
 * @property {number} capacity - Capacidad del transportista
 * @property {string} created_at - Fecha de creación del transportista
 */
export interface Transporter {
    id: number;
    name: string;
    available: number;
    capacity: number;
    created_at: string;
}

/**
 * @typedef {Object} LogisticsState
 * @property {Route[]} routes - Lista de rutas disponibles
 * @property {Transporter[]} transporters - Lista de transportistas disponibles
 * @property {boolean} loading - Estado de carga
 * @property {string|null} error - Mensaje de error si existe
 */
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

/**
 * Thunk para obtener la lista de rutas desde el servidor
 * @returns {Promise<Route[]>} Lista de rutas
 * @throws {string} Mensaje de error si la petición falla
 */
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

/**
 * Thunk para obtener la lista de transportistas desde el servidor
 * @returns {Promise<Transporter[]>} Lista de transportistas
 * @throws {string} Mensaje de error si la petición falla
 */
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

/**
 * Slice de Redux para manejar el estado de la logística
 */
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

/**
 * Selector para obtener las rutas del estado
 * @param {RootState} state - Estado global de la aplicación
 * @returns {Route[]} Lista de rutas
 */
export const selectRoutes = (state: RootState) => state.logistics.routes;

/**
 * Selector para obtener los transportistas del estado
 * @param {RootState} state - Estado global de la aplicación
 * @returns {Transporter[]} Lista de transportistas
 */
export const selectTransporters = (state: RootState) =>
    state.logistics.transporters;

/**
 * Selector para obtener el estado de carga
 * @param {RootState} state - Estado global de la aplicación
 * @returns {boolean} Estado de carga
 */
export const selectLogisticsLoading = (state: RootState) =>
    state.logistics.loading;

/**
 * Selector para obtener el mensaje de error
 * @param {RootState} state - Estado global de la aplicación
 * @returns {string|null} Mensaje de error si existe
 */
export const selectLogisticsError = (state: RootState) => state.logistics.error;

export default logisticsSlice.reducer;
