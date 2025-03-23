import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { loginSchema, LoginFormData } from "../validators/loginSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "../../../assets/coordinadora-logo.svg";

// Redux
import { login } from "../slices/authSlice";

// Router
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { Email, Lock } from "@mui/icons-material";

/**
 * Componente de formulario de inicio de sesión.
 *
 * Permite a los usuarios autenticarse mediante su correo electrónico y contraseña.
 * Valida los datos del formulario con Zod y react-hook-form.
 * Muestra errores de validación y de autenticación, y redirige al dashboard si el login es exitoso.
 *
 * @returns {JSX.Element} El formulario de inicio de sesión.
 */
export default function LoginForm() {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { loading, error } = useAppSelector((state) => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        const resultAction = await dispatch(login(data));

        if (login.fulfilled.match(resultAction)) {
            navigate("/dashboard");
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
            {/* Logo institucional */}
            <div className="flex justify-center ">
                <img
                    src={logo}
                    alt="Logo Coordinadora"
                    className="h-48 w-auto object-contain"
                />
            </div>

            {/* Título del formulario */}
            <div className="mb-10 text-center">
                <Typography
                    variant="h4"
                    className="font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-400 animate-fade-in"
                >
                    Iniciar sesión
                </Typography>
                <p className="text-gray-600 mt-2">
                    Accede con tu cuenta para comenzar a gestionar tus envíos 🚚
                </p>
            </div>
            {/* Campo: Correo electrónico */}
            <div className="mb-4">
                <TextField
                    label="Correo electrónico"
                    fullWidth
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Email className="text-orange-500" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Campo: Contraseña */}
            <div className="mb-6">
                <TextField
                    label="Contraseña"
                    type="password"
                    fullWidth
                    {...register("password")}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock className="text-orange-500" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </div>

            {/* Mensaje de error general */}
            {error && (
                <Typography color="error" className="mb-4 text-sm">
                    {error}
                </Typography>
            )}

            {/* Botón de envío */}
            <Button type="submit" variant="contained" color="primary" fullWidth>
                {loading ? "Cargando..." : "Iniciar sesión"}
            </Button>
        </form>
    );
}
