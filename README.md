# Víctor Benítez · Pintor

Web portfolio de Víctor Benítez, pintor sevillano: un catálogo limpio, pensado para
presentarse a concursos, con detalles barrocos discretos (claroscuro en la portada,
tipografía clásica, un ornamento fino).

Es una web estática (HTML + CSS + JavaScript, sin dependencias), así que funciona
directamente en **GitHub Pages**.

> ⚠️ **Contenido provisional.** Las obras, sus textos y la trayectoria son de
> ejemplo. Las imágenes son cuadros de **dominio público** (Zurbarán, Murillo,
> Valdés Leal, Velázquez, Caravaggio…) descargados de Wikimedia Commons y se usan
> sólo para ver cómo queda el diseño. Hay que sustituirlos por los cuadros de Víctor
> antes de enviar la web a ningún concurso.

## Estructura

```
index.html          Portada, catálogo, sobre Víctor, técnica y contacto
obra.html           Ficha de cada obra (obra.html?id=...)
css/styles.css      Estilos
js/obras.js         ← El catálogo: aquí se añaden y editan las obras
js/main.js          Animaciones, menú, galería y filtros
js/obra.js          Ficha de obra: lupa, visor a pantalla completa, anterior/siguiente
img/hero.jpg        Imagen de fondo de la portada
img/obras/          Imágenes grandes de las obras (~1600 px)
img/obras/thumbs/   Miniaturas para la galería (~760 px)
```

## Cómo añadir o cambiar una obra

1. Guarda la foto del cuadro en `img/obras/<id>.jpg` (lado largo ~1600 px) y una
   copia más pequeña en `img/obras/thumbs/<id>.jpg` (~760 px de ancho).
   `<id>` es un nombre corto sin espacios ni tildes, p. ej. `bodegon-con-granadas`.
2. Abre `js/obras.js` y copia uno de los bloques `{ ... }`. Cambia:
   - `id`: el mismo nombre que la imagen.
   - `titulo`, `anio`, `tecnica`, `medidas`, `serie`, `materiales`.
   - `w` y `h`: ancho y alto en píxeles de la imagen grande.
   - `texto`: uno o varios párrafos sobre la obra. `cita` es opcional.
   - Borra la línea `credito` (sólo sirve para las imágenes provisionales).
3. Las series disponibles están arriba del todo en `window.SERIES`; se pueden
   renombrar o añadir nuevas.

El orden del catálogo es el orden en que aparecen las obras en `obras.js`.

## Qué falta personalizar

- **Retrato**: en `index.html`, sección *Sobre Víctor*, sustituir el monograma
  `VB` por una foto (`<img src="img/retrato.jpg" alt="...">`).
- **Trayectoria**: formación, exposiciones y premios (ahora hay huecos de ejemplo).
- **Contacto**: el correo (`victorbenitez@example.com`) y el enlace de Instagram.
- **Portada**: `img/hero.jpg` debería ser un cuadro suyo, idealmente uno oscuro con
  un punto de luz; el pie de la portada enlaza a esa obra.
- **Pie de página**: quitar la nota de "obras y textos provisionales".

## Verla en local

Cualquier servidor estático vale, por ejemplo:

```bash
python3 -m http.server 8000
# y abrir http://localhost:8000
```

## Publicar en GitHub Pages

1. En GitHub: **Settings → Pages**.
2. En *Build and deployment*, elegir **Deploy from a branch**, la rama con la web
   y la carpeta `/ (root)`.
3. En un par de minutos estará en `https://<usuario>.github.io/<repositorio>/`.

## Créditos de las imágenes provisionales

Todas de dominio público, vía [Wikimedia Commons](https://commons.wikimedia.org):
Caravaggio (*San Jerónimo escribiendo*), Juan Sánchez Cotán (*Bodegón con membrillo,
repollo, melón y pepino*), Francisco de Zurbarán (*Agnus Dei*, *Bodegón con limones,
naranjas y una rosa*, *San Francisco en meditación*), Bartolomé Esteban Murillo
(*Inmaculada de los Venerables*), Juan de Valdés Leal (*In ictu oculi*), Georges de
La Tour (*La Magdalena de la lamparilla*), Ludolf Bakhuizen (*Barcos en apuros en una
tormenta*), Antonio de Pereda (*Alegoría de la vanidad*) y Diego Velázquez (*Cristo
crucificado*).
