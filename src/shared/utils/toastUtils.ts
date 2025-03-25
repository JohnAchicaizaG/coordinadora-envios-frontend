import { toast } from "react-hot-toast";

/**
 * Muestra una notificación de éxito con estilo personalizado.
 *
 * @param message Mensaje a mostrar en el toast.
 */
export const showSuccessToast = (message: string) => {
    toast.success(message, {
        duration: 10000,
        style: {
            border: "1px solid #4ade80",
            padding: "16px",
            color: "#166534",
        },
        iconTheme: {
            primary: "#4ade80",
            secondary: "#ecfdf5",
        },
    });
};

/**
 * Muestra una notificación de error con estilo personalizado.
 *
 * @param message Mensaje a mostrar en el toast.
 */
export const showErrorToast = (message: string) => {
    toast.error(message, {
        duration: 7000,
        style: {
            border: "1px solid #f87171",
            padding: "16px",
            color: "#7f1d1d",
        },
        iconTheme: {
            primary: "#f87171",
            secondary: "#fef2f2",
        },
    });
};
