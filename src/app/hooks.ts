import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

/**
 * Hook personalizado para acceder al `dispatch` tipado de la aplicación.
 *
 * @returns {AppDispatch} La función `dispatch` con tipado de `AppDispatch`.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();

/**
 * Hook personalizado para seleccionar datos del estado global de Redux con tipado.
 *
 * @template T Tipo de dato esperado al seleccionar del estado.
 * @param {(state: RootState) => T} selector Función que selecciona parte del estado global.
 * @returns {T} El valor seleccionado del estado.
 */
export const useAppSelector = <T>(selector: (state: RootState) => T) =>
    useSelector(selector);
