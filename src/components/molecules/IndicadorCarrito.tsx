import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";

/** Molécula: enlace al carrito con contador de unidades (lee el estado global). */
export default function IndicadorCarrito() {
  const { totalUnidades } = useCarrito();
  return (
    <Link to="/carrito" className="btn btn-rc btn-sm rounded-pill px-3">
      🛒 Carrito (<span data-testid="contador">{totalUnidades}</span>)
    </Link>
  );
}
