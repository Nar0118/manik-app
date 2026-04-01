"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Home, LayoutGrid, MessageCircle } from "lucide-react";

const HIDE = ["/dashboard", "/login", "/register"];

function NavItem({
  href,
  label,
  icon: Icon,
  active,
}: {
  href: string;
  label: string;
  icon: typeof Home;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex min-w-[4rem] flex-col items-center gap-0.5 rounded-xl px-2 py-1 text-[10px] font-semibold transition active:scale-95 ${
        active ? "text-[var(--brand-primary)]" : "text-slate-600 hover:text-slate-900"
      }`}
    >
      <Icon
        className={`size-5 ${active ? "drop-shadow-[0_0_8px_rgba(225,29,72,0.45)]" : ""}`}
      />
      {label}
    </Link>
  );
}

export function MobileBottomNav() {
  const pathname = usePathname();
  if (HIDE.some((p) => pathname.startsWith(p))) {
    return null;
  }

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-rose-100 bg-white/95 pb-[env(safe-area-inset-bottom)] pt-2 shadow-[0_-8px_32px_rgba(225,29,72,0.08)] backdrop-blur-lg md:hidden"
      aria-label="Quick navigation"
    >
      <div className="mx-auto flex max-w-lg items-center justify-around px-1">
        <NavItem href="/" label="Home" icon={Home} active={pathname === "/"} />
        <NavItem href="/#featured" label="Featured" icon={Heart} active={false} />
        <NavItem href="/#catalog" label="Catalog" icon={LayoutGrid} active={false} />
        <NavItem
          href="/contact"
          label="Contact"
          icon={MessageCircle}
          active={pathname === "/contact"}
        />
      </div>
    </nav>
  );
}
