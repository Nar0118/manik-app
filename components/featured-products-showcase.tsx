"use client";

import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export function FeaturedProductsShowcase({ products }: Props) {
  if (products.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile: horizontal snap carousel */}
      <div className="scrollbar-none -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 lg:hidden">
        {products.map((product) => (
          <article
            key={product.id}
            className="group w-[85vw] max-w-sm shrink-0 snap-center overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-card)]"
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

      {/* Desktop: grid */}
      <div className="hidden gap-4 lg:grid lg:grid-cols-3">
        {products.map((product) => (
          <article
            key={product.id}
            className="group overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[var(--shadow-card)] transition hover:-translate-y-1 hover:shadow-lg"
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

      <div className="mt-3 flex justify-center lg:hidden">
        <p className="text-xs text-slate-400">Swipe for more →</p>
      </div>

      <div className="mt-6 hidden justify-end lg:flex">
        <Link
          href="/#catalog"
          className="text-sm font-semibold text-[var(--brand-primary)] hover:underline"
        >
          View full catalog →
        </Link>
      </div>
    </>
  );
}
