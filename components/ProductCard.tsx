import Link from "next/link";
import PriceBadge from "./PriceBadge";
import { formatPrice, unitLabel } from "@/lib/format";
import type { Product } from "@/lib/types";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/product/${encodeURIComponent(product.id)}`}
      className="block rounded-2xl border border-base-300 bg-base-100 p-4 transition hover:-translate-y-0.5 hover:border-primary hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-base-200 text-2xl">
          {product.emoji}
        </div>
        <div className="min-w-0">
          <p className="truncate text-base font-semibold">{product.name}</p>
          <p className="text-xs opacity-70">{unitLabel(product.unit)}</p>
        </div>
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-xs opacity-70">আজকের দাম</p>
          <p className="text-xl font-bold">{formatPrice(product.price)}</p>
        </div>
        <PriceBadge change={product.change} />
      </div>
    </Link>
  );
}
