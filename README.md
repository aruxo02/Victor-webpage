# Víctor Benítez · Pintor

Web portfolio de Víctor Benítez, pintor sevillano: un catálogo limpio, pensado para
presentarse a concursos, con detalles barrocos discretos (claroscuro en la portada,
tipografía clásica, un ornamento fino).

Sólo hay una animación: la intro de la portada, que se ve una vez por visita (los
cuadros pasan dentro de un marco, entre el nombre, y el último se abre hasta llenar la
pantalla). Se puede saltar con un clic o una tecla. El resto de la web es estático.

Es una web estática (HTML + CSS + JavaScript, sin dependencias), así que funciona
directamente en **GitHub Pages**.

> ⚠️ **Contenido provisional.** Las obras, sus textos y la trayectoria son de
> ejemplo. Las imágenes son cuadros de **dominio público** (Zurbarán, Murillo,
> Valdés Leal, Velázquez, Caravaggio…) descargados de Wikimedia Commons y se usan
> sólo para ver cómo queda el diseño. Hay que sustituirlos por los cuadros de Víctor
> antes de enviar la web a ningún concurso.

## Estructura

```
index.html          Inicio: intro, portada, obra destacada y presentación
obra.html           Catálogo completo con filtros por serie
cuadro.html         Ficha de cada cuadro (cuadro.html?id=...)
sobre.html          Sobre Víctor: foto, texto y trayectoria
tecnica.html        Técnica: los cuatro pasos del oficio
contacto.html       Contacto
css/styles.css      Estilos
js/obras.js         ← El catálogo: aquí se añaden y editan las obras
js/main.js          Menú, galerías, filtros e intro de la portada
js/cuadro.js        Ficha del cuadro: lupa, visor a pantalla completa, anterior/siguiente
img/hero.jpg        Imagen de la portada
img/victor.jpg      Foto de Víctor
img/obras/          Imágenes grandes de las obras (~1600 px)
img/obras/thumbs/   Miniaturas para la galería (~760 px)
```

La cabecera y el pie están repetidos en cada página: si se cambia un enlace del menú,
hay que cambiarlo en las seis.

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
4. Para que una obra salga en la portada, añade `destacada: true` (se muestran las
   tres primeras destacadas).

El orden del catálogo es el orden en que aparecen las obras en `obras.js`.

## Qué falta personalizar

- **Trayectoria**: en `sobre.html`, formación, exposiciones y premios (ahora hay
  huecos de ejemplo).
- **Contacto**: en `contacto.html`, el correo (`victorbenitez@example.com`) y el
  usuario de Instagram.
- **Portada**: `img/hero.jpg` debería ser un cuadro suyo, idealmente uno oscuro con
  un punto de luz. En `index.html`, `data-portada` (en la intro) y el pie de la
  portada indican qué obra es.
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
