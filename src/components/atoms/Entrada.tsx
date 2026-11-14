import type { InputHTMLAttributes } from "react";

interface EntradaProps extends InputHTMLAttributes<HTMLInputElement> {
  /** undefined = sin tocar, true = inválido, false = válido */
  invalido?: boolean;
}

/** Átomo: input de Bootstrap con estados de validación (is-valid / is-invalid). */
export default function Entrada({ invalido, className = "", ...resto }: EntradaProps) {
  const estado = invalido === undefined ? "" : invalido ? "is-invalid" : "is-valid";
  return <input className={`form-control ${estado} ${className}`.trim()} {...resto} />;
}
