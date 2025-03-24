// src/features/dashboard/slices/filtersSlice.ts

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../app/axiosConfig";
import { RootState } from "../../../app/store";
import { AxiosError } from "axios";

/**
 * @typedef {Object} ReportOrder
 * @property {number} orderId - ID único del pedido
 * @property {string} originAddress - Dirección de origen del pedido
 * @property {string} weight - Peso del pedido
 * @property {string} dimensions - Dimensiones del pedido
 * @property {string} productType - Tipo de producto
 * @property {string} destination - Destino del pedido
 * @property {string} status - Estado actual del pedido
 * @property {string} created_at - Fecha de creación del pedido
 * @property {string|null} routeName - Nombre de la ruta asignada
 * @property {string|null} transporterName - Nombre del transportador asignado
 */
export interface ReportOrder {
    orderId: number;
    originAddress: string;
    weight: string;
    dimensions: string;
    productType: string;
    destination: string;
    status: string;
    created_at: string;
    routeName: string | null;
    transporterName: string | null;
}

/**
 * @typedef {Object} FiltersState
 * @property {Object} filters - Objeto que contiene los filtros de búsqueda
 * @property {string} filters.status - Estado para filtrar
 * @property {string} filters.routeId - ID de la ruta para filtrar
 * @property {string} filters.transporterId - ID del transportador para filtrar
 * @property {string} filters.startDate - Fecha de inicio para filtrar
 * @property {string} filters.endDate - Fecha de fin para filtrar
 * @property {ReportOrder[]} results - Array de resultados filtrados
 * @property {boolean} loading - Estado de carga
 * @property {string|null} error - Mensaje de error si existe
 */
export interface FiltersState {
    filters: {
        status: string;
        routeId: string;
        transporterId: string;
        startDate: string;
        endDate: string;
    };
    results: ReportOrder[];
    loading: boolean;
    error: string | null;
}

/**
 * Estado inicial del slice de filtros
 * @type {FiltersState}
 */
const initialState: FiltersState = {
    filters: {
        status: "",
        routeId: "",
        transporterId: "",
        startDate: "",
        endDate: "",
    },
    results: [],
    loading: false,
    error: null,
};

/**
 * Thunk para obtener datos del reporte basado en los filtros proporcionados
 * @param {FiltersState['filters']} filters - Objeto con los filtros de búsqueda
 * @param {Object} thunkAPI - API de Redux Toolkit
 * @returns {Promise<ReportOrder[]>} Array de pedidos filtrados
 * @throws {string} Mensaje de error si la petición falla
 */
export const fetchReportData = createAsyncThunk<
    ReportOrder[],
    FiltersState["filters"],
    { rejectValue: string }
>("filters/fetchReportData", async (filters, { rejectWithValue }) => {
    try {
        const query = new URLSearchParams(filters).toString();
        const res = await axios.get(`/orders/report/advanced?${query}`);
        return res.data.data.orders;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data.message || "Error al obtener reporte",
        );
    }
});

/**
 * Slice de Redux para manejar el estado de los filtros y resultados del reporte
 */
const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        resetFilters: (state) => {
            state.filters = initialState.filters;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReportData.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchReportData.fulfilled, (state, action) => {
                state.loading = false;
                state.results = action.payload;
            })
            .addCase(fetchReportData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

/**
 * Acciones del slice de filtros
 */
export const { setFilters, resetFilters } = filtersSlice.actions;

/**
 * Selector para obtener los filtros actuales
 * @param {RootState} state - Estado global de Redux
 * @returns {FiltersState['filters']} Objeto con los filtros actuales
 */
export const selectReportFilters = (state: RootState) => state.filters.filters;

/**
 * Selector para obtener los resultados del reporte
 * @param {RootState} state - Estado global de Redux
 * @returns {ReportOrder[]} Array de resultados filtrados
 */
export const selectReportResults = (state: RootState) => state.filters.results;

/**
 * Selector para obtener el estado de carga
 * @param {RootState} state - Estado global de Redux
 * @returns {boolean} Estado de carga
 */
export const selectReportLoading = (state: RootState) => state.filters.loading;

export default filtersSlice.reducer;
