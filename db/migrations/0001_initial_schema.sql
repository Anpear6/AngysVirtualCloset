PRAGMA foreign_keys = ON;

CREATE TABLE moods (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE looks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  number INTEGER NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  cover_image TEXT NOT NULL,
  cover_alt TEXT NOT NULL,
  description TEXT,
  published_at TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published'))
);

CREATE TABLE look_moods (
  look_id INTEGER NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  mood_id INTEGER NOT NULL REFERENCES moods(id) ON DELETE CASCADE,
  PRIMARY KEY (look_id, mood_id)
);

CREATE TABLE product_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  prefix TEXT NOT NULL CHECK (length(prefix) = 1),
  sort_order INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL UNIQUE,
  category_id INTEGER NOT NULL REFERENCES product_categories(id),
  name TEXT NOT NULL,
  description TEXT,
  image TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE look_products (
  look_id INTEGER NOT NULL REFERENCES looks(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  position INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (look_id, product_id)
);

CREATE TABLE retailers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE
);

CREATE TABLE offers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  retailer_id INTEGER NOT NULL REFERENCES retailers(id) ON DELETE CASCADE,
  affiliate_url TEXT NOT NULL,
  price_cents INTEGER,
  currency TEXT NOT NULL DEFAULT 'EUR',
  active INTEGER NOT NULL DEFAULT 1 CHECK (active IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (product_id, retailer_id)
);

CREATE INDEX idx_looks_status_published ON looks(status, published_at DESC);
CREATE INDEX idx_look_moods_mood ON look_moods(mood_id, look_id);
CREATE INDEX idx_products_category ON products(category_id, code);
CREATE INDEX idx_offers_retailer_active ON offers(retailer_id, active);
