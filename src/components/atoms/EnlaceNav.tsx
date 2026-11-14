import { NavLink } from "react-router-dom";
import type { ReactNode } from "react";

interface EnlaceNavProps {
  to: string;
  children: ReactNode;
  /** true = sólo activo en la ruta exacta (útil para "/") */
  exacto?: boolean;
}

/** Átomo: elemento de navegación. NavLink agrega la clase "active" según la URL actual. */
export default function EnlaceNav({ to, children, exacto = false }: EnlaceNavProps) {
  return (
    <NavLink to={to} end={exacto} className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}>
      {children}
    </NavLink>
  );
}
