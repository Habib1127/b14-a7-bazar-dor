"use client";

import { useMemo, useState } from "react";
import ProductCard from "./ProductCard";
import SortSelect, { type SortKey } from "./SortSelect";
import { formatCount } from "@/lib/format";
import type { Category, Product } from "@/lib/types";

type Props = {
  products: Product[];
  categories?: Category[];
  withSearch?: boolean;
};

export default function ProductBrowser({ products, categories = [], withSearch = false }: Props) {
  const [sort, setSort] = useState<SortKey>("default");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = products.filter((p) => {
      if (category !== "all" && p.category !== category) return false;
      if (q && !p.name.toLowerCase().includes(q)) return false;
      return true;
    });
    if (sort === "asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "desc") list = [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [products, query, category, sort]);

  return (
    <div className="space-y-4">
      <div className="space-y-3 rounded-2xl border border-base-300 bg-base-100 p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {withSearch ? (
            <label className="flex h-10 flex-1 items-center gap-2 rounded-lg border border-base-300 bg-base-100 px-3 focus-within:border-primary sm:max-w-xs">
              <span>🔍</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="পণ্যের নাম লিখুন…"
                className="w-full bg-transparent text-sm outline-none"
              />
            </label>
          ) : (
            <span />
          )}
          <SortSelect value={sort} onChange={setSort} />
        </div>

        {withSearch && categories.length > 0 && (
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {[{ slug: "all", name: "সব" }, ...categories].map((c) => (
              <button
                key={c.slug}
                onClick={() => setCategory(c.slug)}
                className={`h-6 shrink-0 rounded-full px-3 text-xs font-semibold transition ${
                  category === c.slug
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 hover:bg-base-300"
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <p className="text-sm opacity-70">মোট {formatCount(visible.length)}টি পণ্য দেখানো হচ্ছে</p>

      {visible.length ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center text-sm opacity-70">
          কোনো পণ্য পাওয়া যায়নি।
        </div>
      )}
    </div>
  );
}
