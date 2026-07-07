import { findCategories, findNames, looks, moods, productCodesByLook, products } from '../data/demo';
import type { Look, Mood, Product } from './types';

export interface ContentRepository {
  getMoods(): Promise<Mood[]>;
  getLatestLooks(): Promise<Look[]>;
  getLook(number: string): Promise<Look | null>;
  getLooksByMood(code: string): Promise<Look[]>;
  getProductsByLook(number: string): Promise<Product[]>;
  getFinds(shop: string): Promise<Product[]>;
}

export function createRepository(db?: D1Database): ContentRepository {
  return db ? createD1Repository(db) : createDemoRepository();
}

function createDemoRepository(): ContentRepository {
  return {
    async getMoods() { return moods; },
    async getLatestLooks() { return [...looks].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); },
    async getLook(number) { return looks.find((look) => String(look.number).padStart(3, '0') === number) ?? null; },
    async getLooksByMood(code) { return looks.filter((look) => look.moodCode === code); },
    async getProductsByLook(number) {
      const codes = productCodesByLook[number] ?? [];
      return codes.map((code) => products.find((product) => product.code === code)).filter(Boolean) as Product[];
    },
    async getFinds(shop) {
      const key = shop.toLowerCase() as keyof typeof findNames;
      const shopName = key === 'amazon' ? 'AMAZON' : 'SHEIN';
      return (findNames[key] ?? []).map((name, index) => ({
        id: index + 1,
        code: `${key.slice(0, 1).toUpperCase()}${String(index + 1).padStart(3, '0')}`,
        name,
        description: null,
        image: null,
        categoryName: findCategories[index].replaceAll('-', ' '),
        categoryCode: findCategories[index].replaceAll('-', '_').toUpperCase(),
        shop: shopName,
        affiliateUrl: '#',
        active: true,
      }));
    },
  };
}

function createD1Repository(db: D1Database): ContentRepository {
  const mapLook = (row: Record<string, unknown>): Look => ({
    id: Number(row.id),
    number: Number(row.number),
    coverImage: String(row.cover_image),
    coverAlt: String(row.cover_alt),
    description: row.description ? String(row.description) : null,
    publishedAt: String(row.published_at),
    moodName: row.mood_name ? String(row.mood_name) : undefined,
    moodCode: row.mood_code ? String(row.mood_code) : undefined,
  });

  return {
    async getMoods() {
      const { results } = await db.prepare('SELECT id, code, name, color, description, sort_order FROM moods ORDER BY sort_order').all();
      return results.map((row: Record<string, unknown>) => ({
        id: Number(row.id),
        code: String(row.code),
        name: String(row.name),
        color: String(row.color),
        description: String(row.description),
        sortOrder: Number(row.sort_order),
      }));
    },
    async getLatestLooks() {
      const { results } = await db.prepare(`
        SELECT l.*, m.name mood_name, m.code mood_code
        FROM looks l
        JOIN moods m ON m.id = l.mood_id
        WHERE l.status = 'published'
        ORDER BY l.published_at DESC
      `).all();
      return results.map(mapLook);
    },
    async getLook(number) {
      const row = await db.prepare(`
        SELECT l.*, m.name mood_name, m.code mood_code
        FROM looks l
        JOIN moods m ON m.id = l.mood_id
        WHERE l.number = ? AND l.status = 'published'
        LIMIT 1
      `).bind(Number(number)).first();
      return row ? mapLook(row) : null;
    },
    async getLooksByMood(code) {
      const { results } = await db.prepare(`
        SELECT l.*, m.name mood_name, m.code mood_code
        FROM looks l
        JOIN moods m ON m.id = l.mood_id
        WHERE m.code = ? AND l.status = 'published'
        ORDER BY l.published_at DESC
      `).bind(code).all();
      return results.map(mapLook);
    },
    async getProductsByLook(number) {
      const { results } = await db.prepare(`
        SELECT p.id, p.code, p.name, p.description, p.image, p.shop,
               p.affiliate_url, p.active, pc.name category_name, pc.code category_code
        FROM products p
        JOIN product_categories pc ON pc.id = p.category_id
        JOIN look_products lp ON lp.product_id = p.id
        JOIN looks l ON l.id = lp.look_id
        WHERE l.number = ? AND p.active = 1
        ORDER BY lp.position
      `).bind(Number(number)).all();
      return results.map(mapProduct);
    },
    async getFinds(shop) {
      const { results } = await db.prepare(`
        SELECT p.id, p.code, p.name, p.description, p.image, p.shop,
               p.affiliate_url, p.active, pc.name category_name, pc.code category_code
        FROM products p
        JOIN product_categories pc ON pc.id = p.category_id
        WHERE p.shop = ? AND p.active = 1
        ORDER BY p.created_at DESC
      `).bind(shop.toUpperCase()).all();
      return results.map(mapProduct);
    },
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id),
    code: String(row.code),
    name: String(row.name),
    description: row.description ? String(row.description) : null,
    image: row.image ? String(row.image) : null,
    categoryName: String(row.category_name),
    categoryCode: String(row.category_code),
    shop: String(row.shop) as Product['shop'],
    affiliateUrl: String(row.affiliate_url),
    active: Boolean(row.active),
  };
}
