import { NextResponse } from "next/server";
import { z } from "zod";
import { applySessionCookie, createSessionToken, verifyPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export async function POST(request: Request) {
  if (!process.env.JWT_SECRET) {
    return NextResponse.json(
      { error: "Server misconfiguration: JWT_SECRET is not set" },
      { status: 500 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = schema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid credentials format", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
  } catch {
    return NextResponse.json(
      { error: "Database unavailable. Start Postgres and run migrations." },
      { status: 503 },
    );
  }

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const isValid = await verifyPassword(parsed.data.password, user.passwordHash);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const token = await createSessionToken({
    sub: user.id,
    email: user.email,
    role: user.role,
  });

  const response = NextResponse.json({ ok: true });
  return applySessionCookie(response, token);
}
