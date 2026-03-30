"use client";

import { useDispatch } from "react-redux";
import { setCategory } from "@/store/slices/catalog-slice";

const CATEGORY_CARDS: { label: string; category: string; blurb: string }[] = [
  { label: "Birthday", category: "Birthday", blurb: "Parties & milestones" },
  { label: "Wedding", category: "Wedding", blurb: "Arches & welcome zones" },
  { label: "Ceiling", category: "Ceiling", blurb: "Room-filling installs" },
  { label: "All products", category: "all", blurb: "Browse everything" },
];

export function Hero() {
  const dispatch = useDispatch();

  function goToCatalog(next: string) {
    dispatch(setCategory(next));
    const el = document.getElementById("catalog");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="hero"
      className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-10 md:grid-cols-2"
    >
      <div className="rounded-3xl bg-gradient-to-br from-cyan-500 via-blue-500 to-purple-500 p-6 text-white shadow-2xl shadow-cyan-950/20 sm:p-8">
        <p className="mb-3 inline-flex rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-wide">
          New collection
        </p>
        <h1 className="text-3xl font-black leading-tight sm:text-4xl">
          Stylish balloon sets for unforgettable events
        </h1>
        <p className="mt-4 max-w-xl text-sm text-cyan-50">
          Production-grade e-commerce starter inspired by premium party stores. Fast UI,
          clean architecture, admin workflows.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              document.getElementById("featured")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="rounded-full bg-white/20 px-5 py-2.5 text-sm font-semibold backdrop-blur transition hover:bg-white/30"
          >
            See featured
          </button>
          <button
            type="button"
            onClick={() => goToCatalog("all")}
            className="rounded-full border border-white/50 px-5 py-2.5 text-sm font-semibold transition hover:bg-white/10"
          >
            Shop catalog
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {CATEGORY_CARDS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goToCatalog(item.category)}
            className="rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:border-cyan-300 hover:shadow-md sm:p-6"
          >
            <p className="text-xs text-slate-500 sm:text-sm">Category</p>
            <h3 className="mt-1 text-base font-bold text-slate-900 sm:text-xl">
              {item.label}
            </h3>
            <p className="mt-1 text-xs text-slate-500">{item.blurb}</p>
          </button>
        ))}
      </div>
    </section>
  );
}
