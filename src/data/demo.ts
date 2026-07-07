import type { Look, Mood, Product } from '@lib/types';

export const moods: Mood[] = [
  { id: 1, name: 'Hibiscus Summer', slug: 'hibiscus', color: '#ea9dae', description: 'Rosa, flores y calor.', sortOrder: 1 },
  { id: 2, name: 'Orange Girl', slug: 'orange', color: '#f98256', description: 'Cítricos, sol y energía.', sortOrder: 2 },
  { id: 3, name: 'Blue Lagoon', slug: 'lagoon', color: '#8fcbd4', description: 'Turquesa, playa y brisa.', sortOrder: 3 },
  { id: 4, name: 'Disco Sunset', slug: 'disco', color: '#fbde9c', description: 'Brillo, noche y drama.', sortOrder: 4 },
];

export const looks: Look[] = [
  {
    id: 1, number: 1, slug: '001',
    coverImage: '/images/outfits/e43b02943bacb5b1b793d9a5e03683f7.jpg',
    coverAlt: 'Look con falda larga estampada en una calle mediterránea',
    description: 'Todas las piezas que componen el look.', publishedAt: '2026-07-01',
    moodName: 'Orange Girl', moodSlug: 'orange',
  },
  {
    id: 2, number: 2, slug: '002',
    coverImage: '/images/outfits/002-minifalda-vaquera-kiosco-helados-v2.png',
    coverAlt: 'Look en tonos pastel junto a un kiosco de helados',
    description: 'Todas las piezas que componen el look.', publishedAt: '2026-07-02',
    moodName: 'Hibiscus Summer', moodSlug: 'hibiscus',
  },
  {
    id: 3, number: 3, slug: '003',
    coverImage: '/images/outfits/003-pantalon-rayas-atardecer-playa.png',
    coverAlt: 'Pantalón de rayas rosas al atardecer en la playa',
    description: 'Todas las piezas que componen el look.', publishedAt: '2026-07-03',
    moodName: 'Disco Sunset', moodSlug: 'disco',
  },
];

export const lookMoodSlugs: Record<string, string[]> = {
  '001': ['orange', 'hibiscus'],
  '002': ['hibiscus', 'orange', 'lagoon'],
  '003': ['disco', 'lagoon'],
};

export const products: Product[] = [
  { id: 1, code: 'T001', name: 'Top amarillo con flor', description: null, image: null, categoryName: 'Tops', categorySlug: 'tops' },
  { id: 2, code: 'F001', name: 'Minifalda vaquera de volantes', description: null, image: null, categoryName: 'Faldas cortas', categorySlug: 'faldas-cortas' },
  { id: 3, code: 'Z001', name: 'Zapatillas naranja y rosa', description: null, image: null, categoryName: 'Zapatos', categorySlug: 'zapatos' },
  { id: 4, code: 'A001', name: 'Gafas de sol naranja', description: null, image: null, categoryName: 'Accesorios', categorySlug: 'accesorios' },
  { id: 5, code: 'T002', name: 'Top coral de verano', description: null, image: null, categoryName: 'Tops', categorySlug: 'tops' },
  { id: 6, code: 'P001', name: 'Pantalón palazzo rosa de rayas', description: null, image: null, categoryName: 'Pantalones', categorySlug: 'pantalones' },
  { id: 7, code: 'A002', name: 'Pulseras de cuentas', description: null, image: null, categoryName: 'Accesorios', categorySlug: 'accesorios' },
  { id: 8, code: 'T003', name: 'Top blanco de tirantes', description: null, image: null, categoryName: 'Tops', categorySlug: 'tops' },
  { id: 9, code: 'F002', name: 'Falda larga paisley', description: null, image: null, categoryName: 'Faldas largas', categorySlug: 'faldas-largas' },
  { id: 10, code: 'Z002', name: 'Sandalias de cuero', description: null, image: null, categoryName: 'Zapatos', categorySlug: 'zapatos' },
  { id: 11, code: 'A003', name: 'Collar dorado', description: null, image: null, categoryName: 'Accesorios', categorySlug: 'accesorios' },
];

export const productCodesByLook: Record<string, string[]> = {
  '001': ['T003', 'F002', 'Z002', 'A003'],
  '002': ['T001', 'F001', 'Z001', 'A001'],
  '003': ['T002', 'P001', 'A002'],
};

export const findNames = {
  amazon: ['Top de crochet solar', 'Falda larga estampada', 'Minifalda denim', 'Pantalón de rayas', 'Chaqueta bordada', 'Gafas naranjas', 'Bolso de cuentas', 'Pendientes hibisco'],
  shein: ['Top halter floral', 'Falda boho paisley', 'Falda mini de volantes', 'Pantalón palazzo coral', 'Chaqueta patchwork', 'Collar de cuentas', 'Bolso con flores', 'Anillos de colores'],
};

export const findCategories = ['tops', 'faldas-largas', 'faldas-cortas', 'pantalones', 'chaquetas', 'accesorios', 'accesorios', 'accesorios'];
