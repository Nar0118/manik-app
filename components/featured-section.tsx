import Link from "next/link";
import { formatPrice } from "@/lib/utils";
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
        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Featured</h2>
        <Link
          href="/#catalog"
          className="text-sm font-medium text-cyan-600 hover:underline"
        >
          View full catalog
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featured.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-[4/3] w-full bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt=""
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute left-3 top-3 rounded-full bg-white/95 px-2 py-1 text-[11px] font-semibold text-slate-700">
                Featured
              </div>
            </div>
            <div className="space-y-1 p-4">
              <h3 className="line-clamp-2 text-sm font-bold text-slate-900">
                {product.title}
              </h3>
              <p className="line-clamp-1 text-xs text-slate-500">{product.category}</p>
              <p className="text-lg font-black text-slate-900">
                {formatPrice(product.price)}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
