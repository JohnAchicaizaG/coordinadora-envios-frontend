import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import ordersReducer from "../features/dashboard/slices/ordersSlice";
import logisticsReducer from "../features/dashboard/slices/logisticsSlice";
import filtersReducer from "../features/dashboard/slices/filtersSlice";

/**
 * Configuración de la store principal de Redux con los reducers de la aplicación.
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        logistics: logisticsReducer,
        filters: filtersReducer,
    },
});

/**
 * Tipo que representa el estado global de la aplicación.
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Tipo que representa el `dispatch` tipado de la aplicación.
 */
export type AppDispatch = typeof store.dispatch;
