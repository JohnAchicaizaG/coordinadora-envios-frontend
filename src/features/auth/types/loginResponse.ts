import { Role } from "../../../shared/constants/roles";

/**
 * Interfaz que representa la información del usuario en la respuesta del login
 */
export interface LoginUser {
    id: number;
    email: string;
    role: Role;
}

/**
 * Interfaz que representa los datos de la respuesta del login
 */
export interface LoginData {
    user: LoginUser;
    accessToken: string;
}

/**
 * Interfaz que representa la respuesta completa del login
 */
export interface LoginResponse {
    success: boolean;
    message: string;
    data: LoginData;
}
