import { Link } from "react-router-dom";
import type { Producto } from "../../types/Producto";
import ImagenProducto from "../atoms/ImagenProducto";
import Etiqueta from "../atoms/Etiqueta";
import Precio from "../atoms/Precio";
import Boton from "../atoms/Boton";
import BotonAgregar from "./BotonAgregar";

interface TarjetaProductoProps {
  producto: Producto;
}

/**
 * Molécula: tarjeta de producto. ÚNICO componente para renderizar cualquier producto;
 * lo que cambia es el objeto `producto` recibido por props.
 */
export default function TarjetaProducto({ producto }: TarjetaProductoProps) {
  const rutaDetalle = `/productos/${producto.id}`; // ruta dinámica con el id
  return (
    <div className="card h-100 tarjeta-producto text-center">
      <Link to={rutaDetalle} aria-label={`Ver detalle de ${producto.nombre}`}>
        <ImagenProducto src={producto.imagen} alt={producto.nombre} tamano="card" />
      </Link>
      <div className="card-body d-flex flex-column gap-2">
        <div><Etiqueta texto={producto.categoria} /></div>
        <h3 className="h6 card-title mb-0">{producto.nombre}</h3>
        <Precio valor={producto.precio} />
        <div className="mt-auto d-grid gap-2">
          <Boton to={rutaDetalle} variante="contorno">Ver detalle</Boton>
          <BotonAgregar idProducto={producto.id} />
        </div>
      </div>
    </div>
  );
}
