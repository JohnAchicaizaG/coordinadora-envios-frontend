import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { Role } from "../../../shared/constants/roles";

/**
 * Componente de navegación lateral para el panel de usuario.
 *
 * Muestra los enlaces disponibles según el rol del usuario autenticado.
 *
 * @returns {JSX.Element} Menú lateral con enlaces condicionales.
 */
export default function DashboardSidebarMenu() {
    const user = useSelector((state: RootState) => state.auth.user);

    return (
        <nav className="flex flex-col gap-3">
            {/* Enlace al inicio del dashboard */}
            <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                    isActive
                        ? "bg-black/70  text-white font-semibold py-2 px-4 rounded"
                        : "hover:bg-white py-2 px-4 rounded"
                }
            >
                Inicio
            </NavLink>

            {/* Enlace para crear orden (visible para todos los roles) */}
            {user?.role === Role.User && (
                <NavLink
                    to="/dashboard/create-order"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-white text-orange-500 font-semibold py-2 px-4 rounded"
                            : "hover:bg-orange-400 py-2 px-4 rounded"
                    }
                >
                    Crear Orden
                </NavLink>
            )}

            {/* Enlace para asignar rutas (solo admin y logística) */}
            {user?.role === Role.Admin && (
                <NavLink
                    to="/dashboard/assign-route"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-white text-orange-500 font-semibold py-2 px-4 rounded"
                            : "hover:bg-orange-400 py-2 px-4 rounded"
                    }
                >
                    Asignar Ruta
                </NavLink>
            )}

            {/* Enlace para logistica (solo logística) */}
            {user?.role === Role.Admin && (
                <NavLink
                    to="/dashboard/logistics"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-white text-orange-500 font-semibold py-2 px-4 rounded"
                            : "hover:bg-orange-400 py-2 px-4 rounded"
                    }
                >
                    Logística
                </NavLink>
            )}

            {/* Enlace a reportes (solo logística) */}
            {user?.role === Role.AdminLogistics && (
                <NavLink
                    to="/dashboard/reports"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-white text-orange-500 font-semibold py-2 px-4 rounded"
                            : "hover:bg-orange-400 py-2 px-4 rounded"
                    }
                >
                    Reportes
                </NavLink>
            )}

            {/* Enlace a seguimiento rol user */}
            {user?.role === Role.User && (
                <NavLink
                    to="/dashboard/track"
                    className={({ isActive }) =>
                        isActive
                            ? "bg-white text-orange-500 font-semibold py-2 px-4 rounded"
                            : "hover:bg-orange-400 py-2 px-4 rounded"
                    }
                >
                    Seguimiento
                </NavLink>
            )}
        </nav>
    );
}
