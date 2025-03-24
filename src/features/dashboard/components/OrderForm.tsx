import { TextField, Button, InputAdornment } from "@mui/material";
import {
    Straighten,
    Home,
    Scale,
    LocationCity,
    Inventory,
} from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError } from "axios";
import { createOrder } from "../api/orderService";
import { createOrderSchema, CreateOrderForm } from "../types/order.schema";
import { CreateOrderPayload } from "../types/order.types";
import {
    showErrorToast,
    showSuccessToast,
} from "../../../shared/utils/toastUtils";

/**
 * Formulario para la creación de una orden de envío.
 *
 * Permite registrar peso, dimensiones, tipo de producto y dirección de destino.
 * Realiza validaciones con Zod y react-hook-form.
 * Notifica el resultado mediante `react-hot-toast`.
 *
 * @returns {JSX.Element} Componente de formulario para crear órdenes.
 */
export default function OrderForm() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<CreateOrderForm>({
        resolver: zodResolver(createOrderSchema),
    });

    const onSubmit = async (data: CreateOrderForm) => {
        const dimensions = `${data.length}x${data.width}x${data.height}`;
        const originAddress = `${data.originStreet}, ${data.originCity}`;
        const destinationAddress = `${data.address}, ${data.city}`;

        const payload: CreateOrderPayload = {
            weight: data.weight,
            originAddress,
            dimensions,
            productType: data.productType,
            destinationAddress,
        };

        try {
            const response = await createOrder(payload);
            const orderId = response.data.order.id;

            showSuccessToast(
                `🚚 Tu orden ha sido registrada exitosamente. ID de la orden: #${orderId}. ¡Gracias por usar nuestra plataforma logística!`,
            );

            reset();
        } catch (err) {
            const error = err as AxiosError<{ message: string }>;
            const message = error.response?.data?.message;

            if (
                message === "Dirección de destino inválida" ||
                message === "Dirección de origen inválida"
            ) {
                showErrorToast(
                    "📍 La dirección ingresada no es válida. Ha sido verificada con Google Maps y no se encontró. Por favor verifica que esté correctamente escrita.",
                );
            } else {
                showErrorToast(message || "❌ Error al crear orden");
            }
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-6 mb-6"
        >
            {/* Campo: Peso del paquete */}
            <TextField
                label="Peso"
                type="number"
                fullWidth
                {...register("weight")}
                error={!!errors.weight}
                helperText={errors.weight?.message}
                slotProps={{
                    input: {
                        startAdornment: (
                            <InputAdornment position="start">
                                <Scale />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">Kg</InputAdornment>
                        ),
                    },
                }}
            />

            {/* Campos: Dimensiones del paquete */}
            <div>
                <label className="block text-gray-700 font-medium my-5">
                    Dimensiones del paquete (Largo x Ancho x Alto)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <TextField
                        label="Largo (cm)"
                        type="number"
                        fullWidth
                        {...register("length")}
                        error={!!errors.length}
                        helperText={errors.length?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Straighten />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Ancho (cm)"
                        type="number"
                        fullWidth
                        {...register("width")}
                        error={!!errors.width}
                        helperText={errors.width?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Straighten />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                    <TextField
                        label="Alto (cm)"
                        type="number"
                        fullWidth
                        {...register("height")}
                        error={!!errors.height}
                        helperText={errors.height?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Straighten />
                                    </InputAdornment>
                                ),
                            },
                        }}
                    />
                </div>
            </div>

            {/* Campo: Tipo de producto */}
            <div>
                <TextField
                    label="Tipo de producto"
                    fullWidth
                    {...register("productType")}
                    error={!!errors.productType}
                    helperText={errors.productType?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Inventory />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Campo: Dirección de origen */}
            <div>
                <TextField
                    label="Dirección de origen (Calle, número, etc.)"
                    fullWidth
                    {...register("originStreet")}
                    error={!!errors.originStreet}
                    helperText={errors.originStreet?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Home />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Campo: Ciudad de origen */}
            <div>
                <TextField
                    label="Ciudad de origen"
                    fullWidth
                    {...register("originCity")}
                    error={!!errors.originCity}
                    helperText={errors.originCity?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationCity />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Campo: Dirección */}
            <div>
                <TextField
                    label="Dirección (Calle, número, etc.)"
                    fullWidth
                    {...register("address")}
                    error={!!errors.address}
                    helperText={errors.address?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Home />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Campo: Ciudad */}
            <div>
                <TextField
                    label="Ciudad"
                    fullWidth
                    {...register("city")}
                    error={!!errors.city}
                    helperText={errors.city?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LocationCity />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Botón de envío */}
            <div>
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    sx={{
                        backgroundColor: "#f97316",
                        "&:hover": {
                            backgroundColor: "#ea580c",
                        },
                        color: "#fff",
                    }}
                >
                    {isSubmitting ? "Enviando..." : "Crear orden"}
                </Button>
            </div>
        </form>
    );
}
