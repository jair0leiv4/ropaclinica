/** Reglas de validación del formulario de pedido (funciones puras, fáciles de testear). */

export interface DatosPedido {
  nombre: string;
  correo: string;
  direccion: string;
}

export type ErroresPedido = Partial<Record<keyof DatosPedido, string>>;

const CORREO_PERMITIDO = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

const ETIQUETAS: Record<keyof DatosPedido, string> = {
  nombre: "nombre completo",
  correo: "correo",
  direccion: "dirección de despacho",
};
const MAXIMOS: Record<keyof DatosPedido, number> = { nombre: 100, correo: 100, direccion: 300 };

export function validarCampo(campo: keyof DatosPedido, valor: string): string {
  const v = valor.trim();
  if (!v) return `El campo ${ETIQUETAS[campo]} es obligatorio.`;
  if (v.length > MAXIMOS[campo]) return `Máximo ${MAXIMOS[campo]} caracteres (llevas ${v.length}).`;
  if (campo === "nombre" && v.length < 3) return "El nombre debe tener al menos 3 caracteres.";
  if (campo === "correo" && !CORREO_PERMITIDO.test(v))
    return "Usa un correo @duoc.cl, @profesor.duoc.cl o @gmail.com.";
  if (campo === "direccion" && v.length < 5) return "Escribe una dirección más completa.";
  return "";
}

export function validarPedido(datos: DatosPedido): ErroresPedido {
  const errores: ErroresPedido = {};
  (Object.keys(datos) as (keyof DatosPedido)[]).forEach((campo) => {
    const msg = validarCampo(campo, datos[campo]);
    if (msg) errores[campo] = msg;
  });
  return errores;
}
