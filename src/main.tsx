// src/main.tsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Material UI
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./app/theme.ts";

// Redux
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

/**
 * Punto de entrada principal de la aplicación.
 *
 * Renderiza la aplicación dentro del DOM, aplicando:
 * - `StrictMode` para ayudar con buenas prácticas en desarrollo.
 * - `ThemeProvider` y `CssBaseline` de MUI para estilos globales.
 * - `Provider` de Redux para manejo de estado global.
 */
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    </StrictMode>,
);
