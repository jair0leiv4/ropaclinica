import Boton from "../atoms/Boton";

/** Organismo: sección principal de la página de inicio. */
export default function Hero() {
  return (
    <section className="hero text-center text-white py-5">
      <div className="container py-4">
        <p className="eyebrow">Tienda online</p>
        <h1 className="display-5 fw-bold">Ropa de cama y de paciente para tu hospital.</h1>
        <p className="hero-texto mx-auto my-4">
          Sábanas, cobertores, cubrecamas y camisas de paciente, en versión adulto y pediátrica, en telas que resisten el lavado hospitalario.
        </p>
        <Boton to="/productos" variante="claro">Ver productos</Boton>
      </div>
    </section>
  );
}
