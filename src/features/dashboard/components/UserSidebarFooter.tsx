import { Avatar, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../auth/slices/authSlice";
import { RootState } from "../../../app/store";

/**
 * Componente que muestra el pie de menú lateral con información del usuario autenticado.
 *
 * Incluye avatar con inicial, correo, rol del usuario y un botón para cerrar sesión.
 *
 * @returns {JSX.Element} Pie del sidebar con datos del usuario y opción de logout.
 */
export default function UserSidebarFooter() {
    const user = useSelector((state: RootState) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div className="mt-6 p-3 bg-black/20 rounded flex flex-col gap-3">
            {/* Información del usuario con avatar */}
            <div className="flex items-center gap-3">
                <Avatar sx={{ bgcolor: "#fff", color: "#f97316" }}>
                    {user?.email?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <div className="text-sm text-white overflow-hidden">
                    <p className="truncate max-w-[160px]">{user?.email}</p>
                    <p className="capitalize text-xs opacity-80 truncate max-w-[160px]">
                        {user?.role}
                    </p>
                </div>
            </div>

            {/* Botón para cerrar sesión */}
            <Button
                onClick={handleLogout}
                variant="outlined"
                size="small"
                className="!text-white border-white hover:bg-white hover:!text-orange-500 transition"
                sx={{ borderColor: "white" }} // Asegura el borde blanco también
            >
                Cerrar sesión
            </Button>
        </div>
    );
}
