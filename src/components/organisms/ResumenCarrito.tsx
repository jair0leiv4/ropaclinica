import { useCarrito } from "../../context/CarritoContext";
import { peso } from "../../utils/formato";
import FormularioCupon from "../molecules/FormularioCupon";

/** Organismo: totales del carrito y cupón de descuento. */
export default function ResumenCarrito() {
  const { subtotal, descuento, total, cuponAplicado, aplicarCupon } = useCarrito();
  return (
    <aside className="card shadow-sm mb-4">
      <div className="card-body d-grid gap-2">
        <p className="mb-0">Subtotal: <strong>{peso(subtotal)}</strong></p>
        {cuponAplicado && <p className="text-success small mb-0">Cupón DUOC10 aplicado: −{peso(descuento)}</p>}
        <p className="fs-4 mb-0">TOTAL: <strong data-testid="total">{peso(total)}</strong></p>
        <FormularioCupon onAplicar={aplicarCupon} />
      </div>
    </aside>
  );
}
