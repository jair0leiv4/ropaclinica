import { useState } from "react";
import type { FormEvent } from "react";
import Entrada from "../atoms/Entrada";
import Boton from "../atoms/Boton";

interface FormularioCuponProps {
  onAplicar: (codigo: string) => boolean;
}

/** Molécula: input + botón para el cupón; maneja su propio estado de texto y mensaje. */
export default function FormularioCupon({ onAplicar }: FormularioCuponProps) {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const ok = onAplicar(codigo);
    setError(ok ? "" : "Cupón no válido. Prueba con DUOC10.");
    if (ok) setCodigo("");
  };

  return (
    <form onSubmit={enviar} noValidate>
      <div className="input-group">
        <Entrada placeholder="Cupón de descuento" aria-label="Cupón de descuento" value={codigo}
                 onChange={(e) => setCodigo(e.target.value)} invalido={error ? true : undefined} />
        <Boton type="submit" variante="primario">Aplicar</Boton>
      </div>
      {error && <small className="text-danger" role="alert">{error}</small>}
    </form>
  );
}
