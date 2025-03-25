/**
 * @fileoverview Página de reportes que muestra estadísticas y métricas de órdenes de transporte.
 * Incluye gráficos, tablas y filtros para analizar el rendimiento de transportistas y rutas.
 */

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import {
    Box,
    Typography,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    setFilters,
    fetchReportData,
    selectReportFilters,
    selectReportLoading,
    selectReportResults,
    resetFilters,
    selectReportMetrics,
} from "../slices/filtersSlice";
import {
    fetchRoutes,
    fetchTransporters,
    selectRoutes,
    selectTransporters,
} from "../slices/logisticsSlice";

/**
 * @component ReportsPage
 * @description Componente principal que renderiza la página de reportes con gráficos y tablas de métricas.
 * Permite filtrar y visualizar datos de órdenes de transporte, incluyendo:
 * - Gráfico de barras de órdenes por estado
 * - Tabla de métricas de transportistas
 * - Tabla detallada de órdenes
 * - Filtros para estado, ruta, transportista y fechas
 *
 * @returns {JSX.Element} Componente de página de reportes
 *
 * @example
 * return (
 *   <ReportsPage />
 * )
 */
export default function ReportsPage() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectReportFilters);
    const loading = useAppSelector(selectReportLoading);
    const results = useAppSelector(selectReportResults);
    const routes = useAppSelector(selectRoutes);
    const transporters = useAppSelector(selectTransporters);
    const metrics = useAppSelector(selectReportMetrics);

    /**
     * @function handleChange
     * @description Maneja los cambios en los filtros del formulario
     * @param {keyof typeof filters} field - Campo del filtro a actualizar
     * @param {string} value - Nuevo valor para el campo
     */
    const handleChange = (field: keyof typeof filters, value: string) => {
        dispatch(setFilters({ ...filters, [field]: value }));
    };

    /**
     * @function handleApplyFilters
     * @description Aplica los filtros actuales y actualiza los datos del reporte
     */
    const handleApplyFilters = () => {
        dispatch(fetchReportData(filters));
    };

    /**
     * @function handleReset
     * @description Reinicia todos los filtros a sus valores iniciales y actualiza los datos
     */
    const handleReset = () => {
        dispatch(resetFilters());
        dispatch(
            fetchReportData({
                status: "",
                routeId: "",
                transporterId: "",
                startDate: "",
                endDate: "",
            }),
        );
    };

    /**
     * @function ordersByStatus
     * @description Calcula el número de órdenes por cada estado
     * @returns {Record<string, number>} Objeto con el conteo de órdenes por estado
     */
    const ordersByStatus = results.reduce<Record<string, number>>(
        (acc, order) => {
            acc[order.status] = (acc[order.status] || 0) + 1;
            return acc;
        },
        {},
    );

    const chartData = Object.entries(ordersByStatus).map(([status, count]) => ({
        status: status.replace("_", " "),
        count,
    }));

    useEffect(() => {
        dispatch(fetchReportData(filters));
        dispatch(fetchRoutes());
        dispatch(fetchTransporters());
    }, [dispatch]);

    return (
        <Box className="px-4 py-6 max-w-7xl mx-auto space-y-6">
            <Typography variant="h5" className="font-bold text-orange-500">
                Reporte Avanzado de Órdenes
            </Typography>

            <Paper className="p-6 rounded-xl shadow-md space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <FormControl fullWidth>
                        <InputLabel>Estado</InputLabel>
                        <Select
                            value={filters.status}
                            label="Estado"
                            onChange={(e) =>
                                handleChange("status", e.target.value)
                            }
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="pending">Pendiente</MenuItem>
                            <MenuItem value="in_transit">En tránsito</MenuItem>
                            <MenuItem value="delivered">Entregado</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Ruta</InputLabel>
                        <Select
                            value={filters.routeId}
                            label="Ruta"
                            onChange={(e) =>
                                handleChange("routeId", e.target.value)
                            }
                        >
                            <MenuItem value="">Todas</MenuItem>
                            {routes.map((r) => (
                                <MenuItem key={r.id} value={r.id}>
                                    {r.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth>
                        <InputLabel>Transportista</InputLabel>
                        <Select
                            value={filters.transporterId}
                            label="Transportista"
                            onChange={(e) =>
                                handleChange("transporterId", e.target.value)
                            }
                        >
                            <MenuItem value="">Todos</MenuItem>
                            {transporters.map((t) => (
                                <MenuItem key={t.id} value={t.id}>
                                    {t.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Fecha Inicio"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.startDate}
                        onChange={(e) =>
                            handleChange("startDate", e.target.value)
                        }
                    />

                    <TextField
                        label="Fecha Fin"
                        fullWidth
                        type="date"
                        InputLabelProps={{ shrink: true }}
                        value={filters.endDate}
                        onChange={(e) =>
                            handleChange("endDate", e.target.value)
                        }
                    />
                </div>

                <div className="flex flex-col md:flex-row md:items-center">
                    <Button
                        variant="contained"
                        color="primary"
                        className="w-full md:w-fit"
                        onClick={handleApplyFilters}
                        sx={{
                            mr: { xs: 0, sm: "1rem" },
                            mb: { xs: "0.75rem", sm: 0 },
                        }}
                    >
                        Aplicar Filtros
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        className="w-full md:w-fit"
                        onClick={handleReset}
                    >
                        Reiniciar Filtros
                    </Button>
                </div>
            </Paper>

            <Box className="mt-10">
                <Typography
                    variant="h6"
                    className="mb-4 font-semibold text-gray-800"
                >
                    Gráfico: Órdenes por Estado
                </Typography>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="status" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="count" fill="#f97316" />
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            {metrics.length > 0 && (
                <Box className="mt-10">
                    <Typography
                        variant="h6"
                        className="mb-4 font-semibold text-gray-800"
                    >
                        Métricas de Transportistas
                    </Typography>
                    <Paper className="overflow-x-auto rounded-xl shadow-md">
                        <TableContainer>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Transportista</TableCell>
                                        <TableCell>
                                            Órdenes Entregadas
                                        </TableCell>
                                        <TableCell>
                                            Tiempo Promedio (min)
                                        </TableCell>
                                        <TableCell>
                                            Tiempo Promedio (hrs)
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {metrics.map((metric) => (
                                        <TableRow key={metric.transporterId}>
                                            <TableCell>
                                                {metric.transporterName}
                                            </TableCell>
                                            <TableCell>
                                                {metric.deliveredCount}
                                            </TableCell>
                                            <TableCell>
                                                {metric.avgDeliveryTimeMinutes}
                                            </TableCell>
                                            <TableCell>
                                                {metric.averageDeliveryTimeHours.toFixed(
                                                    2,
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Paper>
                </Box>
            )}
            <Typography
                variant="h6"
                className="mb-4 font-semibold text-gray-800"
            >
                Órdenes Generales
            </Typography>
            <Paper className="rounded-xl shadow-md overflow-hidden">
                {loading ? (
                    <Box className="flex justify-center py-10">
                        <CircularProgress />
                    </Box>
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Origen</TableCell>
                                    <TableCell>Destino</TableCell>
                                    <TableCell>Producto</TableCell>
                                    <TableCell>Peso</TableCell>
                                    <TableCell>Dimensiones</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Transportista</TableCell>
                                    <TableCell>Ruta</TableCell>
                                    <TableCell>Fecha</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {results.map((order) => (
                                    <TableRow key={order.orderId}>
                                        <TableCell>{order.orderId}</TableCell>
                                        <TableCell>
                                            {order.originAddress || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {order.destination}
                                        </TableCell>
                                        <TableCell>
                                            {order.productType}
                                        </TableCell>
                                        <TableCell>{order.weight} kg</TableCell>
                                        <TableCell>
                                            {order.dimensions}
                                        </TableCell>
                                        <TableCell className="capitalize">
                                            {order.status.replace("_", " ")}
                                        </TableCell>
                                        <TableCell>
                                            {order.transporterName || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {order.routeName || "-"}
                                        </TableCell>
                                        <TableCell>
                                            {dayjs(order.created_at).format(
                                                "YYYY-MM-DD HH:mm",
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
}
