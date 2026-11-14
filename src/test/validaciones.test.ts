import { validarCampo, validarPedido } from "../utils/validaciones";

describe("validarCampo", () => {
  it("rechaza campos vacíos", () => {
    expect(validarCampo("nombre", "   ")).toMatch(/obligatorio/);
  });
  it("acepta correos @duoc.cl, @profesor.duoc.cl y @gmail.com", () => {
    ["a@duoc.cl", "a@profesor.duoc.cl", "a@gmail.com"].forEach((c) => expect(validarCampo("correo", c)).toBe(""));
  });
  it("rechaza otros dominios", () => {
    expect(validarCampo("correo", "a@hotmail.com")).toMatch(/Usa un correo/);
  });
  it("respeta el máximo de caracteres", () => {
    expect(validarCampo("nombre", "x".repeat(101))).toMatch(/Máximo 100/);
  });
});

describe("validarPedido", () => {
  it("devuelve un error por cada campo inválido", () => {
    expect(Object.keys(validarPedido({ nombre: "", correo: "mal", direccion: "" }))).toHaveLength(3);
  });
  it("no devuelve errores con datos correctos", () => {
    expect(validarPedido({ nombre: "Jairo Leiva", correo: "jairo@duoc.cl", direccion: "Av. Siempre Viva 742" })).toEqual({});
  });
});
