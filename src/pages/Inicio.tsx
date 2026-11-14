import Hero from "../components/organisms/Hero";
import VideoInformativo from "../components/organisms/VideoInformativo";
import GrillaProductos from "../components/organisms/GrillaProductos";
import TituloSeccion from "../components/molecules/TituloSeccion";
import Boton from "../components/atoms/Boton";
import { PRODUCTOS } from "../data/productos";

/** Página: Inicio. */
export default function Inicio() {
  return (
    <>
      <Hero />
      <VideoInformativo />
      <section className="container py-4">
        <TituloSeccion texto="Productos destacados" />
        <GrillaProductos productos={PRODUCTOS.slice(0, 4)} />
        <p className="text-center mt-4">
          <Boton to="/productos">Ver todos los productos</Boton>
        </p>
      </section>
    </>
  );
}
