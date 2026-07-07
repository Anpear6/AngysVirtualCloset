export interface Mood {
  id: number;
  name: string;
  code: string;
  color: string;
  description: string;
  sortOrder: number;
}

export interface Look {
  id: number;
  number: number;
  coverImage: string;
  coverAlt: string;
  description: string | null;
  publishedAt: string;
  moodName?: string;
  moodCode?: string;
}

export interface Product {
  id: number;
  code: string;
  name: string;
  description: string | null;
  image: string | null;
  categoryName: string;
  categoryCode: string;
  shop: 'AMAZON' | 'SHEIN' | 'OTHER';
  affiliateUrl: string;
  active: boolean;
}
