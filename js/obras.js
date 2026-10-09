/*
 * Catálogo de obras de Víctor Benítez
 * ------------------------------------------------------------------
 * Para añadir una obra nueva basta con copiar un bloque { ... } y
 * cambiar sus datos. Las imágenes van en:
 *   img/obras/<id>.jpg          → imagen grande (máx. ~1600 px)
 *   img/obras/thumbs/<id>.jpg   → miniatura para la galería (~760 px)
 *
 * "w" y "h" son el ancho y alto en píxeles de la imagen grande
 * (sirven para reservar el hueco y que la página no "salte").
 *
 * "destacada: true" hace que la obra salga en la portada (se muestran
 * las tres primeras obras destacadas).
 *
 * IMPORTANTE: de momento las obras son INVENTADAS y las imágenes son
 * cuadros de dominio público de Wikimedia Commons, usados sólo para
 * ver el diseño. El campo "credito" indica de dónde sale cada imagen;
 * cuando se pongan los cuadros de Víctor, se borra ese campo.
 */

window.SERIES = {
  sacra: "Materia sacra",
  tenebrae: "Tenebrae",
  bodegones: "Bodegones",
  vanitas: "Vanitas",
  mar: "Mar y arena",
};

window.OBRAS = [
  {
    id: "san-jeronimo-en-la-penumbra",
    destacada: true,
    titulo: "San Jerónimo en la penumbra",
    anio: 2025,
    serie: "tenebrae",
    tecnica: "Óleo y albayalde sobre lienzo",
    medidas: "112 × 157 cm",
    materiales: ["Albayalde"],
    w: 1600, h: 1142,
    resumen: "El silencio de un hombre que lee, casi devorado por la sombra.",
    texto: [
      "Quise pintar el silencio de un hombre que lee. San Jerónimo, el traductor de la Biblia, aparece aquí casi devorado por la sombra: sólo la cabeza, el brazo extendido y el libro reciben la luz, como si la palabra fuera lo único que importa.",
      "El rojo del manto está construido con capas de laca sobre una base de bermellón, y las carnaciones con albayalde molido a mano, que da a la piel esa calidez que ningún blanco moderno consigue. La calavera, junto al santo, no es un adorno: es la otra mitad de la conversación.",
      "Lo pinté de noche, casi siempre con una sola lámpara encendida. Creo que se nota.",
    ],
    cita: "La luz no ilumina la escena: la elige.",
    credito: "Caravaggio, San Jerónimo escribiendo (c. 1605–1606), Galleria Borghese, Roma.",
  },
  {
    id: "alacena-con-membrillo",
    titulo: "Alacena con membrillo y repollo",
    anio: 2024,
    serie: "bodegones",
    tecnica: "Óleo sobre tabla de pino",
    medidas: "69 × 85 cm",
    materiales: ["Óleo"],
    w: 1600, h: 1293,
    resumen: "Homenaje a fray Juan Sánchez Cotán: lo pequeño, mirado despacio.",
    texto: [
      "La alacena es el escenario más humilde y más teatral de la pintura española. Un hueco oscuro, un marco de piedra y unas pocas frutas colgadas de un hilo bastan para hablar del tiempo, del ayuno y de la belleza de lo pequeño.",
      "Este cuadro es un homenaje directo a fray Juan Sánchez Cotán. Colgué el membrillo y el repollo como él, para que la curva que dibujan las piezas conduzca la mirada hacia la oscuridad del fondo.",
      "El fondo negro no es un vacío: son siete capas de tierra de sombra y negro de hueso, cada una un poco más profunda que la anterior.",
    ],
    cita: "Lo pequeño, mirado despacio, se vuelve inmenso.",
    credito: "Juan Sánchez Cotán, Bodegón con membrillo, repollo, melón y pepino (c. 1602), San Diego Museum of Art.",
  },
  {
    id: "cordero-de-dios",
    destacada: true,
    titulo: "Agnus Dei",
    anio: 2025,
    serie: "sacra",
    tecnica: "Óleo, albayalde y arena de la playa de Bolonia sobre lienzo",
    medidas: "38 × 62 cm",
    materiales: ["Albayalde", "Arena de playa"],
    w: 1600, h: 948,
    resumen: "Un cordero atado sobre una mesa de piedra. Nada más, y nada menos.",
    texto: [
      "Un cordero atado sobre una mesa de piedra, nada más. Zurbarán lo pintó varias veces y en cada una consiguió que un animal se convirtiera en una oración.",
      "La lana está trabajada con albayalde empastado, primero con espátula y después con pincel seco, para que cada rizo atrape la luz. En la mesa mezclé arena de la playa de Bolonia, tamizada muy fina: al pasar la mano se siente la piedra.",
      "Es el cuadro que más veces he empezado de nuevo. Pintar la mansedumbre es más difícil de lo que parece.",
    ],
    cita: "Ecce Agnus Dei.",
    credito: "Francisco de Zurbarán, Agnus Dei (c. 1635–1640).",
  },
  {
    id: "inmaculada-en-albayalde",
    titulo: "Inmaculada en blanco de plomo",
    anio: 2026,
    serie: "sacra",
    tecnica: "Óleo y albayalde sobre lienzo",
    medidas: "180 × 122 cm",
    materiales: ["Albayalde"],
    w: 1091, h: 1600,
    resumen: "La ligereza de Murillo, buscada con el material más pesado.",
    texto: [
      "Murillo pintó la Inmaculada como nadie: una muchacha sevillana envuelta en aire, sostenida por ángeles que parecen reírse. Quise acercarme a esa ligereza con un material pesadísimo: el blanco de plomo.",
      "El albayalde es cálido, flexible y cubre con una suavidad que permite modelar la luz sin endurecerla. Toda la gloria del fondo está hecha con veladuras sucesivas sobre una base de albayalde y ocre.",
      "Es el cuadro más luminoso que he pintado, y también el que más paciencia me ha pedido.",
    ],
    cita: "Tota pulchra es.",
    credito: "Bartolomé Esteban Murillo, Inmaculada Concepción de los Venerables (1678), Museo del Prado.",
  },
  {
    id: "limones-y-azahar",
    titulo: "Limones, naranjas y azahar",
    anio: 2025,
    serie: "bodegones",
    tecnica: "Óleo sobre lienzo",
    medidas: "60 × 107 cm",
    materiales: ["Óleo"],
    w: 1600, h: 908,
    resumen: "La primavera de Sevilla, puesta en orden sobre una mesa.",
    texto: [
      "Tres grupos sobre una mesa, alineados como en un altar: limones en un plato de plata, naranjas con sus hojas y su azahar, y una taza con una rosa. Es la primavera de Sevilla puesta en orden.",
      "El azahar está pintado del natural, en marzo, cuando los naranjos de la ciudad se ponen en flor y todo huele a lo mismo. Los platos de metal reflejan el borde de la mesa y obligan a una precisión casi de orfebre.",
      "Hay quien ve en este tipo de bodegones una ofrenda a la Virgen. Me gusta pensar que lo es, aunque nadie lo sepa.",
    ],
    cita: "Una mesa también puede ser un altar.",
    credito: "Francisco de Zurbarán, Bodegón con limones, naranjas y una rosa (1633), Norton Simon Museum.",
  },
  {
    id: "en-un-abrir-y-cerrar-de-ojos",
    titulo: "En un abrir y cerrar de ojos",
    anio: 2024,
    serie: "vanitas",
    tecnica: "Óleo y arena de Sanlúcar sobre lienzo",
    medidas: "110 × 112 cm",
    materiales: ["Arena de playa"],
    w: 1106, h: 1124,
    resumen: "Diálogo con el In ictu oculi de Valdés Leal.",
    texto: [
      "En el Hospital de la Caridad de Sevilla hay un esqueleto que apaga una vela con la mano mientras pisa coronas, libros y un globo terráqueo. Quien lo ha visto no lo olvida.",
      "Esta versión es un diálogo con Valdés Leal. La muerte avanza desde la oscuridad, y la materia del suelo —libros, coronas, tiaras— está cargada con arena de Sanlúcar para que pese, para que se note que todo lo que acumulamos acaba siendo polvo.",
      "El título viene de la cartela del original: In ictu oculi, en un abrir y cerrar de ojos.",
    ],
    cita: "In ictu oculi.",
    credito: "Juan de Valdés Leal, In ictu oculi (1670–1672), Hospital de la Caridad, Sevilla.",
  },
  {
    id: "magdalena-a-la-luz-de-una-vela",
    titulo: "Magdalena a la luz de una vela",
    anio: 2025,
    serie: "tenebrae",
    tecnica: "Óleo y albayalde sobre lienzo",
    medidas: "128 × 94 cm",
    materiales: ["Albayalde"],
    w: 900, h: 1226,
    resumen: "Una mujer, una llama y una calavera sobre el regazo.",
    texto: [
      "Una mujer, una vela y una calavera sobre el regazo. La Magdalena ha dejado atrás las joyas y mira la llama como quien mira su propia vida.",
      "La única fuente de luz está dentro del cuadro. Eso obliga a pensar cada sombra al revés: todo nace de un punto y se apaga hacia los bordes. Las carnaciones, con albayalde y un poco de bermellón, parecen calentarse con la llama.",
      "Me interesa la Magdalena porque es la santa de las segundas oportunidades.",
    ],
    cita: "Toda llama es breve, y por eso es hermosa.",
    credito: "Georges de La Tour, La Magdalena de la lamparilla (c. 1640), Museo del Louvre.",
  },
  {
    id: "temporal-frente-a-matalascanas",
    destacada: true,
    titulo: "Temporal frente a Matalascañas",
    anio: 2026,
    serie: "mar",
    tecnica: "Óleo y arena de la playa de Matalascañas sobre tabla",
    medidas: "100 × 152 cm",
    materiales: ["Arena de playa"],
    w: 1524, h: 1000,
    resumen: "El mar se pinta con el cielo… y con un poco de orilla.",
    texto: [
      "Las marinas holandesas del siglo XVII enseñan que el mar se pinta sobre todo con el cielo. Aquí el temporal ocupa casi todo el cuadro y los barcos son apenas una excusa para medir su fuerza.",
      "La espuma de las olas lleva arena de Matalascañas, recogida una tarde de levante. Mezclada con el óleo y aplicada a espátula, la arena levanta la superficie y hace que la luz se rompa en ella como en el agua de verdad.",
      "Pintar el mar con un poco de la orilla dentro me parece una forma de honestidad.",
    ],
    cita: "El mar se pinta con el cielo.",
    credito: "Ludolf Bakhuizen, Barcos en apuros en una tormenta (c. 1690).",
  },
  {
    id: "san-francisco-en-oracion",
    titulo: "San Francisco en oración",
    anio: 2024,
    serie: "tenebrae",
    tecnica: "Óleo sobre lienzo",
    medidas: "152 × 99 cm",
    materiales: ["Óleo"],
    w: 960, h: 1152,
    resumen: "Un fraile arrodillado y una luz que cae desde lo alto.",
    texto: [
      "Un fraile arrodillado, la capucha sobre los ojos, una calavera entre las manos. Zurbarán convirtió a San Francisco en una figura casi escultórica, y yo quise aprender de esa quietud.",
      "El hábito es un estudio de pardos: tierra de Sevilla, sombra tostada y negro, con muy poco blanco. Toda la emoción está en la boca entreabierta y en la luz que cae de arriba, como desde una ventana alta.",
      "Pintar a un santo en oración es, de algún modo, rezar con los pinceles.",
    ],
    cita: "Rezar también es mirar.",
    credito: "Francisco de Zurbarán, San Francisco en meditación (1635–1639).",
  },
  {
    id: "vanitas-con-reloj-de-arena",
    titulo: "Vanitas con reloj de arena",
    anio: 2025,
    serie: "vanitas",
    tecnica: "Óleo y arena de playa sobre lienzo",
    medidas: "139 × 174 cm",
    materiales: ["Arena de playa"],
    w: 1600, h: 1232,
    resumen: "Monedas, retratos, naipes y relojes: todo lo que vamos a perder.",
    texto: [
      "Un ángel sostiene el mundo y señala, sin dramatismo, todo lo que vamos a perder: monedas, joyas, retratos, naipes, relojes. La vanitas es el género más barroco de todos, el que mejor explica que la belleza y la muerte se pintan con los mismos colores.",
      "El reloj de arena contiene arena de verdad, fijada sobre la imprimación y velada después con óleo. Es un detalle que sólo se descubre de cerca, y me gusta que sea así.",
      "Cada objeto está pintado con el mismo cuidado, porque en una vanitas nada es secundario: todo pasa.",
    ],
    cita: "Memento mori.",
    credito: "Antonio de Pereda, Alegoría de la vanidad (c. 1632–1636), Kunsthistorisches Museum, Viena.",
  },
  {
    id: "expiracion",
    titulo: "Expiración",
    anio: 2026,
    serie: "sacra",
    tecnica: "Óleo y albayalde sobre lienzo",
    medidas: "160 × 105 cm",
    materiales: ["Albayalde"],
    w: 1073, h: 1600,
    resumen: "Un cuerpo sereno sobre un fondo sin paisaje.",
    texto: [
      "Un cuerpo sereno sobre un fondo sin paisaje. Velázquez pintó así a Cristo: sin sangre teatral, sin multitud, sólo la luz sobre la piel y el silencio alrededor.",
      "El cuerpo está modelado casi exclusivamente con albayalde, ocre y un toque de bermellón, en capas finas para que la piel parezca encendida desde dentro. El fondo es una sola masa de verdes y pardos oscuros.",
      "En Sevilla, el Viernes Santo se mira así: de frente y en silencio.",
    ],
    cita: "Consummatum est.",
    credito: "Diego Velázquez, Cristo crucificado (c. 1632), Museo del Prado.",
  },
];
