import { Toaster } from "react-hot-toast";
import { AppRouter } from "./router";

/**
 * Componente raíz de la aplicación.
 *
 * Encapsula y renderiza el sistema de enrutamiento principal.
 * También incluye el componente `Toaster` para mostrar notificaciones globales.
 *
 * @returns {JSX.Element} Componente `AppRouter` que gestiona las rutas de la aplicación.
 */
export default function App() {
    return (
        <>
            <AppRouter />
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}
