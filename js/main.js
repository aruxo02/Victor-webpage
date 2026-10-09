/* ==========================================================================
   Víctor Benítez · comportamiento común a todas las páginas
   ========================================================================== */
(function () {
  "use strict";

  /* ---------- Utilidades compartidas ---------- */

  function romano(n) {
    const tabla = [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"],
      [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]];
    let s = "";
    for (const [v, r] of tabla) while (n >= v) { s += r; n -= v; }
    return s;
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, (c) => (
      { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]
    ));
  }

  window.VB = { romano, esc };

  /* ---------- Ornamento barroco: volutas simétricas ---------- */

  const MITAD = [
    "M172 20 C186 20 192 9 205 9 C215 9 219 17 213 21 C208.5 24 203 20 206.5 16.5",
    "M172 20 C196 21 214 30 236 26 C254 23 266 20 298 20",
    "M246 24.5 C250 30 258 31 261 27 C263 24 259.5 21.8 257.5 24",
    "M196 13 C200 6 210 3 218 5",
  ];
  const mitad = MITAD.map((d) => `<path d="${d}"/>`).join("");
  const ORNAMENTO = `<svg viewBox="0 0 320 40" focusable="false">
      <path d="M160 10 L169 20 L160 30 L151 20 Z"/>
      <path class="fill" d="M160 16 L164 20 L160 24 L156 20 Z"/>
      <circle class="fill" cx="160" cy="4" r="1.3"/><circle class="fill" cx="160" cy="36" r="1.3"/>
      <circle class="fill" cx="304" cy="20" r="1.6"/><circle class="fill" cx="16" cy="20" r="1.6"/>
      <g>${mitad}</g>
      <g transform="matrix(-1 0 0 1 320 0)">${mitad}</g>
    </svg>`;

  document.querySelectorAll(".ornament").forEach((el) => { el.innerHTML = ORNAMENTO; });
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = romano(new Date().getFullYear()); });

  /* ---------- Menú en el móvil ---------- */

  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const toggle = nav.querySelector("[data-nav-toggle]");
    const poner = (abierto) => {
      nav.classList.toggle("is-open", abierto);
      toggle.setAttribute("aria-expanded", String(abierto));
      document.body.style.overflow = abierto ? "hidden" : "";
    };
    toggle.addEventListener("click", () => poner(!nav.classList.contains("is-open")));
    nav.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => poner(false)));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") poner(false); });
  }

  /* ---------- Tarjetas de obra (portada y catálogo) ---------- */

  const OBRAS = window.OBRAS || [];
  const SERIES = window.SERIES || {};

  const tarjeta = (o) => `
    <a class="pieza" href="cuadro.html?id=${encodeURIComponent(o.id)}">
      <figure>
        <div class="pared">
          <img src="img/obras/thumbs/${o.id}.jpg" alt="${esc(o.titulo)}, ${o.anio}" width="${o.w}" height="${o.h}" loading="lazy" decoding="async">
        </div>
        <figcaption>
          <span class="pieza__titulo">${esc(o.titulo)}</span>
          <span class="pieza__meta">${o.anio} · ${esc(o.tecnica)} · ${esc(o.medidas)}</span>
        </figcaption>
      </figure>
    </a>`;

  // Portada: las obras marcadas como destacadas (o las tres primeras)
  const destacadas = document.querySelector("[data-destacadas]");
  if (destacadas) {
    const marcadas = OBRAS.filter((o) => o.destacada);
    destacadas.innerHTML = (marcadas.length ? marcadas : OBRAS).slice(0, 3).map(tarjeta).join("");
  }

  // Catálogo completo con filtros por serie
  const galeria = document.querySelector("[data-galeria]");
  const filtros = document.querySelector("[data-filtros]");
  if (galeria && filtros) {
    const claves = ["todas", ...Object.keys(SERIES).filter((k) => OBRAS.some((o) => o.serie === k))];
    let actual = "todas";

    filtros.innerHTML = claves.map((k) => {
      const n = k === "todas" ? OBRAS.length : OBRAS.filter((o) => o.serie === k).length;
      const nombre = k === "todas" ? "Todas" : SERIES[k];
      return `<button class="filtro" type="button" data-serie="${k}" aria-pressed="${k === actual}">${esc(nombre)}<sup>${n}</sup></button>`;
    }).join("");

    const pintar = () => {
      galeria.innerHTML = OBRAS.filter((o) => actual === "todas" || o.serie === actual).map(tarjeta).join("");
    };
    pintar();

    filtros.addEventListener("click", (e) => {
      const b = e.target.closest("[data-serie]");
      if (!b) return;
      actual = b.dataset.serie;
      filtros.querySelectorAll("[data-serie]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      pintar();
    });
  }

  /* ---------- Intro de la portada ----------
     La única animación de la web. Se ve una vez por visita: los cuadros pasan
     rápido dentro de un marco, entre el nombre, y el último se abre hasta
     llenar la pantalla y convertirse en la portada. Se puede saltar con un
     clic o una tecla. */

  const raiz = document.documentElement;
  const intro = document.querySelector("[data-intro]");
  if (intro && raiz.classList.contains("con-intro")) {
    const img = intro.querySelector("[data-intro-img]");
    const marco = intro.querySelector(".intro__marco");
    const revelar = intro.querySelector("[data-intro-revelar]");
    const palabras = intro.querySelectorAll(".intro__palabra span");
    const portada = "img/hero.jpg";
    const cuadros = OBRAS.filter((o) => o.id !== intro.dataset.portada).slice(0, 6)
      .map((o) => `img/obras/thumbs/${o.id}.jpg`);
    const EASE = "cubic-bezier(.76, 0, .24, 1)";
    const animaciones = [];
    let terminado = false;

    const espera = (ms) => new Promise((r) => setTimeout(r, ms));
    const cargar = (src) => new Promise((r) => { const i = new Image(); i.onload = i.onerror = r; i.src = src; });

    const terminar = () => {
      if (terminado) return;
      terminado = true;
      try { sessionStorage.setItem("vb-intro", "visto"); } catch (e) { /* sin almacenamiento */ }
      raiz.classList.add("intro-hecha");
      intro.classList.add("is-fuera");
      setTimeout(() => {
        animaciones.forEach((a) => a.cancel());
        raiz.classList.remove("con-intro");
        intro.remove();
      }, 650);
    };

    intro.addEventListener("click", terminar);
    document.addEventListener("keydown", terminar, { once: true });

    (async () => {
      if (cuadros[0]) img.src = cuadros[0];
      const inicio = performance.now();
      await Promise.race([Promise.all([...cuadros, portada].map(cargar)), espera(2500)]);
      await espera(Math.max(0, 1000 - (performance.now() - inicio)));

      // Los cuadros pasan dentro del marco
      for (const src of cuadros.slice(1)) {
        if (terminado) return;
        img.src = src;
        await espera(150);
      }
      if (terminado) return;

      // El detalle de la portada aparece en el marco… y se abre a pantalla completa
      const r = marco.getBoundingClientRect();
      const desde = `inset(${r.top}px ${innerWidth - r.right}px ${innerHeight - r.bottom}px ${r.left}px)`;
      revelar.style.clipPath = desde;
      revelar.style.visibility = "visible";
      await espera(300);
      if (terminado) return;

      if (!revelar.animate) { terminar(); return; }
      const abrir = revelar.animate(
        [{ clipPath: desde }, { clipPath: "inset(0px 0px 0px 0px)" }],
        { duration: 1100, easing: EASE, fill: "forwards" }
      );
      animaciones.push(abrir);
      palabras.forEach((p, i) => animaciones.push(p.animate(
        [{ transform: "none", opacity: 1 }, { transform: `translateX(${i ? 40 : -40}vw)`, opacity: 0 }],
        { duration: 1000, easing: EASE, fill: "forwards" }
      )));
      await abrir.finished.catch(() => {});
      terminar();
    })();
  }
})();
