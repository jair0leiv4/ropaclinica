/* app.js — lógica compartida por todas las páginas de la tienda */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const peso = n => "$" + n.toLocaleString("es-CL");
const buscar = id => PRODUCTOS.find(p => p.id === Number(id));
const param = k => new URLSearchParams(location.search).get(k);

/* ---------- Encabezado y pie (se arman aquí para no repetirlos en cada HTML) ---------- */
const actual = location.pathname.split("/").pop() || "index.html";
const ENLACES = [["index.html", "Home"], ["productos.html", "Productos"]];
$(".site-header").innerHTML = `<div class="contenedor cabecera-flex">
  <a href="index.html" class="logo">RopaClínica</a>
  <nav class="menu" aria-label="Navegación principal">${ENLACES.map(([h, t]) => `<a href="${h}"${h === actual ? ' class="activo"' : ""}>${t}</a>`).join("")}</nav>
  <div class="acciones"><a href="carrito.html" class="btn-nav">🛒 Carrito (<span id="contador">0</span>)</a></div></div>`;
$(".site-footer").innerHTML = `<div class="contenedor"><p>🧺 RopaClínica — contacto@ropaclinica.cl</p>
  <p>&copy; 2026 RopaClínica — Proyecto académico DSY1104, Desarrollo Fullstack II.</p></div>`;

/* ---------- Productos ---------- */
const tarjeta = p => `<article class="producto"><a href="producto.html?id=${p.id}"><div class="foto">${p.icono}</div><h3>${p.nombre}</h3></a>
  <p class="cat">${p.cat}</p><p class="precio">${peso(p.precio)}</p><button class="boton" data-add="${p.id}">Añadir</button></article>`;

const lista = $("#lista-productos");
if (lista) lista.innerHTML = PRODUCTOS.slice(0, lista.dataset.max || PRODUCTOS.length).map(tarjeta).join("");

const det = $("#detalle");
if (det) {
  const p = buscar(param("id"));
  if (!p) det.innerHTML = `<p>Producto no encontrado. <a href="productos.html">Volver a productos</a></p>`;
  else {
    document.title = p.nombre + " | RopaClínica";
    const opciones = Array.from({ length: Math.min(p.stock, 10) }, (_, i) => `<option>${i + 1}</option>`).join("");
    det.innerHTML = `<div class="foto grande">${p.icono}</div><div><p class="cat">${p.cat}</p><h1>${p.nombre}</h1>
      <p class="precio">${peso(p.precio)}</p><p>${p.desc}</p><p class="cat">Stock disponible: ${p.stock}</p>
      <div class="campo"><label for="cant">Cantidad</label><select id="cant">${opciones}</select></div>
      <button class="boton boton-ancho" id="add-det">Añadir al carrito</button></div>`;
    $("#add-det").onclick = () => agregar(p.id, Number($("#cant").value));
    $("#relacionados").innerHTML = PRODUCTOS.filter(x => x.cat === p.cat && x.id !== p.id).map(tarjeta).join("");
  }
}

/* ---------- Carrito (se guarda en localStorage) ---------- */
const leerCarrito = () => { try { return JSON.parse(localStorage.getItem("carrito")) || []; } catch { return []; } };
const subtotal = () => leerCarrito().reduce((s, i) => s + buscar(i.id).precio * i.cant, 0);

function guardarCarrito(c) {
  localStorage.setItem("carrito", JSON.stringify(c));
  $("#contador").textContent = c.reduce((s, i) => s + i.cant, 0);
  pintarCarrito();
}

function agregar(id, cant = 1) {
  const c = leerCarrito(), it = c.find(x => x.id === id), nueva = (it ? it.cant : 0) + cant;
  if (nueva > buscar(id).stock) { alert("Solo quedan " + buscar(id).stock + " unidades de este producto."); return false; }
  if (it) it.cant = nueva; else c.push({ id, cant });
  guardarCarrito(c);
  return true;
}

function cambiar(id, d) {
  const c = leerCarrito(), it = c.find(x => x.id === id), n = it.cant + d;
  if (n > buscar(id).stock) { alert("No hay más stock disponible."); return; }
  guardarCarrito(n <= 0 ? c.filter(x => x.id !== id) : c.map(x => x.id === id ? { ...x, cant: n } : x));
}

function pintarCarrito() {
  const cont = $("#carrito");
  if (!cont) return;
  const c = leerCarrito();
  const bloque = $("#bloque-pedido");
  if (!c.length) {
    cont.innerHTML = `<p class="titulo">Tu carrito está vacío. <a href="productos.html"><strong>Ver productos</strong></a></p>`;
    if (bloque) bloque.hidden = true;
    return;
  }
  if (bloque) bloque.hidden = false;
  const filas = c.map(({ id, cant }) => { const p = buscar(id); return `<li class="fila"><div class="foto mini">${p.icono}</div>
    <div class="info"><h3>${p.nombre}</h3><p>${peso(p.precio)}</p></div>
    <div class="cantidad"><button data-menos="${id}" aria-label="Quitar una unidad">−</button><span>${cant}</span><button data-mas="${id}" aria-label="Agregar una unidad">+</button></div>
    <strong>${peso(p.precio * cant)}</strong></li>`; }).join("");
  const sub = subtotal(), desc = localStorage.getItem("cupon") === "DUOC10" ? Math.round(sub * 0.1) : 0;
  cont.innerHTML = `<ul class="filas">${filas}</ul><aside class="resumen">
    <p>TOTAL: <strong>${peso(sub - desc)}</strong></p>${desc ? `<p class="cat">Cupón DUOC10 aplicado: −${peso(desc)}</p>` : ""}
    <div class="cupon"><input id="cupon" placeholder="Cupón de descuento" aria-label="Cupón de descuento"><button class="boton" data-cupon>Aplicar</button></div>
  </aside>`;
}

document.addEventListener("click", e => {
  const q = a => e.target.closest(`[${a}]`);
  let b;
  if ((b = q("data-add"))) { if (agregar(Number(b.dataset.add))) { b.textContent = "¡Añadido!"; setTimeout(() => { if (document.body.contains(b)) b.textContent = "Añadir"; }, 1200); } }
  else if ((b = q("data-mas"))) cambiar(Number(b.dataset.mas), 1);
  else if ((b = q("data-menos"))) cambiar(Number(b.dataset.menos), -1);
  else if (q("data-cupon")) {
    if ($("#cupon").value.trim().toUpperCase() === "DUOC10") { localStorage.setItem("cupon", "DUOC10"); pintarCarrito(); }
    else alert("Cupón no válido. Prueba con DUOC10.");
  }
});

guardarCarrito(leerCarrito()); // pinta el contador del header y el carrito (si la página lo tiene)
