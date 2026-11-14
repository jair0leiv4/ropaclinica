import type { InputHTMLAttributes } from "react";
import Entrada from "../atoms/Entrada";

interface CampoFormularioProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  etiqueta: string;
  error?: string;
  /** true cuando el usuario ya interactuó con el campo */
  tocado?: boolean;
}

/** Molécula: label + input + mensaje de error (Entrada + texto). */
export default function CampoFormulario({ id, etiqueta, error, tocado = false, ...resto }: CampoFormularioProps) {
  const invalido = tocado ? !!error : undefined;
  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label fw-bold">{etiqueta}</label>
      <Entrada id={id} name={id} invalido={invalido} aria-describedby={`${id}-error`} {...resto} />
      <div id={`${id}-error`} className="invalid-feedback">{error}</div>
    </div>
  );
}
