PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO moods (id, code, name, color, description, sort_order) VALUES
  (1, 'hibiscus', 'Hibiscus Summer', '#ea9dae', 'Rosa, flores y calor.', 1),
  (2, 'orange', 'Orange Girl', '#f98256', 'Cítricos, sol y energía.', 2),
  (3, 'lagoon', 'Blue Lagoon', '#8fcbd4', 'Turquesa, playa y brisa.', 3),
  (4, 'disco', 'Disco Sunset', '#fbde9c', 'Brillo, noche y drama.', 4);

INSERT OR IGNORE INTO product_categories (id, code, name, product_prefix, sort_order) VALUES
  (1, 'TOP', 'Tops', 'T', 1),
  (2, 'FALDA_LARGA', 'Faldas largas', 'F', 2),
  (3, 'FALDA_CORTA', 'Faldas cortas', 'F', 3),
  (4, 'PANTALON', 'Pantalones', 'P', 4),
  (5, 'CHAQUETA', 'Chaquetas', 'C', 5),
  (6, 'VESTIDO', 'Vestidos', 'V', 6),
  (7, 'ZAPATO', 'Zapatos', 'Z', 7),
  (8, 'ACCESORIO', 'Accesorios', 'A', 8);

INSERT OR IGNORE INTO looks (id, number, mood_id, cover_image, cover_alt, description, published_at, status) VALUES
  (1, 1, 2, '/images/outfits/e43b02943bacb5b1b793d9a5e03683f7.jpg', 'Look con falda larga estampada en una calle mediterránea', 'Todas las piezas que componen el look.', '2026-07-01', 'published'),
  (2, 2, 1, '/images/outfits/002-minifalda-vaquera-kiosco-helados-v2.png', 'Look en tonos pastel junto a un kiosco de helados', 'Todas las piezas que componen el look.', '2026-07-02', 'published'),
  (3, 3, 4, '/images/outfits/003-pantalon-rayas-atardecer-playa.png', 'Pantalón de rayas rosas al atardecer en la playa', 'Todas las piezas que componen el look.', '2026-07-03', 'published');

INSERT OR IGNORE INTO products (id, code, category_id, name, shop, affiliate_url) VALUES
  (1, 'T001', 1, 'Top amarillo con flor', 'OTHER', '#'),
  (2, 'F001', 3, 'Minifalda vaquera de volantes', 'OTHER', '#'),
  (3, 'Z001', 7, 'Zapatillas naranja y rosa', 'OTHER', '#'),
  (4, 'A001', 8, 'Gafas de sol naranja', 'OTHER', '#'),
  (5, 'T002', 1, 'Top coral de verano', 'OTHER', '#'),
  (6, 'P001', 4, 'Pantalón palazzo rosa de rayas', 'OTHER', '#'),
  (7, 'A002', 8, 'Pulseras de cuentas', 'OTHER', '#'),
  (8, 'T003', 1, 'Top blanco de tirantes', 'OTHER', '#'),
  (9, 'F002', 2, 'Falda larga paisley', 'OTHER', '#'),
  (10, 'Z002', 7, 'Sandalias de cuero', 'OTHER', '#'),
  (11, 'A003', 8, 'Collar dorado', 'OTHER', '#');

INSERT OR IGNORE INTO look_products (look_id, product_id, position) VALUES
  (1, 8, 1), (1, 9, 2), (1, 10, 3), (1, 11, 4),
  (2, 1, 1), (2, 2, 2), (2, 3, 3), (2, 4, 4),
  (3, 5, 1), (3, 6, 2), (3, 7, 3);
