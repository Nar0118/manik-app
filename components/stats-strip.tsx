const STATS = [
  { label: "Curated sets", value: "120+", suffix: "" },
  { label: "Event styles", value: "15", suffix: "+" },
  { label: "Happy hosts", value: "4.9", suffix: "/5" },
  { label: "Response time", value: "24", suffix: "h" },
];

export function StatsStrip() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">
      <div className="grid grid-cols-2 gap-3 rounded-3xl border border-white/60 bg-white/70 p-4 shadow-[var(--shadow-soft)] backdrop-blur-md sm:grid-cols-4 sm:gap-4 sm:p-6">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className="animate-fade-in-up text-center"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <p className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
              {s.value}
              <span className="text-lg text-[var(--brand-primary)]">{s.suffix}</span>
            </p>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-slate-500">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
