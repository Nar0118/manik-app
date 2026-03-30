"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
      credentials: "include",
    });

    setIsLoading(false);

    if (!response.ok) {
      let message = "Registration failed";
      try {
        const data = (await response.json()) as { error?: string };
        if (data.error) {
          message = data.error;
        }
      } catch {
        message = `Registration failed (${response.status})`;
      }
      setError(message);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
      >
        <h1 className="text-2xl font-bold text-slate-900">Create admin account</h1>
        <p className="text-sm text-slate-500">
          New accounts get admin access to the dashboard. Already have an account?{" "}
          <Link href="/login" className="font-medium text-cyan-600 hover:underline">
            Sign in
          </Link>
          .
        </p>
        <input
          required
          minLength={2}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="Your name"
        />
        <input
          type="email"
          required
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          required
          minLength={8}
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password (min 8 characters)"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          disabled={isLoading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {isLoading ? "Creating account..." : "Create account"}
        </button>
        <p className="text-xs text-slate-400">
          Set <code className="rounded bg-slate-100 px-1">ALLOW_PUBLIC_SIGNUP=false</code>{" "}
          in production to disable open registration.
        </p>
      </form>
    </main>
  );
}
