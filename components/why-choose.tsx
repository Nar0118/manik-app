import { Clock3, Palette, ShieldCheck, Sparkles } from "lucide-react";

const ITEMS = [
  {
    title: "Fast preparation",
    description: "Ready-made sets and quick edits for urgent celebrations.",
    icon: Clock3,
  },
  {
    title: "Aesthetic compositions",
    description: "Balanced colors and modern styles inspired by top studios.",
    icon: Palette,
  },
  {
    title: "Reliable quality",
    description: "Carefully selected products and clear admin management.",
    icon: ShieldCheck,
  },
  {
    title: "Memorable experience",
    description: "Friendly browsing, smooth animations, and mobile comfort.",
    icon: Sparkles,
  },
];

export function WhyChoose() {
  return (
    <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6">
      <div className="mb-6">
        <h2 className="font-display text-2xl font-bold text-slate-900 sm:text-3xl">
          Why choose us
        </h2>
        <p className="text-sm text-slate-500">
          Thoughtful UX, bold visuals, and details that feel premium on every screen.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item, i) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="animate-fade-in-up rounded-2xl border border-white/80 bg-white/90 p-5 shadow-[var(--shadow-card)] backdrop-blur-sm"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-100 to-cyan-100 text-rose-600">
                <Icon className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
