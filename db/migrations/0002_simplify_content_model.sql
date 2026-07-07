PRAGMA foreign_keys = OFF;

CREATE TABLE look_products_backup AS SELECT look_id, product_id, position FROM look_products;

CREATE TABLE moods_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

INSERT INTO moods_new (id, code, name, color, description, sort_order)
SELECT id, slug, name, color, description, sort_order FROM moods;

CREATE TABLE looks_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number INTEGER NOT NULL UNIQUE,
  mood_id INTEGER NOT NULL REFERENCES moods_new(id),
  cover_image TEXT NOT NULL,
  cover_alt TEXT NOT NULL,
  description TEXT,
  published_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

INSERT INTO looks_new (id, number, mood_id, cover_image, cover_alt, description, published_at, status)
SELECT
  l.id,
  l.number,
  CASE l.number WHEN 1 THEN 2 WHEN 2 THEN 1 WHEN 3 THEN 4
    ELSE (SELECT MIN(lm.mood_id) FROM look_moods lm WHERE lm.look_id = l.id)
  END,
  l.cover_image,
  l.cover_alt,
  l.description,
  l.published_at,
  l.status
FROM looks l;

CREATE TABLE product_categories_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL UNIQUE,
  product_prefix TEXT NOT NULL CHECK (length(product_prefix) = 1),
  sort_order INTEGER NOT NULL DEFAULT 0
);

INSERT INTO product_categories_new (id, code, name, product_prefix, sort_order)
SELECT id, upper(replace(slug, '-', '_')), name, prefix, sort_order FROM product_categories;

CREATE TABLE products_new (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  category_id INTEGER NOT NULL REFERENCES product_categories_new(id),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  shop TEXT NOT NULL CHECK (shop IN ('AMAZON', 'SHEIN', 'OTHER')),
  affiliate_url TEXT NOT NULL,
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products_new (id, code, category_id, name, description, image, shop, affiliate_url, active, created_at)
SELECT p.id, p.code, p.category_id, p.name, p.description, p.image, 'OTHER', '#', 1, p.created_at
FROM products p;

DROP TABLE IF EXISTS offers;
DROP TABLE IF EXISTS retailers;
DROP TABLE IF EXISTS look_moods;
DROP TABLE look_products;
DROP TABLE products;
DROP TABLE product_categories;
DROP TABLE looks;
DROP TABLE moods;

ALTER TABLE moods_new RENAME TO moods;
ALTER TABLE looks_new RENAME TO looks;
ALTER TABLE product_categories_new RENAME TO product_categories;
ALTER TABLE products_new RENAME TO products;

CREATE TABLE look_products (
  look_id INTEGER NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (look_id, product_id)
);

INSERT INTO look_products (look_id, product_id, position)
SELECT look_id, product_id, position FROM look_products_backup;

DROP TABLE look_products_backup;

CREATE INDEX idx_looks_status_published ON looks(status, published_at DESC);
CREATE INDEX idx_looks_mood_published ON looks(mood_id, status, published_at DESC);
CREATE INDEX idx_products_category ON products(category_id, code);
CREATE INDEX idx_products_shop_active ON products(shop, active);

PRAGMA foreign_keys = ON;
