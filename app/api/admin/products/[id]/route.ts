import { NextResponse } from "next/server";
import { z } from "zod";
import { imageUrlField } from "@/lib/image-url";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  category: z.string().min(2),
  imageUrl: imageUrlField,
  price: z.number().positive("Price must be greater than 0"),
  inStock: z.boolean(),
  isFeatured: z.boolean(),
});

type Params = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, { params }: Params) {
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

  const { id } = await params;

  try {
    const product = await prisma.product.update({
      where: { id },
      data: parsed.data,
    });

    return NextResponse.json({
      ...product,
      price: Number(product.price),
    });
  } catch {
    return NextResponse.json(
      { error: "Database error or product not found." },
      { status: 503 },
    );
  }
}

export async function DELETE(_: Request, { params }: Params) {
  const { id } = await params;

  try {
    await prisma.product.delete({
      where: { id },
    });
  } catch {
    return NextResponse.json({ error: "Delete failed." }, { status: 503 });
  }

  return NextResponse.json({ ok: true });
}
