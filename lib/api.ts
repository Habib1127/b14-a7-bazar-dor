import { cache } from "react";
import { normalizeCategory, normalizeProduct, unwrapList, unwrapOne } from "./normalize";
import type { Category, Product } from "./types";

const BASES = [
  process.env.NEXT_PUBLIC_API_URL,
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
].filter((b): b is string => Boolean(b));

async function getJson(path: string): Promise<unknown | null> {
  for (const base of BASES) {
    try {
      const res = await fetch(`${base}${path}`, { next: { revalidate: 300 } });
      if (res.ok) return await res.json();
    } catch {
      continue;
    }
  }
  return null;
}

export const fallbackCategories: Category[] = [
  { slug: "chal", name: "চাল", emoji: "🍚" },
  { slug: "dal", name: "ডাল", emoji: "🫘" },
  { slug: "tel", name: "তেল", emoji: "🛢️" },
  { slug: "sobji", name: "সবজি", emoji: "🥬" },
  { slug: "mach", name: "মাছ", emoji: "🐟" },
  { slug: "mangsho", name: "মাংস", emoji: "🍗" },
  { slug: "dim-dudh", name: "ডিম-দুধ", emoji: "🥛" },
  { slug: "moshla", name: "মসলা", emoji: "🌶️" },
];

export const getCategories = cache(async (): Promise<Category[]> => {
  const json = await getJson("/categories");
  const list = unwrapList(json, ["categories"])
    .map(normalizeCategory)
    .filter((c) => c.slug);
  return list.length ? list : fallbackCategories;
});

export const getProducts = cache(async (category?: string): Promise<Product[]> => {
  const query = category ? `?category=${encodeURIComponent(category)}` : "";
  const json = await getJson(`/products${query}`);
  const list = unwrapList(json, ["products"])
    .map(normalizeProduct)
    .filter((p) => p.id && p.name);
  if (category && list.some((p) => p.category) && list.some((p) => p.category !== category)) {
    return list.filter((p) => p.category === category);
  }
  return list;
});

export const getProduct = cache(async (id: string): Promise<Product | null> => {
  const json = await getJson(`/products/${encodeURIComponent(id)}`);
  const raw = unwrapOne(json, ["product"]);
  if (raw) {
    const p = normalizeProduct(raw);
    if (p.id && p.name) return p;
  }
  const all = await getProducts();
  return all.find((p) => p.id === id) || null;
});
