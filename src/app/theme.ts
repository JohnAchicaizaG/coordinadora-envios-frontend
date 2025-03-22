import { createTheme } from "@mui/material/styles";

/**
 * Tema personalizado de Material UI con configuración de paleta y tipografía.
 */
const theme = createTheme({
    palette: {
        primary: {
            main: "#F97316",
        },
        secondary: {
            main: "#0F172A",
        },
    },
    typography: {
        fontFamily: "Inter, sans-serif",
    },
});

export default theme;
