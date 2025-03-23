import { motion } from "framer-motion";
import CoordinadoraLogo from "../../../assets/coordinadora-logo.svg"; // Ajusta la ruta según tu estructura real

export default function DashboardHome() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-6">
            {/* Logo con animación */}
            <motion.img
                src={CoordinadoraLogo}
                alt="Logo Coordinadora"
                className="w-7xl h-40 object-contain"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            />

            {/* Título de bienvenida */}
            <motion.h1
                className="text-3xl font-bold text-orange-500"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
            >
                ¡Bienvenido al panel administrativo!
            </motion.h1>

            {/* Subtítulo */}
            <motion.p
                className="text-gray-600 max-w-md"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                Gestiona tus envíos, rutas y reportes desde un solo lugar con
                nuestra plataforma logística.
            </motion.p>
        </div>
    );
}
