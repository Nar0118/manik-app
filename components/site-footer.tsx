import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/#featured", label: "Featured" },
  { href: "/#catalog", label: "Catalog" },
  { href: "/contact", label: "Contact" },
  { href: "/login", label: "Admin" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-slate-200/80 bg-slate-900 text-slate-300">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-4 py-12 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div>
          <p className="font-display text-xl font-bold text-white">Manik Balloons</p>
          <p className="mt-2 max-w-xs text-sm text-slate-400">
            Curated balloon styling for birthdays, weddings, and unforgettable gatherings.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {FOOTER_LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Manik Balloons. Crafted with care.
      </div>
    </footer>
  );
}
