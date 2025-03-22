# 📦 Coordinadora Fullstack Challenge

Aplicación fullstack para gestión logística de envíos, diseñada como parte de una prueba técnica. Implementa autenticación, dashboards por rol, protección de rutas, y estructura modular con buenas prácticas.

## 🚀 Tecnologías

- **Frontend:** React + Vite + TypeScript
- **Estado Global:** Redux Toolkit
- **Validaciones:** Zod + React Hook Form
- **Ruteo:** React Router DOM
- **Estilos:** Tailwind CSS + Material UI
- **Notificaciones:** react-hot-toast
- **Autenticación:** JWT + localStorage
- **Interceptors:** Axios

## 📁 Estructura del Proyecto

```bash
src/
│
├── app/                   # Configuración global (store, theme, etc.)
├── assets/                # Imágenes y estáticos
├── features/
│   ├── auth/              # Módulo de autenticación
│   └── dashboard/         # Módulo del dashboard con sus páginas
├── layouts/               # Layouts como AuthLayout y DashboardLayout
├── middlewares/          # Componentes como ProtectedRoute
├── router/               # Configuración de rutas con roles
├── shared/               # Constantes como roles, tipos globales
└── index.tsx / main.tsx  # Entrada de la app