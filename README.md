# Angy's Virtual Closet

Revista visual y armario virtual de outfits, colecciones por *mood* y productos de afiliación. El proyecto está construido con HTML, CSS y JavaScript sin dependencias de producción ni proceso de compilación.

## Estructura

```text
AngysVirtualCloset/
├── index.html                  # Página principal
├── assets/
│   ├── css/
│   │   ├── main.css           # Variables, elementos comunes y portada
│   │   ├── collection.css     # Páginas de mood
│   │   ├── finds.css          # Catálogos Amazon y Shein
│   │   └── look.css           # Fichas individuales de look
│   ├── js/
│   │   ├── main.js            # Portada y navegación móvil
│   │   ├── collection.js      # Contenido dinámico de moods
│   │   └── finds.js           # Productos y filtros
│   └── images/
│       └── outfits/           # Fotografías de looks
├── pages/
│   ├── collections/           # Colecciones por mood
│   ├── finds/                 # Catálogos de afiliación
│   └── looks/                 # Una ficha por look
└── tools/
    └── format-css.mjs         # Formateador local sin dependencias
```

## Ejecutar localmente

La web no necesita instalación. Puedes abrir `index.html` directamente o servir la carpeta con un servidor estático, por ejemplo:

```powershell
python -m http.server 8000
```

Después visita `http://localhost:8000`.

## Convenciones

### Looks

Cada look se identifica con tres dígitos: `LOOK 001`, `LOOK 002`, etc. Sus páginas se guardan como `pages/looks/look-001.html`.

### Prendas

Cada familia tiene numeración independiente:

- `F` — faldas
- `Z` — zapatos
- `A` — accesorios
- `P` — pantalones
- `T` — tops
- `V` — vestidos
- `C` — chaquetas

Por ejemplo, `LOOK 002` puede incluir `T001`, `F001`, `Z001` y `A001`.

## Estado del contenido

Los enlaces de productos y algunos elementos de los catálogos son provisionales hasta incorporar fotografías recortadas y enlaces de afiliación reales.
