import { useState } from "react";
import type { Producto } from "../../types/Producto";
import ImagenProducto from "../atoms/ImagenProducto";
import Etiqueta from "../atoms/Etiqueta";
import Precio from "../atoms/Precio";
import Boton from "../atoms/Boton";
import BotonAgregar from "../molecules/BotonAgregar";

interface DetalleProductoProps {
  producto: Producto;
}

/** Organismo: ficha completa de un producto (imagen + datos + selector de cantidad). */
export default function DetalleProducto({ producto }: DetalleProductoProps) {
  // ESTADO local: cantidad elegida en el <select>
  const [cantidad, setCantidad] = useState(1);
  const opciones = Array.from({ length: Math.min(producto.stock, 10) }, (_, i) => i + 1);

  return (
    <div className="row g-4 align-items-start">
      <div className="col-12 col-md-6">
        <ImagenProducto src={producto.imagen} alt={producto.nombre} tamano="detalle" />
      </div>
      <div className="col-12 col-md-6 d-grid gap-3">
        <div><Etiqueta texto={producto.categoria} /></div>
        <h1 className="h2 fw-bold">{producto.nombre}</h1>
        <Precio valor={producto.precio} grande />
        <p>{producto.descripcion}</p>
        <p className="text-secondary small mb-0">Stock disponible: {producto.stock}</p>
        <div>
          <label htmlFor="cantidad" className="form-label fw-bold">Cantidad</label>
          <select id="cantidad" className="form-select" value={cantidad} onChange={(e) => setCantidad(Number(e.target.value))}>
            {opciones.map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </div>
        <BotonAgregar idProducto={producto.id} cantidad={cantidad} etiqueta="Añadir al carrito" />
        <Boton to="/productos" variante="contorno">← Volver al catálogo</Boton>
      </div>
    </div>
  );
}
