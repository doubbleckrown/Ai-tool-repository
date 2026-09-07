export type Pricing = "free" | "freemium" | "paid";

export interface Tool {
  id: string;
  name: string;
  tagline: string;
  description: string;
  website: string;
  logoUrl: string;
  categories: string[];
  pricing: Pricing;
  featured?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
}
