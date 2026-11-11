export type Market = {
  name: string;
  division: string;
  min: number;
  max: number;
  avg: number;
};

export type Product = {
  id: string;
  name: string;
  emoji: string;
  unit: string;
  category: string;
  categoryName: string;
  description: string;
  price: number;
  change: number;
  min: number;
  max: number;
  avg: number;
  minMarket: string;
  maxMarket: string;
  markets: Market[];
};

export type Category = {
  slug: string;
  name: string;
  emoji: string;
};
