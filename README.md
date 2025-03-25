# 🚚 Frontend - Prueba Técnica Coordinadora

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

```
src/
├── app/                   # Punto de entrada y configuración general de la app
├── assets/                # Archivos estáticos (imágenes, íconos, etc.)
├── features/              # Módulos principales organizados por dominio
│   ├── api/               # Configuración base de axios
│   ├── auth/              # Lógica de autenticación
│   └── dashboard/         # Lógica del dashboard: páginas, slices, validadores
│       ├── api/
│       ├── components/
│       ├── pages/
│       ├── slices/
│       ├── types/
│       └── validators/
├── layouts/               # Layouts reutilizables como DashboardLayout
├── middlewares/           # Middlewares para interceptores (auth, logs, etc.)
├── router/                # Configuración de rutas y navegación protegida
├── shared/                # Utilidades y constantes compartidas
│   ├── constants/
│   └── utils/
├── tests/                 # Pruebas unitarias y de integración (Vitest)
│   ├── AppRouter.test.tsx
│   ├── authSlice.test.ts
│   ├── DashboardLayout.test.tsx
│   ├── filtersSlice.test.ts
│   ├── formSchemas.test.ts
│   ├── loginSchema.test.ts
│   ├── logisticsSlice.test.ts
│   ├── OrderForm.test.tsx
│   ├── orderSlice.test.ts
│   └── setup.ts
```

---