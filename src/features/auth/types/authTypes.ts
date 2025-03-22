import { Role } from "../../../shared/constants/roles";

/**
 * Representa la información del usuario autenticado.
 */
export interface AuthUser {
    id: number;
    email: string;
    role: Role;
}

/**
 * Respuesta esperada del backend al iniciar sesión.
 */
export interface AuthResponse {
    user: AuthUser;
    accessToken: string;
}

/**
 * Estado del slice de autenticación en Redux.
 */
export interface AuthState {
    user: AuthUser | null;
    accessToken: string | null;
    loading: boolean;
    error: string | null;
}
