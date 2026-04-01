import Link from "next/link";
import { FeaturedProductsShowcase } from "@/components/featured-products-showcase";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export function FeaturedSection({ products }: Props) {
  const featured = products.filter((p) => p.isFeatured);

  if (featured.length === 0) {
    return (
      <section
        id="featured"
        className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-8 sm:px-6"
      >
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white/80 px-4 py-8 text-center text-sm text-slate-600">
          No featured products yet. Mark items as featured in the admin dashboard.
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured"
      className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-10 sm:px-6"
    >
      <div className="mb-4 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Featured
          </h2>
          <p className="text-sm text-slate-500">
            Swipe on mobile — tap categories to explore
          </p>
        </div>
        <Link
          href="/#catalog"
          className="hidden text-sm font-semibold text-[var(--brand-primary)] hover:underline lg:inline"
        >
          View full catalog →
        </Link>
      </div>
      <FeaturedProductsShowcase products={featured} />
    </section>
  );
}
