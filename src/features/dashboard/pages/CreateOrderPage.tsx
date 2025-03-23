import { Paper, Typography, Divider } from "@mui/material";
import LocalShipping from "@mui/icons-material/LocalShipping";
import OrderForm from "../components/OrderForm";

/**
 * Página para registrar una nueva orden de envío.
 *
 * Contiene encabezado informativo y el formulario para capturar los datos del envío.
 *
 * @returns {JSX.Element} Vista para la creación de una orden.
 */
export default function CreateOrderPage() {
    return (
        <div className="max-w-4xl mx-auto mt-10 px-4 sm:px-6 lg:px-8">
            <Paper
                elevation={4}
                className="p-8 sm:p-10 bg-white rounded-xl shadow-md"
            >
                {/* Encabezado */}
                <div className="mb-6 flex items-center gap-3">
                    <LocalShipping
                        fontSize="large"
                        className="text-orange-500"
                    />
                    <div>
                        <Typography
                            variant="h4"
                            className="text-orange-500 font-bold"
                        >
                            Crear nueva orden de envío
                        </Typography>
                        <Typography variant="body2" className="text-gray-600">
                            Rellena los campos para registrar tu envío
                            fácilmente
                        </Typography>
                    </div>
                </div>

                <Divider className="mb-6" />

                {/* Formulario */}
                <OrderForm />
            </Paper>
        </div>
    );
}
