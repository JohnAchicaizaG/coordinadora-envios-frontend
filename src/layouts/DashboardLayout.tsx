import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Menu } from "@mui/icons-material";
import UserSidebarFooter from "../features/dashboard/components/UserSidebarFooter";
import DashboardSidebarMenu from "../features/dashboard/components/DashboardSidebarMenu";

/**
 * Diseño principal del panel de control (Dashboard).
 *
 * Incluye barra superior en móviles, menú lateral responsive y área de contenido dinámico.
 * Gestiona el estado de visibilidad del menú en dispositivos móviles.
 *
 * @returns {JSX.Element} Estructura del layout del dashboard.
 */
export default function DashboardLayout() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col md:flex-row bg-white text-gray-800">
            {/* Barra superior para móviles */}
            <header className="md:hidden flex justify-between items-center p-4 bg-orange-500 text-white">
                <h2 className="text-xl font-bold">Coordinadora</h2>
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    <Menu />
                </button>
            </header>

            {/* Menú lateral en móviles */}
            {menuOpen && (
                <aside className="md:hidden bg-orange-500 text-white p-6 flex flex-col justify-between">
                    <div>
                        <DashboardSidebarMenu />
                    </div>
                    <UserSidebarFooter />
                </aside>
            )}

            {/* Menú lateral en escritorio */}
            <aside className="w-64 bg-orange-500 text-white p-6 hidden md:flex flex-col justify-between">
                <div>
                    <h2 className="text-2xl font-bold mb-6">Coordinadora</h2>
                    <DashboardSidebarMenu />
                </div>
                <UserSidebarFooter />
            </aside>

            {/* Contenido principal del dashboard */}
            <main className="flex-1 bg-blue-50 p-6 overflow-y-auto">
                <Outlet />
            </main>
        </div>
    );
}
