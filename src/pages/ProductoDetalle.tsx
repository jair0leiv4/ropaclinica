import { useParams } from "react-router-dom";
import DetalleProducto from "../components/organisms/DetalleProducto";
import GrillaProductos from "../components/organisms/GrillaProductos";
import TituloSeccion from "../components/molecules/TituloSeccion";
import Boton from "../components/atoms/Boton";
import { PRODUCTOS, buscarProducto } from "../data/productos";

/**
 * Página: detalle. UNA sola página para todos los productos:
 * useParams() lee :id de la URL (/productos/:id) y se busca el producto correspondiente.
 */
export default function ProductoDetalle() {
  const { id } = useParams<{ id: string }>();
  const producto = buscarProducto(Number(id));

  if (!producto) {
    return (
      <section className="container py-5 text-center">
        <h1 className="h3">Producto no encontrado</h1>
        <p className="text-secondary">El producto que buscas no existe o fue retirado del catálogo.</p>
        <Boton to="/productos">Volver al catálogo</Boton>
      </section>
    );
  }

  const relacionados = PRODUCTOS.filter((p) => p.categoria === producto.categoria && p.id !== producto.id);

  return (
    <section className="container py-5">
      <DetalleProducto producto={producto} />
      <hr className="my-5" />
      <TituloSeccion texto={`Más productos ${producto.categoria === "Adulto" ? "para adultos" : "pediátricos"}`} />
      <GrillaProductos productos={relacionados} />
    </section>
  );
}
