export type Categoria = "Adulto" | "Pediátrico";

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: Categoria;
  stock: number;
  descripcion: string;
  imagen: string;
}

export interface ItemCarrito {
  id: number;
  cantidad: number;
}
