import { Link } from "react-router-dom";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variante = "primario" | "secundario" | "contorno" | "claro";

interface BotonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: Variante;
  /** Si se entrega, el botón se comporta como un enlace de React Router. */
  to?: string;
  ancho?: boolean;
  children: ReactNode;
}

const CLASES: Record<Variante, string> = {
  primario: "btn btn-rc",
  secundario: "btn btn-secondary",
  contorno: "btn btn-outline-rc",
  claro: "btn btn-light fw-bold",
};

/** Átomo: botón reutilizable (o enlace con apariencia de botón). */
export default function Boton({ variante = "primario", to, ancho = false, className = "", children, ...resto }: BotonProps) {
  const clases = `${CLASES[variante]} ${ancho ? "w-100" : ""} ${className}`.trim();
  if (to) return <Link to={to} className={clases}>{children}</Link>;
  return <button type="button" className={clases} {...resto}>{children}</button>;
}
