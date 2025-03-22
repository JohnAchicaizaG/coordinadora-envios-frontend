/**
 * Enumeración de roles disponibles en el sistema.
 *
 * @enum {string}
 * @property {string} User - Rol de usuario estándar.
 * @property {string} Admin - Rol de administrador general.
 * @property {string} AdminLogistics - Rol de administrador logístico.
 */
export enum Role {
    User = "user",
    Admin = "admin",
    AdminLogistics = "logistics",
}
