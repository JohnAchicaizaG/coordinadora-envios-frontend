/**
 * Enum que define los roles disponibles en el sistema
 * @enum {string}
 */
export enum Role {
    /** Rol de administrador con acceso total al sistema */
    Admin = "admin",
    /** Rol de logística con acceso a operaciones de logística */
    Logistics = "logistics",
    /** Rol de usuario con acceso básico al sistema */
    User = "user",
}
