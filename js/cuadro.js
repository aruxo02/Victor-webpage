/* ==========================================================================
   Ficha de un cuadro: lee ?id= de la URL y pinta la obra correspondiente
   ========================================================================== */
(function () {
  "use strict";

  const { romano, esc } = window.VB;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const OBRAS = window.OBRAS || [];
  const SERIES = window.SERIES || {};
  const $ = (sel) => document.querySelector(sel);

  const id = new URLSearchParams(location.search).get("id");
  const indice = OBRAS.findIndex((o) => o.id === id);
  const main = $("[data-obra]");

  if (indice === -1) {
    main.innerHTML = `
      <div class="no-encontrada">
        <p class="eyebrow">Obra no encontrada</p>
        <h1>Este cuadro se ha perdido en la penumbra</h1>
        <a class="btn" href="obra.html">Volver a la obra</a>
      </div>`;
    $("[data-paginacion]").remove();
    return;
  }

  const obra = OBRAS[indice];
  const serie = SERIES[obra.serie] || "";
  const grande = `img/obras/${obra.id}.jpg`;

  document.title = `${obra.titulo} · Víctor Benítez`;
  const meta = document.querySelector('meta[name="description"]');
  if (meta) meta.setAttribute("content", `${obra.titulo} (${obra.anio}), de Víctor Benítez. ${obra.resumen || ""}`);

  /* ---------- Texto ---------- */

  $("[data-cat]").textContent = `Cat. ${romano(indice + 1)}  ·  ${serie}`;
  $("[data-titulo]").textContent = obra.titulo;

  $("[data-prosa]").innerHTML = (obra.texto || []).map((p) => `<p>${esc(p)}</p>`).join("");

  const cita = $("[data-cita]");
  if (obra.cita) cita.textContent = obra.cita; else cita.remove();

  // Ficha técnica: lo primero que mira un jurado
  const filas = [
    ["Técnica", esc(obra.tecnica)],
    ["Medidas", esc(obra.medidas)],
    ["Año", esc(obra.anio)],
    ["Serie", esc(serie)],
    ["Materia", (obra.materiales || []).map((m) => `<span class="etiqueta">${esc(m)}</span>`).join("")],
  ].filter(([, v]) => v);
  $("[data-ficha]").innerHTML = filas.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join("");

  const credito = $("[data-credito]");
  if (obra.credito) credito.textContent = `Imagen provisional: ${obra.credito} Dominio público, vía Wikimedia Commons.`;
  else credito.remove();

  /* ---------- Imagen ---------- */

  const img = $("[data-imagen]");
  img.width = obra.w;
  img.height = obra.h;
  img.alt = `${obra.titulo}, ${obra.anio}. ${obra.tecnica}.`;
  img.src = grande;

  /* ---------- Lupa ---------- */

  const boton = $("[data-ampliar]");
  const lupa = $("[data-lupa]");
  if (finePointer && lupa) {
    const ZOOM = 2.6;
    lupa.style.backgroundImage = `url("${grande}")`;
    boton.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = img.getBoundingClientRect();
      const px = e.clientX - r.left, py = e.clientY - r.top;
      if (px < 0 || py < 0 || px > r.width || py > r.height) { lupa.classList.remove("is-on"); return; }
      const L = lupa.offsetWidth;
      lupa.style.backgroundSize = `${r.width * ZOOM}px ${r.height * ZOOM}px`;
      lupa.style.backgroundPosition = `${-(px * ZOOM - L / 2)}px ${-(py * ZOOM - L / 2)}px`;
      lupa.style.left = `${px - L / 2}px`;
      lupa.style.top = `${py - L / 2}px`;
      lupa.classList.add("is-on");
    });
    boton.addEventListener("pointerleave", () => lupa.classList.remove("is-on"));
  }

  /* ---------- Visor a pantalla completa ---------- */

  const visor = $("[data-visor]");
  const visorImg = $("[data-visor-img]");
  const lienzo = $("[data-visor-lienzo]");
  visorImg.alt = img.alt;

  const abrir = () => {
    visorImg.src = grande;
    visor.hidden = false;
    document.body.style.overflow = "hidden";
    $("[data-visor-cerrar]").focus();
  };
  const cerrar = () => {
    visor.classList.remove("is-zoom");
    visor.hidden = true;
    document.body.style.overflow = "";
    boton.focus();
  };
  const origen = (e) => {
    const r = visorImg.getBoundingClientRect();
    const ox = Math.min(100, Math.max(0, ((e.clientX - r.left) / r.width) * 100));
    const oy = Math.min(100, Math.max(0, ((e.clientY - r.top) / r.height) * 100));
    visorImg.style.setProperty("--ox", ox + "%");
    visorImg.style.setProperty("--oy", oy + "%");
  };

  boton.addEventListener("click", abrir);
  $("[data-visor-cerrar]").addEventListener("click", cerrar);
  lienzo.addEventListener("click", (e) => {
    if (e.target !== visorImg) { cerrar(); return; }
    origen(e);
    visor.classList.toggle("is-zoom");
  });
  lienzo.addEventListener("pointermove", (e) => { if (visor.classList.contains("is-zoom")) origen(e); });

  /* ---------- Anterior / siguiente ---------- */

  const prev = OBRAS[(indice - 1 + OBRAS.length) % OBRAS.length];
  const next = OBRAS[(indice + 1) % OBRAS.length];
  const enlace = (o, etiqueta) => `
    <a href="cuadro.html?id=${encodeURIComponent(o.id)}">
      <img src="img/obras/thumbs/${o.id}.jpg" alt="" loading="lazy">
      <span>
        <span class="eyebrow">${etiqueta}</span>
        <span class="paginacion__titulo">${esc(o.titulo)}</span>
      </span>
    </a>`;
  $("[data-paginacion]").innerHTML = enlace(prev, "← Anterior") + enlace(next, "Siguiente →");

  document.addEventListener("keydown", (e) => {
    if (!visor.hidden) {
      if (e.key === "Escape") cerrar();
      return;
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
      const destino = e.key === "ArrowLeft" ? prev : next;
      location.href = `cuadro.html?id=${encodeURIComponent(destino.id)}`;
    }
  });
})();
