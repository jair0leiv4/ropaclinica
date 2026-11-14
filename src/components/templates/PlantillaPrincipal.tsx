import { Outlet } from "react-router-dom";
import BarraNavegacion from "../organisms/BarraNavegacion";
import PieDePagina from "../organisms/PieDePagina";

/** Template: estructura común de todas las páginas. <Outlet/> es donde React Router inserta la página activa. */
export default function PlantillaPrincipal() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />
      <main className="flex-grow-1">
        <Outlet />
      </main>
      <PieDePagina />
    </div>
  );
}
