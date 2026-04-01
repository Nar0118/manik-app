"use client";

import { useState } from "react";
import { Loader2, Send } from "lucide-react";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setError("");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Something went wrong");
      setStatus("error");
      return;
    }
    setStatus("success");
    setName("");
    setEmail("");
    setMessage("");
  }

  return (
    <form
      onSubmit={(e) => void onSubmit(e)}
      className="rounded-3xl border border-white/70 bg-white/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur-md sm:p-8"
    >
      <h2 className="text-lg font-bold text-slate-900">Send a message</h2>
      <p className="mt-1 text-sm text-slate-500">
        Fields marked with your attention help us respond faster.
      </p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Name
          </label>
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/20"
            placeholder="Your name"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Email
          </label>
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/20"
            placeholder="you@email.com"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Message
          </label>
          <textarea
            required
            minLength={10}
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none ring-2 ring-transparent transition focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/20"
            placeholder="Event type, date, colors you love, questions…"
          />
        </div>
      </div>

      {error ? <p className="mt-3 text-sm text-red-600">{error}</p> : null}
      {status === "success" ? (
        <p className="mt-3 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800">
          Thank you! We received your message and will get back to you soon.
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[var(--brand-primary)] to-[var(--brand-primary-dark)] px-6 text-sm font-bold text-white shadow-lg shadow-rose-500/25 transition hover:brightness-105 disabled:opacity-60 sm:w-auto"
      >
        {status === "loading" ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Send className="size-4" />
        )}
        {status === "loading" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
