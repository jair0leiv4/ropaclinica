import { peso } from "../../utils/formato";

interface PrecioProps {
  valor: number;
  grande?: boolean;
}

/** Átomo: muestra un monto en pesos chilenos. */
export default function Precio({ valor, grande = false }: PrecioProps) {
  return <span className={`precio fw-bold ${grande ? "fs-3" : "fs-5"}`}>{peso(valor)}</span>;
}
