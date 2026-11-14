interface TituloSeccionProps {
  texto: string;
  /** nivel semántico del encabezado */
  nivel?: 1 | 2;
}

/** Molécula: encabezado centrado reutilizable en todas las páginas. */
export default function TituloSeccion({ texto, nivel = 2 }: TituloSeccionProps) {
  const Etiqueta = nivel === 1 ? "h1" : "h2";
  return <Etiqueta className="titulo-seccion text-center mb-4">{texto}</Etiqueta>;
}
