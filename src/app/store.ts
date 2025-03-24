import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";
import ordersReducer from "../features/dashboard/slices/ordersSlice";
import logisticsReducer from "../features/dashboard/slices/logisticsSlice";

/**
 * Configuración de la store principal de Redux con los reducers de la aplicación.
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        orders: ordersReducer,
        logistics: logisticsReducer,
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
