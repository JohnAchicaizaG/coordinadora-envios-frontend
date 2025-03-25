import {
    Box,
    Button,
    MenuItem,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import {
    registerUser,
    registerRoute,
    registerTransporter,
} from "../api/logisticsApi";
import { Role } from "../types/forms";
import {
    routeSchema,
    RouteSchema,
    TransporterSchema,
    transporterSchema,
    userSchema,
    UserSchema,
} from "../validators/forms.schema";

/**
 * Componente que gestiona el panel de administración logística.
 * Permite registrar usuarios, rutas y transportistas usando formularios validados con Zod.
 *
 * @component
 * @returns {JSX.Element} Componente de gestión logística.
 */
export default function LogisticsManagement() {
    // Formulario: Usuario
    const {
        register: registerUserForm,
        handleSubmit: handleUserSubmit,
        formState: { errors: userErrors },
        reset: resetUserForm,
    } = useForm<UserSchema>({
        resolver: zodResolver(userSchema),
        defaultValues: { email: "", password: "", role: Role.User },
    });

    // Formulario: Ruta
    const {
        register: registerRouteForm,
        handleSubmit: handleRouteSubmit,
        formState: { errors: routeErrors },
        reset: resetRouteForm,
    } = useForm<RouteSchema>({
        resolver: zodResolver(routeSchema),
        defaultValues: { name: "" },
    });

    // Formulario: Transportista
    const {
        register: registerTransporterForm,
        handleSubmit: handleTransporterSubmit,
        formState: { errors: transporterErrors },
        reset: resetTransporterForm,
    } = useForm<TransporterSchema>({
        resolver: zodResolver(transporterSchema),
        defaultValues: { name: "", capacity: 0, available: true },
    });

    /**
     * Maneja el envío del formulario de usuario.
     * @async
     * @param {UserSchema} data - Datos del nuevo usuario.
     * @returns {Promise<void>}
     */
    const onSubmitUser = async (data: UserSchema) => {
        try {
            await registerUser(data);
            toast.success("Usuario registrado");
            resetUserForm();
        } catch {
            toast.error("❌ Error al registrar usuario");
        }
    };

    /**
     * Maneja el envío del formulario de ruta.
     * @async
     * @param {RouteSchema} data - Datos de la nueva ruta.
     * @returns {Promise<void>}
     */
    const onSubmitRoute = async (data: RouteSchema) => {
        try {
            await registerRoute(data);
            toast.success(" Ruta registrada");
            resetRouteForm();
        } catch {
            toast.error("❌ Error al registrar ruta");
        }
    };

    /**
     * Maneja el envío del formulario de transportista.
     * @async
     * @param {TransporterSchema} data - Datos del nuevo transportista.
     * @returns {Promise<void>}
     */
    const onSubmitTransporter = async (data: TransporterSchema) => {
        try {
            await registerTransporter(data);
            toast.success("Transportista registrado");
            resetTransporterForm();
        } catch {
            toast.error("❌ Error al registrar transportista");
        }
    };

    return (
        <Box className="max-w-3xl mx-auto px-4 py-8 space-y-8">
            <Typography variant="h5" className="font-bold text-orange-500 mb-2">
                Panel de Gestión Logística
            </Typography>

            {/* Usuario */}
            <Paper className="p-6 rounded-xl shadow-md">
                <Typography
                    variant="h6"
                    className="mb-4 font-semibold text-gray-800"
                >
                    Registrar Usuario
                </Typography>
                <form
                    onSubmit={handleUserSubmit(onSubmitUser)}
                    className="space-y-4"
                >
                    <div>
                        <TextField
                            fullWidth
                            label="Correo electrónico"
                            {...registerUserForm("email")}
                            error={!!userErrors.email}
                            helperText={userErrors.email?.message}
                        />
                    </div>

                    <div>
                        <TextField
                            fullWidth
                            label="Contraseña"
                            type="password"
                            autoComplete="current-password"
                            {...registerUserForm("password")}
                            error={!!userErrors.password}
                            helperText={userErrors.password?.message}
                        />
                    </div>

                    <div>
                        <TextField
                            select
                            fullWidth
                            label="Rol"
                            {...registerUserForm("role")}
                        >
                            {Object.values(Role).map((r) => (
                                <MenuItem key={r} value={r}>
                                    {r.charAt(0).toUpperCase() + r.slice(1)}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ fontWeight: "bold", color: "white" }}
                    >
                        Registrar Usuario
                    </Button>
                </form>
            </Paper>

            {/* Ruta */}
            <Paper className="p-6 rounded-xl shadow-md">
                <Typography
                    variant="h6"
                    className="mb-4 font-semibold text-gray-800"
                >
                    Registrar Ruta
                </Typography>
                <form
                    onSubmit={handleRouteSubmit(onSubmitRoute)}
                    className="space-y-4"
                >
                    <div>
                        <TextField
                            fullWidth
                            label="Nombre de la ruta"
                            {...registerRouteForm("name")}
                            error={!!routeErrors.name}
                            helperText={routeErrors.name?.message}
                            sx={{ marginTop: "1rem" }}
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ fontWeight: "bold", color: "white" }}
                    >
                        Registrar Ruta
                    </Button>
                </form>
            </Paper>

            {/* Transportista */}
            <Paper className="p-6 rounded-xl shadow-md">
                <Typography
                    variant="h6"
                    className="mb-4 font-semibold text-gray-800"
                >
                    Registrar Transportista
                </Typography>
                <form
                    onSubmit={handleTransporterSubmit(onSubmitTransporter)}
                    className="space-y-4"
                >
                    <div className="mb-2">
                        <TextField
                            fullWidth
                            label="Nombre del transportista"
                            {...registerTransporterForm("name")}
                            error={!!transporterErrors.name}
                            helperText={transporterErrors.name?.message}
                            sx={{ marginTop: "1rem" }}
                        />
                    </div>

                    <div className="my-6">
                        <TextField
                            fullWidth
                            label="Capacidad vehículo (kg)"
                            type="number"
                            {...registerTransporterForm("capacity", {
                                valueAsNumber: true,
                            })}
                            error={!!transporterErrors.capacity}
                            helperText={transporterErrors.capacity?.message}
                        />
                    </div>
                    <div>
                        <TextField
                            select
                            fullWidth
                            label="¿Está disponible?"
                            {...registerTransporterForm("available")}
                        >
                            <MenuItem value="true">Disponible: Sí</MenuItem>
                            <MenuItem value="false">Disponible: No</MenuItem>
                        </TextField>
                    </div>

                    <Button
                        type="submit"
                        variant="contained"
                        fullWidth
                        sx={{ fontWeight: "bold", color: "white" }}
                    >
                        Registrar Transportista
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}
