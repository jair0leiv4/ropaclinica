# RopaClínica 

Tienda online de ropa de cama y de paciente para uso hospitalario, desarrollada para la
Evaluación Parcial N°1 de **DSY1104 — Desarrollo Fullstack II** (DUOC UC).

Proyecto individual de **Jairo Leiva**.

## Descripción

RopaClínica es una tienda web de 4 páginas construida con HTML, CSS y JavaScript puro
(sin frameworks ni librerías externas). Los datos del catálogo viven en un arreglo de
JavaScript y el carrito se guarda en `localStorage` del navegador, por lo que el sitio
funciona completo sin necesidad de un servidor.

### Catálogo

10 prendas en dos versiones (adulto y pediátrica): sábana con elástico, sábana lisa,
cobertor, cubrecama y camisa de paciente.

## Páginas

| Página | Archivo | Descripción |
|---|---|---|
| Inicio | `index.html` | Hero, video informativo y productos destacados |
| Productos | `productos.html` | Catálogo completo |
| Detalle | `producto.html` | Detalle de un producto y productos relacionados |
| Carrito | `carrito.html` | Carrito, cupón de descuento y formulario de pedido con validación en tiempo real |

## Estructura del proyecto

```
├── index.html
├── productos.html
├── producto.html
├── carrito.html
├── css/
│   └── estilos.css
├── js/
│   ├── app.js        # lógica compartida: menú, catálogo, carrito, validación
│   └── datos.js       # "base de datos" de prueba (arreglo de productos)
└── media/
    └── cuidado-ropa-clinica.mp4
```

## Cómo verlo localmente

No requiere instalación. Basta con servir la carpeta con cualquier servidor estático, por ejemplo:

```bash
python3 -m http.server 8000
```

y abrir `http://localhost:8000/index.html`. (Abrir el `index.html` directo con doble clic
también funciona, salvo el video en algunos navegadores por política de archivos locales.)

## Documentación

El detalle de requerimientos, mockups y especificación completa está en el documento ERS
(Anexo 4) y en la Planilla de Requerimientos (Anexo 2), entregados junto con este repositorio.


