import Hero from "@/components/Hero";
import PriceMovers from "@/components/PriceMovers";
import ProductBrowser from "@/components/ProductBrowser";
import { getCategories, getProducts } from "@/lib/api";
import { banglaDate } from "@/lib/format";

export default async function HomePage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);

  const risers = products
    .filter((p) => p.change > 0)
    .sort((a, b) => b.change - a.change)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change < 0)
    .sort((a, b) => a.change - b.change)
    .slice(0, 6);

  return (
    <div className="space-y-10">
      <Hero date={banglaDate()} />
      <PriceMovers title="আজ দাম বেড়েছে" type="up" products={risers} />
      <PriceMovers title="আজ দাম কমেছে" type="down" products={fallers} />
      <section id="সব-পণ্য" className="scroll-mt-6 space-y-4">
        <h2 className="text-2xl font-bold">সব পণ্য</h2>
        {products.length ? (
          <ProductBrowser products={products} categories={categories} withSearch />
        ) : (
          <div className="rounded-2xl border border-dashed border-base-300 bg-base-100 p-10 text-center text-sm opacity-70">
            এই মুহূর্তে পণ্যের তথ্য আনা যায়নি। একটু পরে আবার চেষ্টা করুন।
          </div>
        )}
      </section>
    </div>
  );
}
