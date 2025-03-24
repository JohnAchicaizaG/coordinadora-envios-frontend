/**
 * Opciones disponibles para filtrar órdenes por estado.
 * @type {{ value: string, label: string }[]}
 */
export const statusOptions = [
    { value: "", label: "Todos" },
    { value: "pending", label: "Pendiente" },
    { value: "in_transit", label: "En tránsito" },
    { value: "delivered", label: "Entregado" },
];
