interface ControlCantidadProps {
  cantidad: number;
  onMas: () => void;
  onMenos: () => void;
  nombreProducto: string;
}

/** Molécula: botones − / + con el número entre medio. */
export default function ControlCantidad({ cantidad, onMas, onMenos, nombreProducto }: ControlCantidadProps) {
  return (
    <div className="d-flex align-items-center gap-2">
      <button type="button" className="btn btn-sm btn-outline-rc rounded-circle" onClick={onMenos} aria-label={`Quitar una unidad de ${nombreProducto}`}>−</button>
      <span className="fw-bold px-1" aria-live="polite">{cantidad}</span>
      <button type="button" className="btn btn-sm btn-outline-rc rounded-circle" onClick={onMas} aria-label={`Agregar una unidad de ${nombreProducto}`}>+</button>
    </div>
  );
}
