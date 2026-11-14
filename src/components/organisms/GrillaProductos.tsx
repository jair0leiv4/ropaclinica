import type { Producto } from "../../types/Producto";
import TarjetaProducto from "../molecules/TarjetaProducto";

interface GrillaProductosProps {
  productos: Producto[];
}

/**
 * Organismo: grilla responsiva de tarjetas (Bootstrap).
 * 1 columna en móvil · 2 en sm · 3 en md · 4 en lg+ (tarjetas en horizontal).
 */
export default function GrillaProductos({ productos }: GrillaProductosProps) {
  return (
    <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">
      {productos.map((p) => (
        <div className="col" key={p.id}>
          <TarjetaProducto producto={p} />
        </div>
      ))}
    </div>
  );
}
