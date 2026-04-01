"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogOut, Menu, UserRound, X } from "lucide-react";

type SessionUser = {
  email: string;
};

type Props = {
  user: SessionUser | null;
};

export function HeaderNav({ user }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    setOpen(false);
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/");
    router.refresh();
  }

  const linkClass = "transition hover:text-white text-slate-200";
  const activeContact = pathname === "/contact";

  return (
    <header className="sticky top-0 z-50 border-b border-rose-500/20 bg-slate-950/95 pt-[env(safe-area-inset-top)] shadow-lg shadow-rose-950/20 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="shrink-0 bg-gradient-to-r from-rose-400 to-cyan-400 bg-clip-text text-lg font-black tracking-tight text-transparent sm:text-xl"
          onClick={() => setOpen(false)}
        >
          MANIK BALLOONS
        </Link>

        <nav className="hidden items-center gap-5 text-sm md:flex">
          <Link href="/#featured" className={linkClass}>
            Featured
          </Link>
          <Link href="/#catalog" className={linkClass}>
            Catalog
          </Link>
          <Link
            href="/contact"
            className={activeContact ? "font-semibold text-white" : linkClass}
          >
            Contact
          </Link>
          {!user ? (
            <>
              <Link href="/register" className={linkClass}>
                Sign up
              </Link>
              <Link href="/login" className={linkClass}>
                Login
              </Link>
            </>
          ) : null}
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-slate-200 transition hover:bg-white/10 hover:text-white"
                title={user.email}
              >
                <UserRound className="size-4 shrink-0" aria-hidden />
                <span className="max-w-[140px] truncate text-xs sm:max-w-[200px] sm:text-sm">
                  {user.email}
                </span>
              </Link>
              <button
                type="button"
                onClick={() => void handleLogout()}
                className="inline-flex items-center gap-1 text-slate-300 transition hover:text-white"
              >
                <LogOut className="size-4" />
                <span className="hidden lg:inline">Sign out</span>
              </button>
            </>
          ) : null}
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          {user ? (
            <Link
              href="/dashboard"
              className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Dashboard"
            >
              <UserRound className="size-5" />
            </Link>
          ) : null}
          <button
            type="button"
            className="flex size-10 items-center justify-center rounded-lg text-white"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="border-t border-white/10 bg-slate-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            <Link href="/#featured" className="py-2" onClick={() => setOpen(false)}>
              Featured
            </Link>
            <Link href="/#catalog" className="py-2" onClick={() => setOpen(false)}>
              Catalog
            </Link>
            <Link
              href="/contact"
              className={`py-2 ${activeContact ? "font-semibold text-white" : ""}`}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 py-2"
                  onClick={() => setOpen(false)}
                >
                  <UserRound className="size-4" />
                  Dashboard
                </Link>
                <button
                  type="button"
                  className="flex items-center gap-2 py-2 text-left text-slate-300"
                  onClick={() => void handleLogout()}
                >
                  <LogOut className="size-4" />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link href="/register" className="py-2" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
                <Link href="/login" className="py-2" onClick={() => setOpen(false)}>
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
