import { formatPercent } from "@/lib/format";

export function direction(change: number) {
  if (change > 0.0001) return "up";
  if (change < -0.0001) return "down";
  return "flat";
}

const styles = {
  up: "text-up",
  down: "text-down",
  flat: "text-flat",
};

const arrows = { up: "▲", down: "▼", flat: "—" };

export default function PriceBadge({ change, size = "sm" }: { change: number; size?: "sm" | "md" }) {
  const dir = direction(change);
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-base-200 font-semibold ${styles[dir]} ${
        size === "sm" ? "px-2.5 py-1 text-xs" : "px-3 py-1 text-sm"
      }`}
    >
      <span>{arrows[dir]}</span>
      <span>{formatPercent(change)}</span>
    </span>
  );
}
