import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ContactStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[var(--brand-primary)] via-[var(--brand-primary-dark)] to-slate-900 p-8 text-white shadow-xl shadow-rose-500/20 sm:p-10">
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-16 -left-16 size-48 rounded-full bg-cyan-400/20 blur-2xl"
          aria-hidden
        />
        <div className="relative z-10 max-w-xl">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            Have a date in mind?
          </h2>
          <p className="mt-2 text-sm text-white/85">
            Share your vision — we&apos;ll help you pick tones, scale, and the right
            catalog picks for your space.
          </p>
          <Link
            href="/contact"
            className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-3 text-sm font-bold text-[var(--brand-primary-dark)] shadow-lg transition hover:bg-rose-50"
          >
            Contact us
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
