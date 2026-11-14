interface ImagenProductoProps {
  src: string;
  alt: string;
  /** "card" = recorte fijo para tarjetas; "detalle" = imagen grande; "mini" = miniatura de carrito */
  tamano?: "card" | "detalle" | "mini";
}

/** Átomo: imagen con dimensiones consistentes para todos los productos. */
export default function ImagenProducto({ src, alt, tamano = "card" }: ImagenProductoProps) {
  return <img src={src} alt={alt} className={`img-producto img-${tamano} img-fluid`} loading="lazy" />;
}
