/* ==========================================================================
   Víctor Benítez · comportamiento común a todas las páginas
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

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

  // Ornamento barroco: volutas simétricas dibujadas con trazo
  const MITAD = [
    "M172 20 C186 20 192 9 205 9 C215 9 219 17 213 21 C208.5 24 203 20 206.5 16.5",
    "M172 20 C196 21 214 30 236 26 C254 23 266 20 298 20",
    "M246 24.5 C250 30 258 31 261 27 C263 24 259.5 21.8 257.5 24",
    "M196 13 C200 6 210 3 218 5",
  ];
  function ornamento() {
    const mitad = MITAD.map((d) => `<path d="${d}" pathLength="1"/>`).join("");
    return `<svg viewBox="0 0 320 40" focusable="false">
      <path d="M160 10 L169 20 L160 30 L151 20 Z" pathLength="1"/>
      <path class="fill" d="M160 16 L164 20 L160 24 L156 20 Z"/>
      <circle class="fill" cx="160" cy="4" r="1.3"/><circle class="fill" cx="160" cy="36" r="1.3"/>
      <circle class="fill" cx="304" cy="20" r="1.6"/><circle class="fill" cx="16" cy="20" r="1.6"/>
      <g>${mitad}</g>
      <g transform="matrix(-1 0 0 1 320 0)">${mitad}</g>
    </svg>`;
  }

  // Observador para animaciones al entrar en pantalla
  const aparecer = "IntersectionObserver" in window
    ? new IntersectionObserver((entradas) => {
      entradas.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add(e.target.classList.contains("ornament") ? "is-drawn" : "is-visible");
        aparecer.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 })
    : null;

  function observar(el) {
    if (!aparecer || reduceMotion) {
      el.classList.add(el.classList.contains("ornament") ? "is-drawn" : "is-visible");
      return;
    }
    aparecer.observe(el);
  }

  window.VB = { romano, esc, observar, reduceMotion, finePointer };

  /* ---------- Ornamentos y apariciones ---------- */

  document.querySelectorAll(".ornament").forEach((el) => {
    el.innerHTML = ornamento();
    observar(el);
  });
  document.querySelectorAll("[data-reveal]").forEach(observar);
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = romano(new Date().getFullYear()); });

  /* ---------- Título letra a letra ---------- */

  document.querySelectorAll("[data-split]").forEach((el) => {
    const texto = el.textContent.trim();
    el.setAttribute("aria-label", texto);
    let i = 0;
    el.innerHTML = texto.split(/\s+/).map((palabra) =>
      `<span class="word" aria-hidden="true">${[...palabra].map((c) =>
        `<span class="char" style="--i:${i++}">${esc(c)}</span>`).join("")}</span>`
    ).join(" ");
  });

  /* ---------- Carga y telón entre páginas ---------- */

  const listo = () => requestAnimationFrame(() => document.body.classList.add("is-loaded"));
  Promise.race([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((r) => setTimeout(r, 1200)),
  ]).then(listo);

  const ruta = (u) => u.pathname.replace(/index\.html$/, "");

  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[href]");
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if ((a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (ruta(url) === ruta(location) && url.search === location.search) {
      if (!url.hash) { e.preventDefault(); window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }); }
      return; // ancla en la misma página: desplazamiento nativo
    }
    e.preventDefault();
    document.body.classList.add("is-leaving");
    setTimeout(() => { location.href = url.href; }, reduceMotion ? 0 : 420);
  });
  window.addEventListener("pageshow", (e) => {
    if (e.persisted) { document.body.classList.remove("is-leaving"); listo(); }
  });

  /* ---------- Navegación ---------- */

  const nav = document.querySelector("[data-nav]");
  if (nav) {
    const toggle = nav.querySelector("[data-nav-toggle]");
    const cerrar = () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };
    toggle.addEventListener("click", () => {
      const abierto = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(abierto));
      document.body.style.overflow = abierto ? "hidden" : "";
    });
    nav.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", cerrar));
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") cerrar(); });

    if (document.body.classList.contains("page-home")) {
      // Transparente sobre la portada oscura; barra clara al llegar al contenido
      const portada = document.querySelector("[data-hero]");
      const solido = () => nav.classList.toggle("is-solid",
        window.scrollY > (portada ? portada.offsetHeight - 70 : 60));
      solido();
      window.addEventListener("scroll", solido, { passive: true });
    }
  }

  /* ---------- Presentación: luz de vela y polvo dorado ---------- */

  const hero = document.querySelector("[data-hero]");
  if (hero) {
    const canvas = hero.querySelector(".hero__dust");
    const ctx = canvas.getContext("2d");
    const pista = hero.querySelector(".hero__hint");
    let W = 0, H = 0, dpr = 1, motas = [];
    let tx = 0.5, ty = 0.42, x = 0.5, y = 0.42, ultimoMov = -1e9, lit = 0, activo = true;

    const nueva = (inicio) => ({
      x: Math.random() * W,
      y: inicio ? Math.random() * H : H + 10,
      r: (0.35 + Math.random() * Math.random() * 1.9) * dpr,
      vx: (Math.random() - 0.5) * 0.12 * dpr,
      vy: -(0.05 + Math.random() * 0.28) * dpr,
      a: 0.25 + Math.random() * 0.7,
      f: Math.random() * Math.PI * 2,
      fv: 0.008 + Math.random() * 0.03,
    });

    const medir = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.width = Math.round(hero.clientWidth * dpr);
      H = canvas.height = Math.round(hero.clientHeight * dpr);
      const n = Math.round(Math.min(60, (hero.clientWidth * hero.clientHeight) / 22000));
      motas = Array.from({ length: n }, () => nueva(true));
    };
    medir();
    window.addEventListener("resize", medir);

    hero.addEventListener("pointermove", (e) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width;
      ty = (e.clientY - r.top) / r.height;
      ultimoMov = performance.now();
      if (pista) pista.classList.add("is-gone");
    });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(([e]) => {
        const antes = activo;
        activo = e.isIntersecting;
        if (activo && !antes) requestAnimationFrame(frame);
      }).observe(hero);
    }

    const inicio = performance.now();
    function frame(t) {
      if (!activo) return;
      const s = (t - inicio) / 1000;

      // Sin ratón (o en reposo), la luz deambula sola como una llama
      if (!finePointer || t - ultimoMov > 3000) {
        tx = 0.5 + Math.sin(s * 0.21) * 0.26 + Math.sin(s * 0.47) * 0.07;
        ty = 0.42 + Math.sin(s * 0.29 + 1.2) * 0.16;
      }
      x += (tx - x) * 0.055;
      y += (ty - y) * 0.055;

      const objetivo = document.body.classList.contains("is-loaded") && s > 0.6 ? 1 : 0;
      lit += (objetivo - lit) * 0.018;
      const llama = 1 + Math.sin(t * 0.011) * 0.014 + Math.sin(t * 0.027) * 0.01 + (Math.random() - 0.5) * 0.014;

      hero.style.setProperty("--x", (x * 100).toFixed(2) + "%");
      hero.style.setProperty("--y", (y * 100).toFixed(2) + "%");
      hero.style.setProperty("--r", (34 * llama).toFixed(2) + "vmax");
      hero.style.setProperty("--lit", lit.toFixed(3));

      // Motas de polvo, más brillantes cerca de la luz
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const lx = x * W, ly = y * H, R = Math.max(W, H) * 0.34;
      for (const m of motas) {
        m.f += m.fv;
        m.x += m.vx + Math.sin(s * 0.6 + m.f) * 0.08 * dpr;
        m.y += m.vy;
        if (m.y < -10 || m.x < -10 || m.x > W + 10) Object.assign(m, nueva(false));
        const dx = m.x - lx, dy = m.y - ly;
        const brillo = 0.08 + 0.92 * Math.exp(-((dx * dx + dy * dy) / (R * R)) * 2.4);
        const alpha = m.a * brillo * (0.55 + 0.45 * Math.sin(m.f)) * lit;
        if (alpha < 0.01) continue;
        ctx.fillStyle = `rgba(232, 204, 150, ${alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) requestAnimationFrame(frame);
    }

    if (reduceMotion) {
      hero.style.setProperty("--lit", "1");
      lit = 1;
      frame(performance.now());
    } else {
      requestAnimationFrame(frame);
    }
  }

  /* ---------- Tarjetas de obra (portada y catálogo) ---------- */

  const OBRAS = window.OBRAS || [];
  const SERIES = window.SERIES || {};

  const tarjeta = (o, i) => `
    <a class="pieza" href="cuadro.html?id=${encodeURIComponent(o.id)}" style="--col:${i % 3}">
      <figure>
        <div class="pared">
          <img src="img/obras/thumbs/${o.id}.jpg" alt="${esc(o.titulo)}, ${o.anio}" width="${o.w}" height="${o.h}" loading="lazy" decoding="async">
        </div>
        <figcaption>
          <span class="pieza__titulo">${esc(o.titulo)}</span>
          <span class="pieza__meta">${o.anio} · ${esc(o.tecnica)} · ${esc(o.medidas)}</span>
          <span class="pieza__leer">Ver ficha →</span>
        </figcaption>
      </figure>
    </a>`;

  const pintarEn = (contenedor, lista) => {
    contenedor.innerHTML = lista.map(tarjeta).join("");
    contenedor.querySelectorAll(".pieza").forEach(observar);
  };

  // Portada: las obras marcadas como destacadas (o las tres primeras)
  const destacadas = document.querySelector("[data-destacadas]");
  if (destacadas) {
    const marcadas = OBRAS.filter((o) => o.destacada);
    pintarEn(destacadas, (marcadas.length ? marcadas : OBRAS).slice(0, 3));
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

    const pintar = () => pintarEn(galeria, OBRAS.filter((o) => actual === "todas" || o.serie === actual));
    pintar();

    filtros.addEventListener("click", (e) => {
      const b = e.target.closest("[data-serie]");
      if (!b || b.dataset.serie === actual) return;
      actual = b.dataset.serie;
      filtros.querySelectorAll("[data-serie]").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      galeria.style.opacity = "0";
      setTimeout(() => { pintar(); galeria.style.opacity = "1"; }, reduceMotion ? 0 : 350);
    });
  }
})();
