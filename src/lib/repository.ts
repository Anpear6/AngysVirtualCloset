import { findCategories, findNames, lookMoodSlugs, looks, moods, productCodesByLook, products } from '../data/demo';
import type { Look, Mood, Product } from './types';

export interface ContentRepository {
  getMoods(): Promise<Mood[]>;
  getLatestLooks(): Promise<Look[]>;
  getLook(slug: string): Promise<Look | null>;
  getLooksByMood(slug: string): Promise<Look[]>;
  getProductsByLook(slug: string): Promise<Product[]>;
  getFinds(retailer: string): Promise<Product[]>;
}

export function createRepository(db?: D1Database): ContentRepository {
  return db ? createD1Repository(db) : createDemoRepository();
}

function createDemoRepository(): ContentRepository {
  return {
    async getMoods() { return moods; },
    async getLatestLooks() { return [...looks].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)); },
    async getLook(slug) { return looks.find((look) => look.slug === slug) ?? null; },
    async getLooksByMood(slug) { return looks.filter((look) => lookMoodSlugs[look.slug]?.includes(slug)); },
    async getProductsByLook(slug) {
      const codes = productCodesByLook[slug] ?? [];
      return codes.map((code) => products.find((product) => product.code === code)).filter(Boolean) as Product[];
    },
    async getFinds(retailer) {
      const key = retailer.toLowerCase() as keyof typeof findNames;
      return (findNames[key] ?? []).map((name, index) => ({
        id: index + 1, code: `${key.slice(0, 1).toUpperCase()}${String(index + 1).padStart(3, '0')}`,
        name, description: null, image: null,
        categoryName: findCategories[index].replaceAll('-', ' '), categorySlug: findCategories[index],
        retailerName: key === 'amazon' ? 'Amazon' : 'Shein', affiliateUrl: '#', priceCents: null, currency: 'EUR',
      }));
    },
  };
}

function createD1Repository(db: D1Database): ContentRepository {
  const mapLook = (row: Record<string, unknown>): Look => ({
    id: Number(row.id), number: Number(row.number), slug: String(row.slug),
    coverImage: String(row.cover_image), coverAlt: String(row.cover_alt),
    description: row.description ? String(row.description) : null,
    publishedAt: String(row.published_at),
    moodName: row.mood_name ? String(row.mood_name) : undefined,
    moodSlug: row.mood_slug ? String(row.mood_slug) : undefined,
  });

  return {
    async getMoods() {
      const { results } = await db.prepare('SELECT id, name, slug, color, description, sort_order FROM moods ORDER BY sort_order').all();
      return results.map((row: Record<string, unknown>) => ({ id: Number(row.id), name: String(row.name), slug: String(row.slug), color: String(row.color), description: String(row.description), sortOrder: Number(row.sort_order) }));
    },
    async getLatestLooks() {
      const { results } = await db.prepare(`SELECT l.*, m.name mood_name, m.slug mood_slug FROM looks l LEFT JOIN look_moods lm ON lm.look_id=l.id LEFT JOIN moods m ON m.id=lm.mood_id WHERE l.status='published' GROUP BY l.id ORDER BY l.published_at DESC`).all();
      return results.map(mapLook);
    },
    async getLook(slug) {
      const row = await db.prepare(`SELECT l.*, m.name mood_name, m.slug mood_slug FROM looks l LEFT JOIN look_moods lm ON lm.look_id=l.id LEFT JOIN moods m ON m.id=lm.mood_id WHERE l.slug=? AND l.status='published' LIMIT 1`).bind(slug).first();
      return row ? mapLook(row) : null;
    },
    async getLooksByMood(slug) {
      const { results } = await db.prepare(`SELECT l.*, m.name mood_name, m.slug mood_slug FROM looks l JOIN look_moods lm ON lm.look_id=l.id JOIN moods m ON m.id=lm.mood_id WHERE m.slug=? AND l.status='published' ORDER BY l.published_at DESC`).bind(slug).all();
      return results.map(mapLook);
    },
    async getProductsByLook(slug) {
      const { results } = await db.prepare(`SELECT p.id,p.code,p.name,p.description,p.image,pc.name category_name,pc.slug category_slug FROM products p JOIN product_categories pc ON pc.id=p.category_id JOIN look_products lp ON lp.product_id=p.id JOIN looks l ON l.id=lp.look_id WHERE l.slug=? ORDER BY lp.position`).bind(slug).all();
      return results.map(mapProduct);
    },
    async getFinds(retailer) {
      const { results } = await db.prepare(`SELECT p.id,p.code,p.name,p.description,p.image,pc.name category_name,pc.slug category_slug,r.name retailer_name,o.affiliate_url,o.price_cents,o.currency FROM products p JOIN product_categories pc ON pc.id=p.category_id JOIN offers o ON o.product_id=p.id JOIN retailers r ON r.id=o.retailer_id WHERE r.slug=? AND o.active=1 ORDER BY p.created_at DESC`).bind(retailer).all();
      return results.map(mapProduct);
    },
  };
}

function mapProduct(row: Record<string, unknown>): Product {
  return {
    id: Number(row.id), code: String(row.code), name: String(row.name),
    description: row.description ? String(row.description) : null,
    image: row.image ? String(row.image) : null,
    categoryName: String(row.category_name), categorySlug: String(row.category_slug),
    retailerName: row.retailer_name ? String(row.retailer_name) : undefined,
    affiliateUrl: row.affiliate_url ? String(row.affiliate_url) : undefined,
    priceCents: row.price_cents == null ? null : Number(row.price_cents),
    currency: row.currency ? String(row.currency) : undefined,
  };
}
