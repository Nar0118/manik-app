import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    orderBy: { createdAt: "desc" },
  });

  const data = products.map((product) => ({
    ...product,
    price: Number(product.price),
  }));

  return NextResponse.json(data);
}
