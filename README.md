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

Los looks, moods y productos se relacionan mediante tablas intermedias. Una prenda puede aparecer en varios looks y tener ofertas de distintos retailers sin duplicar información.

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
