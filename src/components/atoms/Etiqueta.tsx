import type { Categoria } from "../../types/Producto";

interface EtiquetaProps {
  texto: Categoria | string;
}

/** Átomo: badge de categoría (cambia de color si es Pediátrico). */
export default function Etiqueta({ texto }: EtiquetaProps) {
  const clase = texto === "Pediátrico" ? "badge-ped" : "badge-adulto";
  return <span className={`badge rounded-pill ${clase}`}>{texto}</span>;
}
