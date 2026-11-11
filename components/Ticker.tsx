import { formatNumber, formatPercent, unitShort } from "@/lib/format";
import { direction } from "./PriceBadge";
import type { Product } from "@/lib/types";

const colors = { up: "text-up", down: "text-down", flat: "text-flat" };
const arrows = { up: "▲", down: "▼", flat: "—" };

export default function Ticker({ products }: { products: Product[] }) {
  if (!products.length) return null;
  const items = [...products, ...products];
  return (
    <div className="ticker-wrap overflow-hidden border-b border-base-300 bg-base-100">
      <div className="ticker-track">
        {items.map((p, i) => {
          const dir = direction(p.change);
          return (
            <div
              key={`${p.id}-${i}`}
              className="flex h-9 shrink-0 items-center gap-2 border-r border-base-200 px-4 text-sm whitespace-nowrap"
            >
              <span>{p.emoji}</span>
              <span className="font-medium">{p.name}</span>
              <span>
                {formatNumber(p.price)} টাকা/{unitShort(p.unit)}
              </span>
              <span className={`font-semibold ${colors[dir]}`}>
                {arrows[dir]} {formatPercent(p.change)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
