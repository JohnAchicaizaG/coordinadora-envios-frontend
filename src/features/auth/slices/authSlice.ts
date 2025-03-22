import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest } from "../../api/authService";
import { AuthResponse, AuthState } from "../types/authTypes";
import { LoginFormData } from "../validators/loginSchema";
import { AxiosError } from "axios";

// Obtiene datos persistidos desde localStorage
const savedToken = localStorage.getItem("accessToken");
const savedUser = localStorage.getItem("authUser");

/**
 * Estado inicial del slice de autenticación.
 */
const initialState: AuthState = {
    user: savedUser ? JSON.parse(savedUser) : null,
    accessToken: savedToken || null,
    loading: false,
    error: null,
};

/**
 * Thunk asincrónico para realizar el inicio de sesión.
 *
 * Envía los datos del formulario al servicio de autenticación y maneja la respuesta.
 *
 * @param {LoginFormData} formData - Datos del formulario de inicio de sesión.
 * @returns {Promise<AuthResponse>} Datos del usuario y token de acceso.
 */
export const login = createAsyncThunk<
    AuthResponse,
    LoginFormData,
    { rejectValue: string }
>("auth/login", async (formData, { rejectWithValue }) => {
    try {
        const response = await loginRequest(formData);
        return response.data as AuthResponse;
    } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        return rejectWithValue(
            error.response?.data?.message || "Error en el login",
        );
    }
});

/**
 * Slice de autenticación que gestiona el estado de login y logout.
 */
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /**
         * Acción para cerrar sesión.
         * Limpia el estado de usuario y token, y elimina los datos del localStorage.
         *
         * @param {AuthState} state - Estado actual de autenticación.
         */
        logout(state) {
            state.user = null;
            state.accessToken = null;
            localStorage.removeItem("accessToken");
            localStorage.removeItem("authUser");
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.accessToken = action.payload.accessToken;
                state.user = action.payload.user;

                localStorage.setItem("accessToken", action.payload.accessToken);
                localStorage.setItem(
                    "authUser",
                    JSON.stringify(action.payload.user),
                );
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
