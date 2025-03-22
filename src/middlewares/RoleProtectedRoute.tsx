import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { Role } from "../shared/constants/roles";
import { JSX } from "react";

/**
 * Props esperadas para la ruta protegida por rol.
 */
interface RoleProtectedRouteProps {
    children: JSX.Element;
    allowedRoles: Role[];
}

/**
 * Componente de protección de rutas según rol del usuario.
 *
 * Verifica si el usuario está autenticado y si su rol está dentro de los roles permitidos.
 * Si no está autenticado, lo redirige al inicio.
 * Si está autenticado pero no tiene el rol requerido, lo redirige al dashboard.
 *
 * @param {RoleProtectedRouteProps} props - Componente hijo y lista de roles permitidos.
 * @returns {JSX.Element} Elemento protegido o redirección.
 */
export default function RoleProtectedRoute({
    children,
    allowedRoles,
}: RoleProtectedRouteProps) {
    const { accessToken, user } = useSelector((state: RootState) => state.auth);

    if (!accessToken) return <Navigate to="/" replace />;

    if (!user || !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
}
