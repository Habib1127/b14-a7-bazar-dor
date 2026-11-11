import Link from "next/link";
import { notFound } from "next/navigation";
import PriceBadge, { direction } from "@/components/PriceBadge";
import { getCategories, getProduct } from "@/lib/api";
import { formatNumber, formatPrice, unitLabel, unitShort } from "@/lib/format";
import { requireSession } from "@/lib/session";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  await requireSession(`/product/${slug}`);

  const product = await getProduct(slug);
  if (!product) notFound();

  const categories = await getCategories();
  const category = categories.find((c) => c.slug === product.category);
  const categoryName = category?.name || product.categoryName;
  const dir = direction(product.change);

  const summary =
    product.description ||
    (dir === "up"
      ? "গতকালের তুলনায় আজ দাম বেড়েছে"
      : dir === "down"
        ? "গতকালের তুলনায় আজ দাম কমেছে"
        : "গতকালের তুলনায় আজ দাম অপরিবর্তিত");

  return (
    <div className="space-y-6">
      <nav className="flex flex-wrap items-center gap-2 text-sm">
        <Link href="/" className="hover:text-primary">
          হোম
        </Link>
        {categoryName && (
          <>
            <span className="opacity-50">›</span>
            <Link href={`/category/${product.category}`} className="hover:text-primary">
              {categoryName}
            </Link>
          </>
        )}
        <span className="opacity-50">›</span>
        <span className="opacity-70">{product.name}</span>
      </nav>

      <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 sm:flex-row sm:items-center">
        <div className="flex size-20 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-4xl">
          {product.emoji}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="mt-2 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-base-200 px-3 py-0.5">{unitLabel(product.unit)}</span>
            {categoryName && (
              <span className="rounded-full bg-primary/10 px-3 py-0.5 text-primary">{categoryName}</span>
            )}
          </div>
          <p className="mt-2 text-sm opacity-70">{summary}</p>
        </div>
        <div className="flex flex-col items-center rounded-2xl bg-base-200 px-6 py-4 text-center">
          <span className="text-sm opacity-70">আজকের দাম</span>
          <span className="text-3xl font-bold">{formatNumber(product.price)}</span>
          <span className="text-sm opacity-70">টাকা / {unitShort(product.unit)}</span>
          <span className="mt-1">
            <PriceBadge change={product.change} size="md" />
          </span>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs opacity-70">সর্বনিম্ন দাম</p>
            <p className="text-2xl font-bold text-down">{formatPrice(product.min)}</p>
            <p className="text-xs opacity-70">
              {product.minMarket ? `${product.minMarket} — ` : ""}সবচেয়ে কম দামের বাজার
            </p>
          </div>
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs opacity-70">সর্বাধিক দাম</p>
            <p className="text-2xl font-bold text-up">{formatPrice(product.max)}</p>
            <p className="text-xs opacity-70">
              {product.maxMarket ? `${product.maxMarket} — ` : ""}সবচেয়ে বেশি দামের বাজার
            </p>
          </div>
          <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
            <p className="text-xs opacity-70">গড় দাম</p>
            <p className="text-2xl font-bold text-primary">{formatPrice(product.avg)}</p>
            <p className="text-xs opacity-70">{unitLabel(product.unit)}-এর হিসাবে</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">বাজারভিত্তিক আজকের দাম</h2>
        {product.markets.length ? (
          <div className="overflow-x-auto rounded-2xl border border-base-300 bg-base-100">
            <table className="table">
              <thead>
                <tr className="border-base-300 text-base-content">
                  <th>বাজার</th>
                  <th>বিভাগ</th>
                  <th className="text-right">সর্বনিম্ন</th>
                  <th className="text-right">সর্বাধিক</th>
                  <th className="text-right">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((m, i) => (
                  <tr key={`${m.name}-${i}`} className="border-base-200 even:bg-base-200/60">
                    <td className="font-medium">{m.name}</td>
                    <td>{m.division}</td>
                    <td className="text-right">{formatPrice(m.min)}</td>
                    <td className="text-right">{formatPrice(m.max)}</td>
                    <td className="text-right font-semibold">{formatPrice(m.avg)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-8 text-center text-sm opacity-70">
            এই পণ্যের বাজারভিত্তিক তথ্য এখনো নেই।
          </div>
        )}
      </section>
    </div>
  );
}
