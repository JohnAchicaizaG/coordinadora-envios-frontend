/**
 * @interface ReportOrder
 * @description Representa un pedido de reporte con sus detalles de transporte
 * @property {number} orderId - Identificador único del pedido
 * @property {string} originAddress - Dirección de origen del pedido
 * @property {string} weight - Peso del pedido
 * @property {string} dimensions - Dimensiones del pedido
 * @property {string} productType - Tipo de producto
 * @property {string} destination - Dirección de destino
 * @property {string} status - Estado actual del pedido
 * @property {string} created_at - Fecha y hora de creación
 * @property {string|null} routeName - Nombre de la ruta asignada
 * @property {string|null} transporterName - Nombre del transportador asignado
 */
export interface ReportOrder {
    orderId: number;
    originAddress: string;
    weight: string;
    dimensions: string;
    productType: string;
    destination: string;
    status: string;
    created_at: string;
    routeName: string | null;
    transporterName: string | null;
}

/**
 * @interface FiltersState
 * @description Estado que contiene los filtros y resultados de búsqueda de pedidos
 * @property {Object} filters - Objeto que contiene los filtros de búsqueda
 * @property {string} filters.status - Estado para filtrar
 * @property {string} filters.routeId - ID de la ruta para filtrar
 * @property {string} filters.transporterId - ID del transportador para filtrar
 * @property {string} filters.startDate - Fecha de inicio para filtrar
 * @property {string} filters.endDate - Fecha de fin para filtrar
 * @property {ReportOrder[]} results - Array de resultados filtrados
 * @property {TransporterMetric[]} metrics - Métricas de los transportadores
 * @property {boolean} loading - Estado de carga
 * @property {string|null} error - Mensaje de error si existe
 */
export interface FiltersState {
    filters: {
        status: string;
        routeId: string;
        transporterId: string;
        startDate: string;
        endDate: string;
    };
    results: ReportOrder[];
    metrics: TransporterMetric[];
    loading: boolean;
    error: string | null;
}

/**
 * @interface TransporterMetric
 * @description Métricas y estadísticas de un transportador
 * @property {number} transporterId - ID del transportador
 * @property {string} transporterName - Nombre del transportador
 * @property {number} deliveredCount - Número de entregas realizadas
 * @property {number} avgDeliveryTimeMinutes - Tiempo promedio de entrega en minutos
 * @property {number} averageDeliveryTimeHours - Tiempo promedio de entrega en horas
 * @property {number} totalDeliveredOrders - Total de pedidos entregados
 */
export interface TransporterMetric {
    transporterId: number;
    transporterName: string;
    deliveredCount: number;
    avgDeliveryTimeMinutes: number;
    averageDeliveryTimeHours: number;
    totalDeliveredOrders: number;
}
