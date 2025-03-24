// src/features/dashboard/components/OrdersTable.tsx

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
    IconButton,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Box,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useEffect, useState } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
    fetchOrders,
    selectOrders,
    selectOrdersLoading,
} from "../slices/ordersSlice";
import {
    fetchRoutes,
    fetchTransporters,
    selectRoutes,
    selectTransporters,
    selectLogisticsLoading,
} from "../slices/logisticsSlice";
import axios from "../../../app/axiosConfig";

/**
 * Opciones disponibles para filtrar órdenes por estado.
 * @type {{ value: string, label: string }[]}
 */
const statusOptions = [
    { value: "", label: "Todos" },
    { value: "pending", label: "Pendiente" },
    { value: "in_transit", label: "En tránsito" },
    { value: "delivered", label: "Entregado" },
];

/**
 * Componente que renderiza una tabla con todas las órdenes registradas,
 * permite filtrarlas por estado y asignarles rutas y transportistas.
 *
 * @component
 * @returns {JSX.Element} Componente de la tabla de órdenes.
 */
export default function OrdersTable() {
    const dispatch = useAppDispatch();

    const orders = useAppSelector(selectOrders);
    const ordersLoading = useAppSelector(selectOrdersLoading);

    const routes = useAppSelector(selectRoutes);
    const transporters = useAppSelector(selectTransporters);
    const logisticsLoading = useAppSelector(selectLogisticsLoading);

    const [statusFilter, setStatusFilter] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);
    const [selectedRouteId, setSelectedRouteId] = useState<number | "">("");
    const [selectedTransporterId, setSelectedTransporterId] = useState<
        number | ""
    >("");
    const [selectedWeight, setSelectedWeight] = useState<number>(0);

    /**
     * Transportista seleccionado actualmente para la asignación.
     */
    const selectedTransporter = transporters.find(
        (t) => t.id === selectedTransporterId,
    );

    /**
     * Determina si el peso de la orden excede la capacidad del transportista seleccionado.
     * @type {boolean}
     */
    const exceedsCapacity =
        selectedTransporter && selectedWeight > selectedTransporter.capacity;

    useEffect(() => {
        dispatch(fetchOrders());
        dispatch(fetchRoutes());
        dispatch(fetchTransporters());
    }, [dispatch]);

    /**
     * Maneja el cambio del filtro por estado.
     * @param {SelectChangeEvent<string>} event - Evento de cambio en el select de estado.
     */
    const handleFilterChange = (event: SelectChangeEvent<string>) => {
        const selectedStatus = event.target.value;
        setStatusFilter(selectedStatus);
        dispatch(fetchOrders(selectedStatus));
    };

    /**
     * Asigna una ruta y un transportista a la orden seleccionada.
     * @async
     * @returns {Promise<void>}
     */
    const handleAssignOrder = async () => {
        if (!selectedOrderId || !selectedRouteId || !selectedTransporterId)
            return;

        if (exceedsCapacity) return;

        try {
            await axios.post("/orders/assign", {
                orderId: selectedOrderId,
                routeId: selectedRouteId,
                transporterId: selectedTransporterId,
            });
            setOpenModal(false);
            setSelectedRouteId("");
            setSelectedTransporterId("");
            dispatch(fetchOrders(statusFilter));
        } catch (err) {
            console.error("Error al asignar orden", err);
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
                <DialogTitle>Asignar ruta y transportista</DialogTitle>
                <DialogContent>
                    <Typography variant="body2" className="mb-4">
                        Orden seleccionada: #{selectedOrderId} —{" "}
                        <strong>{selectedWeight} kg</strong>
                    </Typography>

                    <FormControl fullWidth className="mb-4">
                        <InputLabel>Ruta</InputLabel>
                        <Select
                            value={selectedRouteId}
                            onChange={(e) =>
                                setSelectedRouteId(Number(e.target.value))
                            }
                            label="Ruta"
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
