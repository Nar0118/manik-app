"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@manik.local");
  const [password, setPassword] = useState("Admin12345");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    });

    setIsLoading(false);

    if (!response.ok) {
      let message = "Sign in failed";
      try {
        const data = (await response.json()) as { error?: string };
        if (data.error) {
          message = data.error;
        }
      } catch {
        message = `Sign in failed (${response.status})`;
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
        <h1 className="text-2xl font-bold text-slate-900">Admin login</h1>
        <p className="text-sm text-slate-500">
          Sign in to manage products. No account yet?{" "}
          <Link href="/register" className="font-medium text-cyan-600 hover:underline">
            Create one
          </Link>
          .
        </p>
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
          className="w-full rounded-xl border border-slate-300 px-4 py-3"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
        />
        {error ? <p className="text-sm text-red-600">{error}</p> : null}
        <button
          disabled={isLoading}
          className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
        >
          {isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
