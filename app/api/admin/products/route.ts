import { NextResponse } from "next/server";
import { z } from "zod";
import { imageUrlField } from "@/lib/image-url";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/utils";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  imageUrl: imageUrlField,
  price: z.number().positive("Price must be greater than 0"),
  inStock: z.boolean(),
  isFeatured: z.boolean(),
});

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);

  if (!parsed.success) {
    const first = parsed.error.issues[0];
    return NextResponse.json(
      { error: first?.message ?? "Invalid product payload" },
      { status: 400 },
    );
  }

  const baseSlug = slugify(parsed.data.title);
  const uniqueSlug = `${baseSlug}-${Date.now()}`;

  try {
    const product = await prisma.product.create({
      data: {
        ...parsed.data,
        slug: uniqueSlug,
        price: parsed.data.price,
      },
    });

    return NextResponse.json({
      ...product,
      price: Number(product.price),
    });
  } catch {
    return NextResponse.json(
      { error: "Database error. Check connection and migrations." },
      { status: 503 },
    );
  }
}
