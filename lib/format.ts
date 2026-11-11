const bnNumber = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const bnPercent = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

const bnDigits = "০১২৩৪৫৬৭৮৯";

export function toNumber(value: unknown): number {
  if (typeof value === "number") return Number.isFinite(value) ? value : 0;
  if (typeof value !== "string") return 0;
  const english = value
    .replace(/[০-৯]/g, (d) => String(bnDigits.indexOf(d)))
    .replace(/,/g, "")
    .replace(/[^0-9.\-]/g, "");
  const n = parseFloat(english);
  return Number.isFinite(n) ? n : 0;
}

export function formatPrice(n: number) {
  return `${bnNumber.format(n)} টাকা`;
}

export function formatNumber(n: number) {
  return bnNumber.format(n);
}

export function formatPercent(n: number) {
  return `${bnPercent.format(Math.abs(n))}%`;
}

export function formatCount(n: number) {
  return bnNumber.format(n);
}

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}

const unitMap: Record<string, string> = {
  kg: "কেজি",
  kilogram: "কেজি",
  l: "লিটার",
  lt: "লিটার",
  liter: "লিটার",
  litre: "লিটার",
  dozen: "ডজন",
  doz: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  gram: "গ্রাম",
  g: "গ্রাম",
};

export function unitLabel(unit: string) {
  const raw = (unit || "").trim();
  if (!raw) return "প্রতি কেজি";
  if (raw.startsWith("প্রতি")) return raw;
  const mapped = unitMap[raw.toLowerCase().replace(/^per\s+/, "")] || raw;
  return `প্রতি ${mapped}`;
}

export function unitShort(unit: string) {
  return unitLabel(unit).replace(/^প্রতি\s*/, "");
}
