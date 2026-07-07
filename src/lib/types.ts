export interface Mood {
  id: number;
  name: string;
  slug: string;
  color: string;
  description: string;
  sortOrder: number;
}

export interface Look {
  id: number;
  number: number;
  slug: string;
  coverImage: string;
  coverAlt: string;
  description: string | null;
  publishedAt: string;
  moodName?: string;
  moodSlug?: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string | null;
  image: string | null;
  categoryName: string;
  categorySlug: string;
  retailerName?: string;
  affiliateUrl?: string;
  priceCents?: number | null;
  currency?: string;
}
