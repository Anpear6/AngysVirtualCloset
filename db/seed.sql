PRAGMA foreign_keys = ON;

INSERT OR IGNORE INTO moods (id, name, slug, color, description, sort_order) VALUES
  (1, 'Hibiscus Summer', 'hibiscus', '#ea9dae', 'Rosa, flores y calor.', 1),
  (2, 'Orange Girl', 'orange', '#f98256', 'Cítricos, sol y energía.', 2),
  (3, 'Blue Lagoon', 'lagoon', '#8fcbd4', 'Turquesa, playa y brisa.', 3),
  (4, 'Disco Sunset', 'disco', '#fbde9c', 'Brillo, noche y drama.', 4);

INSERT OR IGNORE INTO product_categories (id, name, slug, prefix, sort_order) VALUES
  (1, 'Tops', 'tops', 'T', 1),
  (2, 'Faldas largas', 'faldas-largas', 'F', 2),
  (3, 'Faldas cortas', 'faldas-cortas', 'F', 3),
  (4, 'Pantalones', 'pantalones', 'P', 4),
  (5, 'Chaquetas', 'chaquetas', 'C', 5),
  (6, 'Vestidos', 'vestidos', 'V', 6),
  (7, 'Zapatos', 'zapatos', 'Z', 7),
  (8, 'Accesorios', 'accesorios', 'A', 8);

INSERT OR IGNORE INTO retailers (id, name, slug) VALUES
  (1, 'Amazon', 'amazon'),
  (2, 'Shein', 'shein');

INSERT OR IGNORE INTO looks (id, number, slug, cover_image, cover_alt, description, published_at, status) VALUES
  (1, 1, '001', '/images/outfits/e43b02943bacb5b1b793d9a5e03683f7.jpg', 'Look con falda larga estampada en una calle mediterránea', 'Todas las piezas que componen el look.', '2026-07-01', 'published'),
  (2, 2, '002', '/images/outfits/002-minifalda-vaquera-kiosco-helados-v2.png', 'Look en tonos pastel junto a un kiosco de helados', 'Todas las piezas que componen el look.', '2026-07-02', 'published'),
  (3, 3, '003', '/images/outfits/003-pantalon-rayas-atardecer-playa.png', 'Pantalón de rayas rosas al atardecer en la playa', 'Todas las piezas que componen el look.', '2026-07-03', 'published');

INSERT OR IGNORE INTO look_moods (look_id, mood_id) VALUES
  (1, 2), (1, 1),
  (2, 1), (2, 2), (2, 3),
  (3, 4), (3, 3);

INSERT OR IGNORE INTO products (id, code, category_id, name) VALUES
  (1, 'T001', 1, 'Top amarillo con flor'),
  (2, 'F001', 3, 'Minifalda vaquera de volantes'),
  (3, 'Z001', 7, 'Zapatillas naranja y rosa'),
  (4, 'A001', 8, 'Gafas de sol naranja'),
  (5, 'T002', 1, 'Top coral de verano'),
  (6, 'P001', 4, 'Pantalón palazzo rosa de rayas'),
  (7, 'A002', 8, 'Pulseras de cuentas'),
  (8, 'T003', 1, 'Top blanco de tirantes'),
  (9, 'F002', 2, 'Falda larga paisley'),
  (10, 'Z002', 7, 'Sandalias de cuero'),
  (11, 'A003', 8, 'Collar dorado');

INSERT OR IGNORE INTO look_products (look_id, product_id, position) VALUES
  (1, 8, 1), (1, 9, 2), (1, 10, 3), (1, 11, 4),
  (2, 1, 1), (2, 2, 2), (2, 3, 3), (2, 4, 4),
  (3, 5, 1), (3, 6, 2), (3, 7, 3);
