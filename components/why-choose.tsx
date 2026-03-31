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
    <section className="mx-auto w-full max-w-7xl px-4 pb-10 sm:px-6">
      <div className="mb-4">
        <h2 className="text-2xl font-black text-slate-900 sm:text-3xl">Why choose us</h2>
        <p className="text-sm text-slate-500">
          Built for a delightful customer experience on desktop and mobile.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title}
              className="animate-fade-in-up rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-cyan-100 text-cyan-700">
                <Icon className="size-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{item.title}</h3>
              <p className="mt-1 text-xs text-slate-500">{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
