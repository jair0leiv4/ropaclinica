import type { Producto } from "../types/Producto";

const img = (archivo: string) => `${import.meta.env.BASE_URL}img/${archivo}.svg`;

/** "Base de datos" de prueba: los 10 productos de la tienda. */
export const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Sábana clínica con elástico", precio: 9990, categoria: "Adulto", stock: 40, imagen: img("sabana-elastico-adulto"),
    descripcion: "Sábana ajustable con elástico en las esquinas, en algodón resistente al lavado hospitalario a alta temperatura." },
  { id: 2, nombre: "Sábana clínica lisa", precio: 7990, categoria: "Adulto", stock: 45, imagen: img("sabana-lisa-adulto"),
    descripcion: "Sábana plana de algodón, tamaño estándar para cama clínica, fácil de doblar y almacenar." },
  { id: 3, nombre: "Cobertor hospitalario", precio: 15990, categoria: "Adulto", stock: 20, imagen: img("cobertor-adulto"),
    descripcion: "Cobertor liviano y abrigador, apto para lavado industrial a 60 °C sin perder su forma." },
  { id: 4, nombre: "Cubrecama hospitalario", precio: 13990, categoria: "Adulto", stock: 18, imagen: img("cubrecama-adulto"),
    descripcion: "Cubrecama resistente para cama clínica, de secado rápido y fácil de desinfectar." },
  { id: 5, nombre: "Camisa de paciente", precio: 8990, categoria: "Adulto", stock: 35, imagen: img("camisa-adulto"),
    descripcion: "Camisa hospitalaria con amarras traseras, cómoda para el paciente y de fácil cambio para el personal." },
  { id: 6, nombre: "Sábana clínica con elástico pediátrica", precio: 7990, categoria: "Pediátrico", stock: 30, imagen: img("sabana-elastico-pediatrico"),
    descripcion: "Versión pediátrica de la sábana con elástico, en tamaño reducido para camas de niños." },
  { id: 7, nombre: "Sábana clínica lisa pediátrica", precio: 6490, categoria: "Pediátrico", stock: 30, imagen: img("sabana-lisa-pediatrico"),
    descripcion: "Sábana plana pediátrica, del mismo algodón resistente que la línea de adultos." },
  { id: 8, nombre: "Cobertor hospitalario pediátrico", precio: 12990, categoria: "Pediátrico", stock: 16, imagen: img("cobertor-pediatrico"),
    descripcion: "Cobertor pediátrico abrigador y liviano, en tamaño reducido para cunas y camas de niños." },
  { id: 9, nombre: "Cubrecama hospitalario pediátrico", precio: 10990, categoria: "Pediátrico", stock: 15, imagen: img("cubrecama-pediatrico"),
    descripcion: "Cubrecama pediátrico, resistente al lavado frecuente propio de las salas infantiles." },
  { id: 10, nombre: "Camisa de paciente pediátrica", precio: 6990, categoria: "Pediátrico", stock: 28, imagen: img("camisa-pediatrico"),
    descripcion: "Camisa hospitalaria pediátrica, cómoda y con amarras traseras fáciles de manejar." },
];

export const buscarProducto = (id: number): Producto | undefined =>
  PRODUCTOS.find((p) => p.id === id);
