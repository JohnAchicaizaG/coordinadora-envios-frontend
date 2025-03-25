import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts y páginas
import LoginPage from "../features/auth/pages/LoginPage";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardHome from "../features/dashboard/pages/DashboardHome";
import CreateOrderPage from "../features/dashboard/pages/CreateOrderPage";
import AssignRoutePage from "../features/dashboard/pages/AssignRoutePage";
import TrackPage from "../features/dashboard/pages/TrackPage";
import ReportsPage from "../features/dashboard/pages/ReportsPage";

// Middleware
import ProtectedRoute from "../middlewares/ProtectedRoute";
import RoleProtectedRoute from "../middlewares/RoleProtectedRoute";

import { Role } from "../shared/constants/roles";
import LogisticsManagement from "../features/dashboard/pages/LogisticsManagement";

/**
 * Configuración de las rutas de la aplicación utilizando React Router.
 *
 * Define rutas públicas y protegidas por autenticación y roles.
 */
const router = createBrowserRouter([
    {
        path: "/",
        element: <LoginPage />,
    },
    {
        path: "/dashboard",
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            { index: true, element: <DashboardHome /> },

            {
                path: "create-order",
                element: (
                    <RoleProtectedRoute
                        allowedRoles={[
                            Role.Admin,
                            Role.AdminLogistics,
                            Role.User,
                        ]}
                    >
                        <CreateOrderPage />
                    </RoleProtectedRoute>
                ),
            },
            {
                path: "assign-route",
                element: (
                    <RoleProtectedRoute
                        allowedRoles={[Role.Admin, Role.AdminLogistics]}
                    >
                        <AssignRoutePage />
                    </RoleProtectedRoute>
                ),
            },
            {
                path: "track",
                element: (
                    <RoleProtectedRoute allowedRoles={[Role.User]}>
                        <TrackPage />
                    </RoleProtectedRoute>
                ),
            },
            {
                path: "reports",
                element: (
                    <RoleProtectedRoute allowedRoles={[Role.AdminLogistics]}>
                        <ReportsPage />
                    </RoleProtectedRoute>
                ),
            },
            {
                path: "logistics",
                element: (
                    <RoleProtectedRoute allowedRoles={[Role.Admin]}>
                        <LogisticsManagement />
                    </RoleProtectedRoute>
                ),
            },
        ],
    },
]);

/**
 * Proveedor principal de rutas de la aplicación.
 *
 * Renderiza el enrutador definido con `createBrowserRouter`.
 *
 * @returns {JSX.Element} Proveedor de rutas.
 */
export function AppRouter() {
    return <RouterProvider router={router} />;
}
