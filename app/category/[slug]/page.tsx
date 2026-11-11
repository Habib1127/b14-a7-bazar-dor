import { notFound } from "next/navigation";
import ProductBrowser from "@/components/ProductBrowser";
import { getCategories, getProducts } from "@/lib/api";
import { formatCount } from "@/lib/format";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getProducts(slug)]);
  const category = categories.find((c) => c.slug === slug);

  if (!category || products.length === 0) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 rounded-2xl border border-base-300 bg-base-100 p-5">
        <span className="text-4xl">{category.emoji}</span>
        <div>
          <h1 className="text-2xl font-bold">{category.name}</h1>
          <p className="text-sm opacity-70">
            {formatCount(products.length)}টি পণ্যের আজকের দাম ও পরিবর্তন
          </p>
        </div>
      </div>
      <ProductBrowser products={products} />
    </div>
  );
}
