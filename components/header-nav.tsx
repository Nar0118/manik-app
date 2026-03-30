"use client";

import Link from "next/link";
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
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    setOpen(false);
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/15 bg-[#0d1325]/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link
          href="/"
          className="shrink-0 text-lg font-black tracking-tight text-white sm:text-xl"
          onClick={() => setOpen(false)}
        >
          MANIK BALLOONS
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-slate-200 md:flex">
          <Link href="/#featured" className="transition hover:text-white">
            Featured
          </Link>
          <Link href="/#catalog" className="transition hover:text-white">
            Catalog
          </Link>
          {!user ? (
            <>
              <Link href="/register" className="transition hover:text-white">
                Sign up
              </Link>
              <Link href="/login" className="transition hover:text-white">
                Login
              </Link>
            </>
          ) : null}
          {user ? (
            <>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 transition hover:bg-white/10 hover:text-white"
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
        <div className="border-t border-white/10 bg-[#0d1325] px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3 text-sm text-slate-200">
            <Link href="/#featured" className="py-2" onClick={() => setOpen(false)}>
              Featured
            </Link>
            <Link href="/#catalog" className="py-2" onClick={() => setOpen(false)}>
              Catalog
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
