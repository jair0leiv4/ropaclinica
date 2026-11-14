import Boton from "../components/atoms/Boton";

/** Página: 404 (ruta comodín "*"). */
export default function NoEncontrado() {
  return (
    <section className="container py-5 text-center">
      <h1 className="display-4 fw-bold">404</h1>
      <p className="text-secondary">La página que buscas no existe.</p>
      <Boton to="/">Volver al inicio</Boton>
    </section>
  );
}
