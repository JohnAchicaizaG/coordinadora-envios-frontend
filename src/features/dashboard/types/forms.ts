/**
 * Enumeración que define los roles disponibles en el sistema
 */
export enum Role {
    Admin = "admin",
    Logistics = "logistics",
    User = "user",
}

/**
 * Interfaz que define la estructura del formulario de usuario
 * @interface UserForm
 */
export interface UserForm {
    /** Correo electrónico del usuario */
    email: string;
    /** Contraseña del usuario */
    password: string;
    /** Rol asignado al usuario */
    role: Role;
}

/**
 * Interfaz que define la estructura del formulario de ruta
 * @interface RouteForm
 */
export interface RouteForm {
    /** Nombre de la ruta */
    name: string;
}

/**
 * Interfaz que define la estructura del formulario de transportador
 * @interface TransporterForm
 */
export interface TransporterForm {
    /** Nombre del transportador */
    name: string;
    /** Capacidad de carga en unidades */
    capacity: number;
    /** Estado de disponibilidad del transportador */
    available: boolean;
}
