"use client";

import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setCategory } from "@/store/slices/catalog-slice";

const SLIDES = [
  {
    title: "Elegant balloons for stylish celebrations",
    subtitle: "Hand-picked sets for birthdays, weddings, and premium events.",
    image:
      "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "From idea to ready composition",
    subtitle: "Fast curation, clean design, and inspiring holiday visuals.",
    image:
      "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=1400&q=80",
  },
  {
    title: "Collections for every mood",
    subtitle: "Soft pastel, metallic glam, and playful kids themes.",
    image:
      "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=1400&q=80",
  },
];

const CATEGORY_CARDS: { label: string; category: string; blurb: string }[] = [
  { label: "Birthday", category: "Birthday", blurb: "Parties & milestones" },
  { label: "Wedding", category: "Wedding", blurb: "Arches & welcome zones" },
  { label: "Ceiling", category: "Ceiling", blurb: "Room-filling installs" },
  { label: "All products", category: "all", blurb: "Browse everything" },
];

export function Hero() {
  const dispatch = useDispatch();
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % SLIDES.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  function goToCatalog(next: string) {
    dispatch(setCategory(next));
    const el = document.getElementById("catalog");
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <section
      id="hero"
      className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-[1.2fr_1fr]"
    >
      <div
        className="relative overflow-hidden rounded-3xl border border-white/40 bg-[#0f1b3d] p-6 text-white shadow-2xl shadow-cyan-950/20 sm:p-8"
        onTouchStart={(e) => {
          touchStartX.current = e.touches[0].clientX;
        }}
        onTouchEnd={(e) => {
          if (touchStartX.current == null) {
            return;
          }
          const dx = e.changedTouches[0].clientX - touchStartX.current;
          touchStartX.current = null;
          if (Math.abs(dx) < 48) {
            return;
          }
          if (dx > 0) {
            setActiveSlide((i) => (i - 1 + SLIDES.length) % SLIDES.length);
          } else {
            setActiveSlide((i) => (i + 1) % SLIDES.length);
          }
        }}
      >
        <div className="absolute inset-0">
          {SLIDES.map((slide, index) => (
            <div
              key={slide.title}
              className={`absolute inset-0 transition-opacity duration-700 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={slide.image}
                alt=""
                className="h-full w-full object-cover opacity-35"
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0f1b3d] via-[#0f1b3dcc] to-[#000000cc]" />
        </div>

        <div className="relative z-10">
          <p className="mb-3 inline-flex rounded-full border border-white/40 px-3 py-1 text-xs uppercase tracking-wide">
            New collection
          </p>
          <h1 className="font-display text-3xl font-bold leading-tight transition-opacity duration-500 sm:text-4xl">
            {SLIDES[activeSlide]?.title}
          </h1>
          <p className="mt-4 max-w-xl text-sm text-cyan-50">
            {SLIDES[activeSlide]?.subtitle}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex flex-wrap gap-3">
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

        <div className="relative z-10 mt-6 flex gap-2">
          {SLIDES.map((slide, index) => (
            <button
              key={slide.title}
              type="button"
              onClick={() => setActiveSlide(index)}
              className={`h-2.5 rounded-full transition-all ${
                activeSlide === index
                  ? "w-8 bg-white"
                  : "w-2.5 bg-white/45 hover:bg-white/70"
              }`}
              aria-label={`Show slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {CATEGORY_CARDS.map((item) => (
          <button
            key={item.label}
            type="button"
            onClick={() => goToCatalog(item.category)}
            className="rounded-2xl border border-slate-200/90 bg-white p-4 text-left shadow-[var(--shadow-card)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--brand-primary)]/40 hover:shadow-lg sm:p-6"
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
