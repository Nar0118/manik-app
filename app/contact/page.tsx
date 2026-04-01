import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Manik Balloons",
  description: "Get in touch for balloon sets, events, and custom requests.",
};

export default function ContactPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--page-bg)] pb-28 pt-6 sm:pb-12 sm:pt-10">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -20%, var(--brand-glow), transparent), radial-gradient(ellipse 60% 40% at 100% 50%, rgba(244,114,182,0.15), transparent)",
        }}
      />
      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-6">
        <nav className="mb-8 text-sm text-slate-500">
          <Link href="/" className="hover:text-[var(--brand-primary)]">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-slate-800">Contact</span>
        </nav>

        <div className="mb-10 max-w-2xl">
          <h1 className="font-display text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Let&apos;s plan something{" "}
            <span className="bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-accent)] bg-clip-text text-transparent">
              unforgettable
            </span>
          </h1>
          <p className="mt-3 text-base text-slate-600">
            Tell us about your event, style, and timing. We read every message and reply
            as soon as we can.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <ContactForm />

          <aside className="space-y-4 lg:pt-2">
            <div className="rounded-2xl border border-white/60 bg-white/80 p-5 shadow-[var(--shadow-soft)] backdrop-blur-sm">
              <h2 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Reach us
              </h2>
              <ul className="mt-4 space-y-4 text-sm text-slate-700">
                <li className="flex gap-3">
                  <Mail className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                  <span>hello@manikballoons.example</span>
                </li>
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                  <span>+374 00 000 000</span>
                </li>
                <li className="flex gap-3">
                  <MapPin className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                  <span>Yerevan &amp; surrounding areas — delivery on request</span>
                </li>
                <li className="flex gap-3">
                  <MessageCircle className="mt-0.5 size-5 shrink-0 text-[var(--brand-primary)]" />
                  <span>Typical reply within 1 business day</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl border border-dashed border-[var(--brand-primary)]/30 bg-gradient-to-br from-rose-50/80 to-cyan-50/50 p-5 text-sm text-slate-600">
              Planning a wedding or corporate install? Mention your date and venue size —
              it helps us suggest the right package.
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
