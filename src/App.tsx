import { Route, Routes } from "react-router-dom";
import PlantillaPrincipal from "./components/templates/PlantillaPrincipal";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import ProductoDetalle from "./pages/ProductoDetalle";
import Carrito from "./pages/Carrito";
import NoEncontrado from "./pages/NoEncontrado";

/** Tabla de rutas. Las rutas hijas se dibujan dentro de <Outlet/> de la plantilla. */
export default function App() {
  return (
    <Routes>
      <Route element={<PlantillaPrincipal />}>
        <Route index element={<Inicio />} />
        <Route path="productos" element={<Productos />} />
        <Route path="productos/:id" element={<ProductoDetalle />} />
        <Route path="carrito" element={<Carrito />} />
        <Route path="*" element={<NoEncontrado />} />
      </Route>
    </Routes>
  );
}
