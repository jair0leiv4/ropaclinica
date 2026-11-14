import { useCarrito } from "../../context/CarritoContext";
import { buscarProducto } from "../../data/productos";
import FilaCarrito from "../molecules/FilaCarrito";

/** Organismo: lista de productos del carrito. Usa el contexto para sumar/restar unidades. */
export default function ListaCarrito() {
  const { items, cambiar } = useCarrito();
  return (
    <ul className="list-group shadow-sm mb-4">
      {items.map(({ id, cantidad }) => {
        const producto = buscarProducto(id);
        if (!producto) return null;
        return (
          <FilaCarrito key={id} producto={producto} cantidad={cantidad}
                       onMas={() => cambiar(id, 1)} onMenos={() => cambiar(id, -1)} />
        );
      })}
    </ul>
  );
}
