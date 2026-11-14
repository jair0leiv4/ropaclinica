import type { Producto } from "../../types/Producto";
import ImagenProducto from "../atoms/ImagenProducto";
import Precio from "../atoms/Precio";
import ControlCantidad from "./ControlCantidad";
import { peso } from "../../utils/formato";

interface FilaCarritoProps {
  producto: Producto;
  cantidad: number;
  onMas: () => void;
  onMenos: () => void;
}

/** Molécula: una fila del carrito (imagen, nombre, cantidad y subtotal). */
export default function FilaCarrito({ producto, cantidad, onMas, onMenos }: FilaCarritoProps) {
  return (
    <li className="list-group-item d-flex flex-wrap align-items-center gap-3 py-3">
      <ImagenProducto src={producto.imagen} alt={producto.nombre} tamano="mini" />
      <div className="flex-grow-1">
        <h3 className="h6 mb-1">{producto.nombre}</h3>
        <Precio valor={producto.precio} />
      </div>
      <ControlCantidad cantidad={cantidad} onMas={onMas} onMenos={onMenos} nombreProducto={producto.nombre} />
      <strong className="ms-auto">{peso(producto.precio * cantidad)}</strong>
    </li>
  );
}
