import { useEffect, useState } from "react";
import { useCarrito } from "../../context/CarritoContext";
import Boton from "../atoms/Boton";

interface BotonAgregarProps {
  idProducto: number;
  cantidad?: number;
  etiqueta?: string;
  ancho?: boolean;
}

/** Molécula: botón "Añadir" con estado propio (feedback "¡Añadido!" y mensaje de stock). */
export default function BotonAgregar({ idProducto, cantidad = 1, etiqueta = "Añadir", ancho = true }: BotonAgregarProps) {
  const { agregar } = useCarrito();
  const [anadido, setAnadido] = useState(false);
  const [error, setError] = useState("");

  // Vuelve el texto original después de 1.2 s
  useEffect(() => {
    if (!anadido) return;
    const t = setTimeout(() => setAnadido(false), 1200);
    return () => clearTimeout(t);
  }, [anadido]);

  const onClick = () => {
    const r = agregar(idProducto, cantidad);
    setError(r.ok ? "" : r.mensaje ?? "");
    setAnadido(r.ok);
  };

  return (
    <>
      <Boton onClick={onClick} ancho={ancho}>{anadido ? "¡Añadido!" : etiqueta}</Boton>
      {error && <small className="text-danger d-block mt-1" role="alert">{error}</small>}
    </>
  );
}
