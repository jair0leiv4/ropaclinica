import { useState } from "react";
import { useCarrito } from "../context/CarritoContext";
import ListaCarrito from "../components/organisms/ListaCarrito";
import ResumenCarrito from "../components/organisms/ResumenCarrito";
import FormularioPedido from "../components/organisms/FormularioPedido";
import TituloSeccion from "../components/molecules/TituloSeccion";
import Boton from "../components/atoms/Boton";
import type { DatosPedido } from "../utils/validaciones";

/** Página: carrito + formulario de pedido. */
export default function Carrito() {
  const { items, vaciar } = useCarrito();
  const [confirmadoA, setConfirmadoA] = useState<string | null>(null);

  const confirmar = (datos: DatosPedido) => {
    setConfirmadoA(datos.correo.trim());
    vaciar();
  };

  return (
    <section className="container py-5">
      <TituloSeccion texto="Mi carrito de compras" nivel={1} />

      {confirmadoA ? (
        <div className="alert alert-success text-center" role="status">
          ¡Gracias por tu compra! Confirmamos tu pedido a <strong>{confirmadoA}</strong> (simulado).{" "}
          <Boton to="/productos" variante="contorno" className="ms-2">Seguir comprando</Boton>
        </div>
      ) : items.length === 0 ? (
        <p className="text-center">
          Tu carrito está vacío. <Boton to="/productos" variante="contorno" className="ms-2">Ver productos</Boton>
        </p>
      ) : (
        <div className="row g-4 justify-content-center">
          <div className="col-12 col-lg-7"><ListaCarrito /><ResumenCarrito /></div>
          <div className="col-12 col-lg-5"><FormularioPedido onConfirmar={confirmar} /></div>
        </div>
      )}
    </section>
  );
}
