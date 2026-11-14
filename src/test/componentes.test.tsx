import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import { CarritoProvider } from "../context/CarritoContext";
import TarjetaProducto from "../components/molecules/TarjetaProducto";
import { PRODUCTOS } from "../data/productos";

const renderEn = (ruta: string) =>
  render(
    <MemoryRouter initialEntries={[ruta]}>
      <CarritoProvider>
        <App />
      </CarritoProvider>
    </MemoryRouter>
  );

describe("TarjetaProducto (props)", () => {
  it("muestra los datos del producto recibido y enlaza a su ruta dinámica", () => {
    render(
      <MemoryRouter>
        <CarritoProvider>
          <TarjetaProducto producto={PRODUCTOS[2]} />
        </CarritoProvider>
      </MemoryRouter>
    );
    expect(screen.getByText("Cobertor hospitalario")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /ver detalle$/i })).toHaveAttribute("href", "/productos/3");
  });
});

describe("Navegación (React Router)", () => {
  it("el catálogo muestra los 10 productos con el mismo componente", () => {
    renderEn("/productos");
    expect(screen.getAllByRole("heading", { level: 3 })).toHaveLength(10);
  });
  it("la ruta dinámica /productos/:id muestra el producto de la URL", () => {
    renderEn("/productos/5");
    expect(screen.getByRole("heading", { level: 1, name: "Camisa de paciente" })).toBeInTheDocument();
  });
  it("un id inexistente muestra 'Producto no encontrado'", () => {
    renderEn("/productos/999");
    expect(screen.getByText(/Producto no encontrado/i)).toBeInTheDocument();
  });
  it("una ruta desconocida muestra 404", () => {
    renderEn("/xyz");
    expect(screen.getByText("404")).toBeInTheDocument();
  });
});

describe("Carrito (estado)", () => {
  it("añadir un producto actualiza el contador y el total", async () => {
    const user = userEvent.setup();
    renderEn("/productos/2");
    await user.click(screen.getByRole("button", { name: /añadir al carrito/i }));
    expect(screen.getByTestId("contador")).toHaveTextContent("1");
    await user.click(screen.getByRole("link", { name: /carrito/i }));
    expect(screen.getByTestId("total")).toHaveTextContent("$7.990");
  });
  it("el cupón DUOC10 aplica 10% de descuento", async () => {
    const user = userEvent.setup();
    renderEn("/productos/2");
    await user.click(screen.getByRole("button", { name: /añadir al carrito/i }));
    await user.click(screen.getByRole("link", { name: /carrito/i }));
    await user.type(screen.getByLabelText(/cupón de descuento/i), "duoc10");
    await user.click(screen.getByRole("button", { name: "Aplicar" }));
    expect(screen.getByTestId("total")).toHaveTextContent("$7.191");
  });
});

describe("Formulario de pedido (validación)", () => {
  const abrirCarritoConProducto = async () => {
    const user = userEvent.setup();
    renderEn("/productos/1");
    await user.click(screen.getByRole("button", { name: /añadir al carrito/i }));
    await user.click(screen.getByRole("link", { name: /carrito/i }));
    return user;
  };

  it("muestra errores al enviar vacío y no confirma el pedido", async () => {
    const user = await abrirCarritoConProducto();
    await user.click(screen.getByRole("button", { name: /confirmar y pagar/i }));
    expect(screen.getByText(/nombre completo es obligatorio/i)).toBeInTheDocument();
    expect(screen.queryByText(/gracias por tu compra/i)).not.toBeInTheDocument();
  });
  it("valida el correo en tiempo real", async () => {
    const user = await abrirCarritoConProducto();
    await user.type(screen.getByLabelText("Correo"), "jairo@hotmail.com");
    expect(screen.getByText(/Usa un correo @duoc.cl/i)).toBeInTheDocument();
  });
  it("confirma el pedido y vacía el carrito con datos válidos", async () => {
    const user = await abrirCarritoConProducto();
    await user.type(screen.getByLabelText("Nombre completo"), "Jairo Leiva");
    await user.type(screen.getByLabelText("Correo"), "jairo@duoc.cl");
    await user.type(screen.getByLabelText("Dirección de despacho"), "Av. Siempre Viva 742");
    await user.click(screen.getByRole("button", { name: /confirmar y pagar/i }));
    expect(screen.getByText(/gracias por tu compra/i)).toBeInTheDocument();
    expect(screen.getByTestId("contador")).toHaveTextContent("0");
  });
});
