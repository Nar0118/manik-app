import { FeaturedSection } from "@/components/featured-section";
import { Hero } from "@/components/hero";
import { ProductCatalog } from "@/components/product-catalog";
import { prisma } from "@/lib/prisma";
import { StoreProvider } from "@/store/provider";

export const dynamic = "force-dynamic";

export default async function Home() {
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
    mapped = products.map((product) => ({
      ...product,
      price: Number(product.price),
    }));
  } catch {
    dbError =
      "Database is not reachable. Run `docker compose up -d`, then `npm run db:migrate` and `npm run db:seed`.";
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {dbError ? (
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6">
          <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {dbError}
          </div>
        </div>
      ) : null}
      <StoreProvider>
        <Hero />
        <FeaturedSection products={mapped} />
        <ProductCatalog products={mapped} />
      </StoreProvider>
    </div>
  );
}
