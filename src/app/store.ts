import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/slices/authSlice";

/**
 * Configuración de la store principal de Redux con los reducers de la aplicación.
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
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
