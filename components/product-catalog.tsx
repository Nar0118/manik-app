"use client";

import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatPrice } from "@/lib/utils";
import { setCategory, setQuery } from "@/store/slices/catalog-slice";
import type { RootState } from "@/store";
import type { Product } from "@/types/product";

type Props = {
  products: Product[];
};

export function ProductCatalog({ products }: Props) {
  const dispatch = useDispatch();
  const { query, category } = useSelector((state: RootState) => state.catalog);

  const categories = useMemo(
    () => ["all", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const byCategory = category === "all" || product.category === category;
      const byQuery =
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase());
      return byCategory && byQuery;
    });
  }, [products, query, category]);

  return (
    <section
      id="catalog"
      className="mx-auto w-full max-w-7xl scroll-mt-24 px-4 pb-16 sm:px-6"
    >
      <h2 className="mb-4 text-2xl font-black text-slate-900 sm:text-3xl">Catalog</h2>
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(event) => dispatch(setQuery(event.target.value))}
          placeholder="Search by title or description..."
          className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-cyan-500 transition focus:ring-2 sm:text-sm"
          autoComplete="off"
        />
        <select
          value={category}
          onChange={(event) => dispatch(setCategory(event.target.value))}
          className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-cyan-500 transition focus:ring-2 md:max-w-xs md:flex-1 sm:text-sm"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item === "all" ? "All categories" : item}
            </option>
          ))}
        </select>
      </div>

      {filtered.length === 0 ? (
        <p className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-600">
          No products match your filters. Try &quot;All categories&quot; or clear the
          search.
        </p>
      ) : null}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product) => (
          <article
            key={product.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="aspect-[4/3] w-full bg-slate-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="space-y-2 p-4">
              <h3 className="line-clamp-1 text-sm font-bold text-slate-900">
                {product.title}
              </h3>
              <p className="line-clamp-2 text-xs text-slate-500">{product.description}</p>
              <p className="text-lg font-black text-slate-900">
                {formatPrice(product.price)}
              </p>
              <button
                type="button"
                className="min-h-11 w-full rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-cyan-600 active:scale-[0.99]"
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
