import { useState } from "react";
import GrillaProductos from "../components/organisms/GrillaProductos";
import TituloSeccion from "../components/molecules/TituloSeccion";
import { PRODUCTOS } from "../data/productos";

type Filtro = "Todos" | "Adulto" | "Pediátrico";
const FILTROS: Filtro[] = ["Todos", "Adulto", "Pediátrico"];

/** Página: catálogo completo con filtro por categoría (estado local). */
export default function Productos() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const visibles = filtro === "Todos" ? PRODUCTOS : PRODUCTOS.filter((p) => p.categoria === filtro);

  return (
    <section className="container py-5">
      <TituloSeccion texto="Catálogo de productos" nivel={1} />
      <div className="d-flex justify-content-center gap-2 mb-4" role="group" aria-label="Filtrar por categoría">
        {FILTROS.map((f) => (
          <button key={f} type="button" aria-pressed={filtro === f}
                  className={`btn btn-sm rounded-pill ${filtro === f ? "btn-rc" : "btn-outline-rc"}`}
                  onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>
      <GrillaProductos productos={visibles} />
    </section>
  );
}
