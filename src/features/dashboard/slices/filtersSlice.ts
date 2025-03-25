/**
 * @fileoverview Módulo que maneja el estado y las acciones relacionadas con los filtros del dashboard.
 * Este módulo incluye la lógica para filtrar reportes de pedidos y métricas de transportistas.
 * @module features/dashboard/slices/filtersSlice
 */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../app/axiosConfig";
import { RootState } from "../../../app/store";
import { AxiosError } from "axios";
import {
    FiltersState,
    ReportOrder,
    TransporterMetric,
} from "../types/transporterMetric";

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
    metrics: [],
    loading: false,
    error: null,
};

/**
 * Thunk para obtener datos del reporte basado en los filtros proporcionados
 * @param {FiltersState['filters']} filters - Objeto con los filtros de búsqueda
 * @param {Object} thunkAPI - API de Redux Toolkit
 * @returns {Promise<{orders: ReportOrder[], metrics: TransporterMetric[]}>} Objeto con pedidos filtrados y métricas
 * @throws {string} Mensaje de error si la petición falla
 */
export const fetchReportData = createAsyncThunk<
    { orders: ReportOrder[]; metrics: TransporterMetric[] },
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
 * @type {Slice}
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
                state.results = action.payload.orders;
                state.metrics = action.payload.metrics;
            })
            .addCase(fetchReportData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || "Error desconocido";
            });
    },
});

/**
 * Acciones del slice de filtros
 * @type {Object}
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

/**
 * Selector para obtener las métricas de transportistas
 * @param {RootState} state - Estado global de Redux
 * @returns {TransporterMetric[]} Array de métricas de transportistas
 */
export const selectReportMetrics = (state: RootState) => state.filters.metrics;

export default filtersSlice.reducer;
