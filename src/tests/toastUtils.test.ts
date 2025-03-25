// src/tests/toastUtils.test.ts
import { describe, it, vi, expect } from "vitest";
import { toast } from "react-hot-toast";
import { showErrorToast, showSuccessToast } from "../shared/utils/toastUtils";

vi.mock("react-hot-toast", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

describe("toastUtils", () => {
    it("debe mostrar un toast de éxito con el estilo correcto", () => {
        const message = "Operación exitosa";
        showSuccessToast(message);

        expect(toast.success).toHaveBeenCalledWith(
            message,
            expect.objectContaining({
                duration: 10000,
                style: expect.any(Object),
                iconTheme: expect.any(Object),
            }),
        );
    });

    it("debe mostrar un toast de error con el estilo correcto", () => {
        const message = "Ocurrió un error";
        showErrorToast(message);

        expect(toast.error).toHaveBeenCalledWith(
            message,
            expect.objectContaining({
                duration: 7000,
                style: expect.any(Object),
                iconTheme: expect.any(Object),
            }),
        );
    });
});
