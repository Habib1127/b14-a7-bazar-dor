import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";

export default function PriceMovers({
  title,
  type,
  products,
}: {
  title: string;
  type: "up" | "down";
  products: Product[];
}) {
  if (!products.length) return null;
  return (
    <section className="space-y-4">
      <h2 className="flex items-center gap-2 text-xl font-bold">
        <span className={type === "up" ? "text-up" : "text-down"}>{type === "up" ? "▲" : "▼"}</span>
        {title}
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
