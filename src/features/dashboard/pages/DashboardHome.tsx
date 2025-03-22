/**
 * Página principal del panel administrativo.
 *
 * Muestra un mensaje de bienvenida al usuario autenticado en el dashboard.
 *
 * @returns {JSX.Element} Contenido de la página de inicio del panel.
 */
export default function DashboardHome() {
    return (
        <div className="space-y-6">
            {/* Mensaje de bienvenida */}
            <p className="text-gray-600">
                Bienvenido al panel administrativo 👋
            </p>
        </div>
    );
}
