import { redirect } from "next/navigation";
import { AdminPanel } from "@/components/admin-panel";
import { readSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await readSession();
  if (!session) {
    redirect("/login");
  }

  let mapped: {
    id: string;
    title: string;
    slug: string;
    description: string;
    category: string;
    price: number;
    imageUrl: string;
    isFeatured: boolean;
    inStock: boolean;
  }[] = [];
  let dbError: string | null = null;

  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
    mapped = products.map((item) => ({
      ...item,
      price: Number(item.price),
    }));
  } catch {
    dbError =
      "Cannot load products: database unavailable. Start Postgres and run migrations.";
  }

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-6 sm:px-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="text-sm text-slate-500">Authenticated as {session.email}</p>
          <h1 className="text-3xl font-black text-slate-900">Admin dashboard</h1>
        </header>
        {dbError ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
            {dbError}
          </div>
        ) : null}
        <AdminPanel initialProducts={mapped} />
      </div>
    </main>
  );
}
