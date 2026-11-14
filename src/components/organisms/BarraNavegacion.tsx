import { useState } from "react";
import { Link } from "react-router-dom";
import EnlaceNav from "../atoms/EnlaceNav";
import IndicadorCarrito from "../molecules/IndicadorCarrito";

/** Organismo: barra de navegación Bootstrap (colapsable en móvil, controlada con useState). */
export default function BarraNavegacion() {
  const [abierto, setAbierto] = useState(false);
  const cerrar = () => setAbierto(false);

  return (
    <nav className="navbar navbar-expand-md bg-white border-bottom sticky-top" aria-label="Navegación principal">
      <div className="container">
        <Link to="/" className="navbar-brand logo" onClick={cerrar}>RopaClínica</Link>
        <button className="navbar-toggler" type="button" aria-controls="menu-principal"
                aria-expanded={abierto} aria-label="Mostrar u ocultar el menú" onClick={() => setAbierto(!abierto)}>
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse ${abierto ? "show" : ""}`} id="menu-principal" onClick={cerrar}>
          <ul className="navbar-nav me-auto mb-2 mb-md-0 ms-md-4">
            <li className="nav-item"><EnlaceNav to="/" exacto>Home</EnlaceNav></li>
            <li className="nav-item"><EnlaceNav to="/productos">Productos</EnlaceNav></li>
          </ul>
          <IndicadorCarrito />
        </div>
      </div>
    </nav>
  );
}
