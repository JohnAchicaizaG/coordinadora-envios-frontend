import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../app/store";
import { JSX } from "react";

/**
 * Props esperadas para el componente de ruta protegida.
 */
interface ProtectedRouteProps {
    children: JSX.Element;
}

/**
 * Componente de protección de rutas.
 *
 * Verifica si el usuario tiene un token válido en el estado global.
 * Si no lo tiene, redirige al inicio. Si lo tiene, renderiza el contenido protegido.
 *
 * @param {ProtectedRouteProps} props - Contenido hijo a renderizar si hay autenticación.
 * @returns {JSX.Element} Elemento protegido o redirección.
 */
export default function ProtectedRoute({ children }: ProtectedRouteProps) {
    const token = useSelector((state: RootState) => state.auth.accessToken);

    if (!token) {
        return <Navigate to="/" replace />;
    }

    return children;
}
