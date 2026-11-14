import { useState } from "react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { validarCampo, validarPedido } from "../../utils/validaciones";
import type { DatosPedido } from "../../utils/validaciones";

interface FormularioPedidoProps {
  /** Se llama sólo cuando todos los campos son válidos. */
  onConfirmar: (datos: DatosPedido) => void;
}

const VACIO: DatosPedido = { nombre: "", correo: "", direccion: "" };

/**
 * Organismo: formulario de pedido con validación en tiempo real.
 * Componente controlado: cada input es un reflejo del estado `datos`.
 */
export default function FormularioPedido({ onConfirmar }: FormularioPedidoProps) {
  const [datos, setDatos] = useState<DatosPedido>(VACIO);
  const [tocados, setTocados] = useState<Record<keyof DatosPedido, boolean>>({ nombre: false, correo: false, direccion: false });

  const campoDe = (e: ChangeEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>) => e.target.name as keyof DatosPedido;

  const alCambiar = (e: ChangeEvent<HTMLInputElement>) => {
    setDatos({ ...datos, [campoDe(e)]: e.target.value });
    setTocados({ ...tocados, [campoDe(e)]: true }); // valida mientras escribe
  };
  const alSalir = (e: FocusEvent<HTMLInputElement>) => setTocados({ ...tocados, [campoDe(e)]: true });

  const alEnviar = (e: FormEvent) => {
    e.preventDefault();
    const errores = validarPedido(datos);
    setTocados({ nombre: true, correo: true, direccion: true });
    if (Object.keys(errores).length === 0) onConfirmar(datos);
  };

  const props = (campo: keyof DatosPedido) => ({
    value: datos[campo],
    error: validarCampo(campo, datos[campo]),
    tocado: tocados[campo],
    onChange: alCambiar,
    onBlur: alSalir,
  });

  return (
    <section className="card shadow-sm formulario-pedido mx-auto">
      <div className="card-body p-4">
        <h2 className="h4 fw-bold mb-3">Datos de contacto para tu pedido</h2>
        <form onSubmit={alEnviar} noValidate>
          <CampoFormulario id="nombre" etiqueta="Nombre completo" autoComplete="name" {...props("nombre")} />
          <CampoFormulario id="correo" etiqueta="Correo" type="email" placeholder="nombre@duoc.cl" autoComplete="email" {...props("correo")} />
          <CampoFormulario id="direccion" etiqueta="Dirección de despacho" autoComplete="street-address" {...props("direccion")} />
          <Boton type="submit" ancho>Confirmar y pagar</Boton>
        </form>
      </div>
    </section>
  );
}
