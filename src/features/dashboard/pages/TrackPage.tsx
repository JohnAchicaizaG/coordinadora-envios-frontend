/**
 * @fileoverview Página de seguimiento de pedidos en tiempo real que muestra el estado actual de un envío.
 * @module features/dashboard/pages/TrackPage
 */

import { useEffect, useState, useCallback } from "react";
import { TextField, Typography, InputAdornment, Button } from "@mui/material";
import { io, Socket } from "socket.io-client";
import api from "../../../app/axiosConfig";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";

const socket: Socket = io("http://localhost:4000");

/**
 * @constant {Array<{key: string, label: string, icon: string}>} STATUS_STEPS
 * @description Define los estados posibles de un pedido y sus representaciones visuales
 */
const STATUS_STEPS = [
    { key: "pending", label: "En espera", icon: "⏳" },
    { key: "in_transit", label: "En tránsito", icon: "🚚" },
    { key: "delivered", label: "Entregado", icon: "📦" },
];

/**
 * @component TrackPage
 * @description Componente que permite a los usuarios rastrear el estado de sus pedidos en tiempo real.
 * Utiliza WebSocket para actualizaciones en vivo y muestra una barra de progreso visual.
 *
 * @returns {JSX.Element} Componente de seguimiento de pedidos
 */
export default function TrackPage() {
    const [inputOrderId, setInputOrderId] = useState("");
    const [trackedOrderId, setTrackedOrderId] = useState("");
    const [status, setStatus] = useState<string | null>(null);

    const currentIndex = STATUS_STEPS.findIndex((s) => s.key === status);

    /**
     * @function fetchInitialStatus
     * @description Obtiene el estado inicial de un pedido desde el servidor
     * @param {string} orderId - ID del pedido a consultar
     */
    const fetchInitialStatus = useCallback(async (orderId: string) => {
        try {
            const res = await api.get(`/orders/status/${orderId}`);
            const currentStatus = res.data.data.status;
            setStatus(currentStatus);
            console.log("📦 Estado inicial:", currentStatus);
        } catch (error) {
            console.error("❌ Error al obtener estado:", error);
        }
    }, []);

    /**
     * @function handleTrackOrder
     * @description Maneja la acción de consultar el estado de un pedido
     * Actualiza el ID del pedido rastreado y realiza la consulta inicial
     */
    const handleTrackOrder = async () => {
        if (!inputOrderId) return;

        setTrackedOrderId(inputOrderId);
        fetchInitialStatus(inputOrderId);
    };

    /**
     * @effect
     * @description Configura el listener de WebSocket para actualizaciones de estado en tiempo real
     * Se limpia automáticamente al desmontar el componente
     */
    useEffect(() => {
        const handleStatusUpdate = (data: {
            orderId: number;
            status: string;
        }) => {
            if (data.orderId.toString() === trackedOrderId) {
                setStatus(data.status);
                console.log("📡 Estado actualizado:", data.status);
            }
        };

        socket.on("order:status", handleStatusUpdate);

        return () => {
            socket.off("order:status", handleStatusUpdate);
        };
    }, [trackedOrderId]);

    return (
        <div className="p-6">
            <Typography variant="h5" className="text-orange-500 font-bold mb-4">
                Seguimiento en tiempo real de tu envío
            </Typography>

            <div className="mt-2">
                <TextField
                    label="ID de la Orden"
                    variant="outlined"
                    value={inputOrderId}
                    onChange={(e) => setInputOrderId(e.target.value)}
                    fullWidth
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <ConfirmationNumberIcon color="primary" />
                            </InputAdornment>
                        ),
                    }}
                />
            </div>

            <div className="mt-4">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleTrackOrder}
                    sx={{ mb: 3, px: 4, fontWeight: "bold", color: "white" }}
                >
                    Consultar estado
                </Button>
            </div>

            {status && (
                <div className="relative flex justify-between items-center w-full px-4 mt-12">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 z-0 transform -translate-y-1/2"></div>
                    <div
                        className="absolute top-1/2 left-0 h-1 bg-orange-500 z-10 transition-all duration-500 ease-in-out"
                        style={{
                            width: `${(currentIndex / (STATUS_STEPS.length - 1)) * 100}%`,
                            transform: "translateY(-50%)",
                        }}
                    ></div>

                    {STATUS_STEPS.map((step, index) => {
                        const isActive = index === currentIndex;
                        const isCompleted = index < currentIndex;

                        return (
                            <div
                                key={step.key}
                                className="relative z-20 flex flex-col items-center text-center w-1/3"
                            >
                                <div
                                    className={`w-16 h-16 rounded-full border-4 flex items-center justify-center text-3xl mb-2 transition-all duration-300 ${
                                        isActive
                                            ? "border-orange-500 bg-orange-100 animate-pulse text-orange-600"
                                            : isCompleted
                                              ? "border-orange-400 bg-orange-50 text-orange-500"
                                              : "border-gray-300 text-gray-400 bg-white"
                                    }`}
                                >
                                    {step.icon}
                                </div>
                                <span
                                    className={`text-sm font-medium ${
                                        isActive
                                            ? "text-orange-600"
                                            : isCompleted
                                              ? "text-orange-500"
                                              : "text-gray-500"
                                    }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
