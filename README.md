# Angy's Virtual Closet

Aplicación web dinámica para publicar outfits, organizar colecciones por *mood* y gestionar productos con enlaces de afiliación. Conserva una estética editorial maximalista inspirada en el verano mediterráneo y los años 2000.

## Stack

- **Astro + TypeScript** — componentes y renderizado en servidor.
- **Cloudflare Workers** — alojamiento y ejecución de la aplicación.
- **Cloudflare D1** — base de datos SQL.
- **Cloudflare R2** — almacenamiento de imágenes en la siguiente fase.
- **CSS propio** — diseño sin librerías visuales externas.

## Estructura

```text
AngysVirtualCloset/
├── db/
│   ├── migrations/          # Versiones del esquema D1
│   └── seed.sql             # Datos iniciales de desarrollo
├── public/
│   └── images/outfits/      # Imágenes públicas actuales
├── src/
│   ├── components/          # Cabecera, pie y tarjetas reutilizables
│   ├── data/                # Datos de respaldo para desarrollo
│   ├── layouts/             # Estructura HTML común
│   ├── lib/                 # Repositorio D1 y tipos del dominio
│   ├── pages/               # Rutas dinámicas de Astro
│   └── styles/              # CSS separado por sección
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── wrangler.jsonc           # Configuración de Cloudflare
```

## Desarrollo local

```powershell
npm install
npm run db:migrate:local
npm run db:seed:local
npm run dev
```

La aplicación estará disponible en `http://localhost:4321`.

## Comprobaciones

```powershell
npm run check
npm run build
```

## Rutas

- `/` — portada.
- `/looks/002` — ficha dinámica de un look.
- `/collections/hibiscus` — colección filtrada por mood.
- `/finds/amazon` — catálogo filtrable de Amazon.
- `/finds/shein` — catálogo filtrable de Shein.

## Modelo de dominio

El modelo utiliza cinco tablas: `moods`, `looks`, `product_categories`, `products` y `look_products`. Los identificadores internos (`id`) se mantienen separados de los códigos públicos (`number` y `code`). Cada producto guarda directamente su tienda y su enlace de afiliación.

## Backend y futuro panel

Astro se ejecuta dentro de un Cloudflare Worker, que actúa como backend. Las páginas públicas solo realizan lecturas. El futuro panel de administración enviará operaciones autenticadas al Worker para:

- crear y editar looks;
- gestionar prendas y enlaces de afiliación;
- asociar prendas con looks;
- subir imágenes a R2;
- guardar borradores y publicar contenido.

El navegador nunca tendrá acceso directo a D1. El panel se protegerá con Cloudflare Access para permitir únicamente la cuenta autorizada.

### Identificadores de prendas

- `F` — faldas
- `Z` — zapatos
- `A` — accesorios
- `P` — pantalones
- `T` — tops
- `V` — vestidos
- `C` — chaquetas

## Despliegue

Antes del primer despliegue hay que crear la base D1 en la cuenta de Cloudflare y sustituir `LOCAL_REPLACE_AFTER_CLOUDFLARE_SETUP` en `wrangler.jsonc` por su identificador real. Después:

```powershell
npm run db:migrate:remote
npm run deploy
```

Los enlaces de producto y parte del contenido comercial siguen siendo provisionales.
