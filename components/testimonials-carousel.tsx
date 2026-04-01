"use client";

import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const REVIEWS = [
  {
    name: "Ani M.",
    role: "Birthday party",
    text: "The colors were exactly what we imagined. Setup felt effortless and guests kept taking photos.",
  },
  {
    name: "David K.",
    role: "Corporate event",
    text: "Professional, on time, and the arch looked incredible in our lobby. Highly recommend.",
  },
  {
    name: "Lilit S.",
    role: "Baby shower",
    text: "Soft pastels and cute details — everyone asked where we found the decorations.",
  },
];

export function TestimonialsCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [activeDot, setActiveDot] = useState(0);

  const scrollByCard = useCallback((dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) {
      return;
    }
    const card = el.querySelector<HTMLElement>("[data-card]");
    const delta = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({ left: dir * delta, behavior: "smooth" });
  }, []);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-12 sm:px-6">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
            Loved by hosts
          </h2>
          <p className="text-sm text-slate-500">
            Swipe or use arrows — real vibes from events
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            aria-label="Previous"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
            aria-label="Next"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className="scrollbar-none flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4"
        onScroll={(e) => {
          const el = e.currentTarget;
          const card = el.querySelector<HTMLElement>("[data-card]");
          const w = card ? card.offsetWidth + 16 : 320;
          const i = Math.round(el.scrollLeft / w);
          setActiveDot(Math.min(Math.max(i, 0), REVIEWS.length - 1));
        }}
      >
        {REVIEWS.map((r) => (
          <article
            key={r.name}
            data-card
            className="w-[min(100%,340px)] shrink-0 snap-center rounded-3xl border border-white/80 bg-gradient-to-br from-white to-rose-50/50 p-6 shadow-[var(--shadow-soft)]"
          >
            <Quote className="size-8 text-[var(--brand-primary)]/40" />
            <p className="mt-3 text-sm leading-relaxed text-slate-700">{r.text}</p>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-full bg-gradient-to-br from-[var(--brand-primary)] to-[var(--brand-accent)] text-sm font-bold text-white">
                {r.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">{r.name}</p>
                <p className="text-xs text-slate-500">{r.role}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="flex justify-center gap-1.5 pt-2">
        {REVIEWS.map((_, dot) => (
          <button
            key={dot}
            type="button"
            onClick={() => {
              const el = scrollerRef.current;
              if (!el) {
                return;
              }
              const card = el.querySelector<HTMLElement>("[data-card]");
              const w = card ? card.offsetWidth + 16 : 320;
              el.scrollTo({ left: dot * w, behavior: "smooth" });
              setActiveDot(dot);
            }}
            className={`h-2 rounded-full transition-all ${
              dot === activeDot ? "w-8 bg-[var(--brand-primary)]" : "w-2 bg-slate-200"
            }`}
            aria-label={`Go to testimonial ${dot + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
