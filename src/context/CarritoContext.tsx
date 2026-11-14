import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { ItemCarrito } from "../types/Producto";
import { buscarProducto } from "../data/productos";

const CUPON_VALIDO = "DUOC10";
const DESCUENTO = 0.1;

interface Resultado {
  ok: boolean;
  mensaje?: string;
}

interface CarritoContextoValor {
  items: ItemCarrito[];
  totalUnidades: number;
  subtotal: number;
  descuento: number;
  total: number;
  cuponAplicado: boolean;
  agregar: (id: number, cantidad?: number) => Resultado;
  cambiar: (id: number, delta: number) => Resultado;
  aplicarCupon: (codigo: string) => boolean;
  vaciar: () => void;
}

const CarritoContext = createContext<CarritoContextoValor | null>(null);

function leerStorage<T>(clave: string, porDefecto: T): T {
  try {
    const raw = localStorage.getItem(clave);
    return raw ? (JSON.parse(raw) as T) : porDefecto;
  } catch {
    return porDefecto;
  }
}

export function CarritoProvider({ children }: { children: ReactNode }) {
  // ESTADO: el carrito y el cupón; se inicializan desde localStorage
  const [items, setItems] = useState<ItemCarrito[]>(() => leerStorage<ItemCarrito[]>("carrito", []));
  const [cuponAplicado, setCuponAplicado] = useState<boolean>(() => leerStorage<string>("cupon", "") === CUPON_VALIDO);

  // Efectos: sincronizan el estado con localStorage cada vez que cambia
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    if (cuponAplicado) localStorage.setItem("cupon", JSON.stringify(CUPON_VALIDO));
    else localStorage.removeItem("cupon");
  }, [cuponAplicado]);

  const agregar = useCallback(
    (id: number, cantidad = 1): Resultado => {
      const producto = buscarProducto(id);
      if (!producto) return { ok: false, mensaje: "Producto no encontrado." };
      const actual = items.find((i) => i.id === id)?.cantidad ?? 0;
      if (actual + cantidad > producto.stock)
        return { ok: false, mensaje: `Solo quedan ${producto.stock} unidades de este producto.` };
      setItems((prev) =>
        prev.some((i) => i.id === id)
          ? prev.map((i) => (i.id === id ? { ...i, cantidad: i.cantidad + cantidad } : i))
          : [...prev, { id, cantidad }]
      );
      return { ok: true };
    },
    [items]
  );

  const cambiar = useCallback(
    (id: number, delta: number): Resultado => {
      const producto = buscarProducto(id);
      const actual = items.find((i) => i.id === id)?.cantidad ?? 0;
      const nueva = actual + delta;
      if (producto && nueva > producto.stock) return { ok: false, mensaje: "No hay más stock disponible." };
      setItems((prev) =>
        nueva <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, cantidad: nueva } : i))
      );
      return { ok: true };
    },
    [items]
  );

  const aplicarCupon = useCallback((codigo: string) => {
    const valido = codigo.trim().toUpperCase() === CUPON_VALIDO;
    if (valido) setCuponAplicado(true);
    return valido;
  }, []);

  const vaciar = useCallback(() => {
    setItems([]);
    setCuponAplicado(false);
  }, []);

  const valor = useMemo<CarritoContextoValor>(() => {
    const subtotal = items.reduce((s, i) => s + (buscarProducto(i.id)?.precio ?? 0) * i.cantidad, 0);
    const descuento = cuponAplicado ? Math.round(subtotal * DESCUENTO) : 0;
    return {
      items,
      totalUnidades: items.reduce((s, i) => s + i.cantidad, 0),
      subtotal,
      descuento,
      total: subtotal - descuento,
      cuponAplicado,
      agregar,
      cambiar,
      aplicarCupon,
      vaciar,
    };
  }, [items, cuponAplicado, agregar, cambiar, aplicarCupon, vaciar]);

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

export function useCarrito(): CarritoContextoValor {
  const ctx = useContext(CarritoContext);
  if (!ctx) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}
