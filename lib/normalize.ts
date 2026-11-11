import { toNumber } from "./format";
import type { Category, Market, Product } from "./types";

type Raw = Record<string, unknown>;

function pick(obj: Raw, keys: string[]): unknown {
  for (const k of keys) {
    if (obj[k] !== undefined && obj[k] !== null && obj[k] !== "") return obj[k];
  }
  return undefined;
}

function str(value: unknown, fallback = ""): string {
  if (typeof value === "string") return value;
  if (typeof value === "number") return String(value);
  return fallback;
}

export function unwrapList(json: unknown, keys: string[]): Raw[] {
  if (Array.isArray(json)) return json as Raw[];
  if (json && typeof json === "object") {
    const obj = json as Raw;
    for (const k of [...keys, "data", "result", "results", "items"]) {
      const v = obj[k];
      if (Array.isArray(v)) return v as Raw[];
      if (v && typeof v === "object") {
        const inner = unwrapList(v, keys);
        if (inner.length) return inner;
      }
    }
  }
  return [];
}

export function unwrapOne(json: unknown, keys: string[]): Raw | null {
  if (!json || typeof json !== "object" || Array.isArray(json)) return null;
  const obj = json as Raw;
  for (const k of [...keys, "data", "result"]) {
    const v = obj[k];
    if (v && typeof v === "object" && !Array.isArray(v)) return v as Raw;
  }
  return obj;
}

export function normalizeCategory(raw: Raw): Category {
  const slug = str(pick(raw, ["slug", "id", "key", "category", "_id"]));
  return {
    slug,
    name: str(pick(raw, ["name", "title", "label", "nameBn", "bn"]), slug),
    emoji: str(pick(raw, ["emoji", "icon", "image"]), "🛒"),
  };
}

function normalizeMarket(raw: Raw): Market {
  const single = toNumber(pick(raw, ["price"]));
  const min = toNumber(pick(raw, ["min", "minPrice", "minimum", "lowest", "low"]));
  const max = toNumber(pick(raw, ["max", "maxPrice", "maximum", "highest", "high"]));
  const avg = toNumber(pick(raw, ["avg", "avgPrice", "average", "averagePrice"]));
  const lo = min || single || avg;
  const hi = max || single || avg;
  return {
    name: str(pick(raw, ["name", "market", "marketName", "bazar", "bazaar", "title"])),
    division: str(pick(raw, ["division", "region", "location", "area", "city", "district"])),
    min: lo,
    max: hi,
    avg: avg || single || (lo && hi ? (lo + hi) / 2 : lo || hi),
  };
}

export function normalizeProduct(raw: Raw): Product {
  const catRaw = pick(raw, ["category", "categorySlug", "category_id", "categoryId"]);
  let category = "";
  let categoryName = "";
  if (catRaw && typeof catRaw === "object") {
    const c = normalizeCategory(catRaw as Raw);
    category = c.slug;
    categoryName = c.name;
  } else {
    category = str(catRaw);
    categoryName = str(pick(raw, ["categoryName", "category_name", "categoryBn"]), category);
  }

  const marketList = pick(raw, ["markets", "marketPrices", "market_prices", "bazars", "prices"]);
  const markets = Array.isArray(marketList)
    ? (marketList as Raw[]).filter((m) => m && typeof m === "object").map(normalizeMarket)
    : [];

  const prev = toNumber(pick(raw, ["previousPrice", "prevPrice", "yesterdayPrice", "lastPrice", "oldPrice"]));
  let price = toNumber(pick(raw, ["price", "todayPrice", "currentPrice", "today_price"]));

  const avgFromMarkets = markets.length
    ? markets.reduce((s, m) => s + m.avg, 0) / markets.length
    : 0;
  const avg = toNumber(pick(raw, ["avgPrice", "averagePrice", "avg", "average"])) || avgFromMarkets || price;
  if (!price) price = avg;

  const lowest = markets.length ? markets.reduce((a, b) => (b.min < a.min ? b : a)) : null;
  const highest = markets.length ? markets.reduce((a, b) => (b.max > a.max ? b : a)) : null;

  const min = toNumber(pick(raw, ["minPrice", "min", "lowestPrice"])) || (lowest ? lowest.min : price);
  const max = toNumber(pick(raw, ["maxPrice", "max", "highestPrice"])) || (highest ? highest.max : price);

  let change = toNumber(
    pick(raw, ["changePercent", "change_percent", "percentChange", "changePct", "change", "priceChange", "percent"])
  );
  const trend = str(pick(raw, ["trend", "direction", "status"])).toLowerCase();
  if (change > 0 && (trend === "down" || trend === "fall" || trend === "decrease")) change = -change;
  if (change === 0 && prev && price) change = ((price - prev) / prev) * 100;

  return {
    id: str(pick(raw, ["id", "slug", "_id"])),
    name: str(pick(raw, ["name", "title", "nameBn", "bn"])),
    emoji: str(pick(raw, ["emoji", "icon", "image", "thumbnail"]), "🛒"),
    unit: str(pick(raw, ["unit", "per", "unitName"]), "কেজি"),
    category,
    categoryName,
    description: str(pick(raw, ["description", "summary", "subtitle", "details", "note"])),
    price,
    change,
    min,
    max,
    avg,
    minMarket: lowest ? lowest.name : "",
    maxMarket: highest ? highest.name : "",
    markets,
  };
}
