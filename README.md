<<<<<<< HEAD
# RopaClínica 
=======
# RopaClínica — Parte 2 (React + Vite + TypeScript)
>>>>>>> 482e1ff (Migra el proyecto a React + Vite + TypeScript con Bootstrap y React Router)

Tienda online de ropa de cama y de paciente para uso hospitalario. Proyecto individual de **Jairo Leiva**
para **DSY1104 — Desarrollo Fullstack II** (DUOC UC).

- **Evaluación Parcial N°1:** sitio con HTML, CSS y JavaScript puro (ver historial de Git).
- **Evaluación Parcial N°2 (esta versión):** migración del frontend a **React + Vite + TypeScript**, con
  **Bootstrap**, **React Router**, **Atomic Design** y formularios con validación.

## Tecnologías

| Tecnología | Uso |
|---|---|
| React 19 + Vite | Interfaz basada en componentes y servidor de desarrollo |
| TypeScript | Tipado de props, estado, datos y validaciones (interfaces) |
| Bootstrap 5 | Diseño responsivo (grid, navbar, cards, formularios) |
| React Router | Navegación, ruta dinámica `/productos/:id` y `useParams()` |
| Vitest + Testing Library | Pruebas de componentes y de validaciones |

## Cómo ejecutarlo

```bash
npm install
npm run dev       # servidor de desarrollo -> http://localhost:5173
npm run test      # ejecuta las pruebas
npm run build     # compila para producción (carpeta dist/)
```

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio: hero, video y destacados |
| `/productos` | Catálogo completo con filtro por categoría |
| `/productos/:id` | Detalle (una sola página para los 10 productos, usa `useParams`) |
| `/carrito` | Carrito, cupón `DUOC10` y formulario de pedido con validación |
| `*` | 404 |

Recorrido: **Inicio → Productos → Ver detalle → Volver al catálogo → Carrito → Confirmar pedido**.

<<<<<<< HEAD

=======
## Estructura (Atomic Design)

```
src/
├── components/
│   ├── atoms/        Boton, Precio, Etiqueta, ImagenProducto, EnlaceNav, Entrada
│   ├── molecules/    TarjetaProducto, BotonAgregar, CampoFormulario, ControlCantidad,
│   │                 FilaCarrito, FormularioCupon, IndicadorCarrito, TituloSeccion
│   ├── organisms/    BarraNavegacion, PieDePagina, Hero, VideoInformativo, GrillaProductos,
│   │                 DetalleProducto, ListaCarrito, ResumenCarrito, FormularioPedido
│   └── templates/    PlantillaPrincipal (navbar + <Outlet/> + footer)
├── pages/            Inicio, Productos, ProductoDetalle, Carrito, NoEncontrado
├── context/          CarritoContext (estado global del carrito, persistido en localStorage)
├── data/             productos.ts (catálogo de 10 productos)
├── types/            Producto.ts (interfaces)
├── utils/            formato.ts, validaciones.ts
└── test/             pruebas automatizadas
```

## Decisiones clave

- **Reutilización:** todos los productos se dibujan con el mismo `TarjetaProducto`; sólo cambian las props.
- **Estado:** `useState` local (cantidad, filtro, formulario, menú) y `Context API` para el carrito compartido.
- **Responsivo:** `row-cols-1 / sm-2 / md-3 / lg-4`, navbar colapsable y `container` de Bootstrap.
- **Validación:** funciones puras en `utils/validaciones.ts`; el formulario es un componente controlado que valida
  mientras se escribe, al salir del campo y al enviar (clases `is-valid` / `is-invalid` de Bootstrap).
>>>>>>> 482e1ff (Migra el proyecto a React + Vite + TypeScript con Bootstrap y React Router)
