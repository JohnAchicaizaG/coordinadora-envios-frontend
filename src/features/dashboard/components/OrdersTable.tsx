/**
 * @fileoverview Componente que maneja la visualización y gestión de órdenes en una tabla.
 * Permite filtrar órdenes por estado, asignar rutas y transportistas, y actualizar el estado de las órdenes.
 *
 * @module OrdersTable
 */

import {
    SelectChangeEvent,
    Box,
    Typography,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    CircularProgress,
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { statusOptions } from "../../../shared/constants/statusOption";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import {
    selectRoutes,
    selectTransporters,
    selectLogisticsLoading,
    fetchRoutes,
    fetchTransporters,
} from "../slices/logisticsSlice";
import {
    selectOrders,
    selectOrdersLoading,
    fetchOrders,
} from "../slices/ordersSlice";
import { assignOrder, updateOrderStatus } from "../api/orderService";
import {
    showErrorToast,
    showSuccessToast,
} from "../../../shared/utils/toastUtils";

/**
 * Componente principal que renderiza una tabla de órdenes con funcionalidades de gestión.
 *
 * @component
 * @example
 * ```tsx
 * <OrdersTable />
 * ```
 *
 * @returns {JSX.Element} Tabla de órdenes con controles de gestión
 *
 * @features
 * - Filtrado de órdenes por estado
 * - Asignación de rutas y transportistas
 * - Actualización de estado de órdenes
 * - Validación de capacidad de transportistas
 * - Interfaz de usuario con Material-UI
 */
export default function OrdersTable() {
    const dispatch = useAppDispatch();

    const orders = useAppSelector(selectOrders);
    const ordersLoading = useAppSelector(selectOrdersLoading);
    const routes = useAppSelector(selectRoutes);
    const transporters = useAppSelector(selectTransporters);
    const logisticsLoading = useAppSelector(selectLogisticsLoading);

    /**
     * Estado para el filtro de estado de órdenes
     * @type {string}
     */
    const [statusFilter, setStatusFilter] = useState("");

    /**
     * Estado para controlar la visibilidad del modal de asignación
     * @type {boolean}
     */
    const [openModal, setOpenModal] = useState(false);

    /**
     * ID de la orden seleccionada para asignación
     * @type {number | null}
     */
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

    /**
     * ID de la ruta seleccionada para asignación
     * @type {number | ""}
     */
    const [selectedRouteId, setSelectedRouteId] = useState<number | "">("");

    /**
     * ID del transportista seleccionado para asignación
     * @type {number | ""}
     */
    const [selectedTransporterId, setSelectedTransporterId] = useState<
        number | ""
    >("");

    /**
     * Peso de la orden seleccionada
     * @type {number}
     */
    const [selectedWeight, setSelectedWeight] = useState<number>(0);

    /**
     * ID de la orden para actualización de estado
     * @type {string}
     */
    const [orderId, setOrderId] = useState("");

    /**
     * Nuevo estado a asignar a la orden
     * @type {string}
     */
    const [status, setStatus] = useState("");

    const selectedTransporter = transporters.find(
        (t) => t.id === selectedTransporterId,
    );
    const exceedsCapacity =
        selectedTransporter && selectedWeight > selectedTransporter.capacity;

    /**
     * Efecto para cargar datos iniciales
     * Carga órdenes, rutas y transportistas al montar el componente
     */
    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchRoutes());
        dispatch(fetchTransporters());
    }, [dispatch]);

    /**
     * Maneja el cambio en el filtro de estado de las órdenes.
     *
     * @param {SelectChangeEvent<string>} event - Evento del cambio de selección
     */
    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        const selectedStatus = event.target.value;
        setStatusFilter(selectedStatus);
        dispatch(fetchOrders(selectedStatus));
    };

    /**
     * Asigna una orden a una ruta y transportista específicos.
     * Realiza validaciones de capacidad y datos requeridos antes de la asignación.
     *
     * @async
     * @throws {Error} Si faltan datos requeridos o si el peso excede la capacidad
     */
    const handleAssignOrder = async () => {
        if (!selectedOrderId || !selectedRouteId || !selectedTransporterId) {
            showErrorToast("Faltan datos para asignar la orden");
            return;
        }

        if (exceedsCapacity) {
            showErrorToast("El peso excede la capacidad del transportista");
            return;
        }

        try {
            await assignOrder({
                orderId: selectedOrderId,
                routeId: selectedRouteId,
                transporterId: selectedTransporterId,
            });

            showSuccessToast("Orden asignada con éxito ✅");

            setOpenModal(false);
            setSelectedRouteId("");
            setSelectedTransporterId("");
            dispatch(fetchOrders(statusFilter));
        } catch (err) {
            console.error("Error al asignar orden", err);
            showErrorToast("Error al asignar la orden ❌");
        }
    };

    /**
     * Actualiza el estado de una orden específica.
     *
     * @async
     * @throws {Error} Si faltan datos requeridos o si hay un error en la actualización
     */
    const handleSubmit = async () => {
        if (!orderId || !status) return alert("Completa ambos campos");

        try {
            await updateOrderStatus(Number(orderId), status);
            showSuccessToast("Estado actualizado con éxito ✅");
            setOrderId("");
            setStatus("");
            dispatch(fetchOrders(statusFilter));
        } catch (err) {
            console.error("Error al actualizar estado", err);
            showErrorToast("Error al actualizar el estado ❌");
        }
    };

    return (
        <Box className="mt-10">
            <Typography
                variant="h6"
                className="mb-4 font-semibold text-gray-800"
            >
                Todas las órdenes registradas
            </Typography>

            <FormControl fullWidth className="mb-6">
                <InputLabel>Filtrar por estado</InputLabel>
                <Select
                    value={statusFilter}
                    onChange={handleFilterChange}
                    label="Filtrar por estado"
                >
                    {statusOptions.map((opt) => (
                        <MenuItem key={opt.value} value={opt.value}>
                            {opt.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            {ordersLoading || logisticsLoading ? (
                <Box className="flex justify-center py-10">
                    <CircularProgress />
                </Box>
            ) : (
                <TableContainer
                    component={Paper}
                    className="shadow-md rounded-xl"
                >
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Producto</TableCell>
                                <TableCell>Destino</TableCell>
                                <TableCell>Peso</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {orders.map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.productType}</TableCell>
                                    <TableCell>{order.destination}</TableCell>
                                    <TableCell>{order.weight} kg</TableCell>
                                    <TableCell className="capitalize">
                                        {order.status.replace("_", " ")}
                                    </TableCell>
                                    <TableCell>
                                        <IconButton
                                            color="primary"
                                            onClick={() => {
                                                setSelectedOrderId(
                                                    order.orderId,
                                                );
                                                setSelectedWeight(
                                                    Number(order.weight),
                                                );
                                                setSelectedRouteId("");
                                                setSelectedTransporterId("");
                                                setOpenModal(true);
                                            }}
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            {/* Cambiar estado de una orden */}
            <Paper className="mt-10 p-6 rounded-xl shadow-md space-y-4">
                <Typography
                    variant="h6"
                    className="font-semibold text-gray-800"
                >
                    Cambiar Estado de Orden 🚚
                </Typography>

                <FormControl fullWidth className="mb-4">
                    <InputLabel>ID de la Orden</InputLabel>
                    <Select
                        value={orderId}
                        label="ID de la Orden"
                        onChange={(e) => setOrderId(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    >
                        {orders.map((o) => (
                            <MenuItem key={o.orderId} value={o.orderId}>
                                #{o.orderId} — {o.productType}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl fullWidth className="mb-4">
                    <InputLabel>Nuevo Estado</InputLabel>
                    <Select
                        value={status}
                        label="Nuevo Estado"
                        onChange={(e) => setStatus(e.target.value)}
                        sx={{ marginBottom: "1rem" }}
                    >
                        {statusOptions.map((opt) => (
                            <MenuItem key={opt.value} value={opt.value}>
                                {opt.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    onClick={handleSubmit}
                    variant="contained"
                    color="primary"
                    disabled={!orderId || !status}
                >
                    Actualizar Estado
                </Button>
            </Paper>

            {/* Diálogo para asignación de ruta y transportista */}
            <Dialog
                open={openModal}
                onClose={() => setOpenModal(false)}
                slotProps={{
                    paper: {
                        sx: {
                            width: "600px",
                            maxWidth: "90vw",
                            borderRadius: "1rem",
                            p: 3,
                        },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 2,
                        fontWeight: "bold",
                        color: "text.primary",
                    }}
                >
                    <LocalShippingIcon sx={{ color: "orange", fontSize: 28 }} />
                    Asignar ruta y transportista
                </DialogTitle>
                <DialogContent>
                    <div className="mb-4">
                        <Typography variant="body2">
                            Orden seleccionada: #{selectedOrderId} —{" "}
                            <strong>{selectedWeight} kg</strong>
                        </Typography>
                    </div>

                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Ruta</InputLabel>
                        <Select
                            value={selectedRouteId}
                            onChange={(e) =>
                                setSelectedRouteId(Number(e.target.value))
                            }
                            label="Ruta"
                            sx={{ marginBottom: "1rem" }}
                        >
                            {routes.map((r) => (
                                <MenuItem key={r.id} value={r.id}>
                                    {r.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth error={Boolean(exceedsCapacity)}>
                        <InputLabel>Transportista</InputLabel>
                        <Select
                            value={selectedTransporterId}
                            onChange={(e) =>
                                setSelectedTransporterId(Number(e.target.value))
                            }
                            label="Transportista"
                        >
                            {transporters.map((t) => (
                                <MenuItem key={t.id} value={t.id}>
                                    {t.name} — Capacidad: {t.capacity}kg
                                </MenuItem>
                            ))}
                        </Select>
                        {exceedsCapacity && (
                            <Typography
                                variant="caption"
                                color="error"
                                sx={{ mt: 1 }}
                            >
                                El peso de la orden excede la capacidad del
                                transportista.
                            </Typography>
                        )}
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenModal(false)}>
                        Cancelar
                    </Button>
                    <Button
                        onClick={handleAssignOrder}
                        variant="contained"
                        color="primary"
                        disabled={Boolean(exceedsCapacity)}
                    >
                        Asignar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
