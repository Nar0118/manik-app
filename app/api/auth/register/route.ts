import { NextResponse } from "next/server";
import { z } from "zod";
import { applySessionCookie, createSessionToken, hashPassword } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

function isSignupAllowed() {
  return process.env.ALLOW_PUBLIC_SIGNUP !== "false";
}

export async function POST(request: Request) {
  if (!isSignupAllowed()) {
    return NextResponse.json(
      {
        error:
          "Public signup is disabled. Use seeded admin or enable ALLOW_PUBLIC_SIGNUP.",
      },
      { status: 403 },
    );
  }

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
      { error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  try {
    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists" },
        { status: 409 },
      );
    }

    const passwordHash = await hashPassword(parsed.data.password);
    const user = await prisma.user.create({
      data: {
        email: parsed.data.email,
        name: parsed.data.name,
        passwordHash,
        role: "admin",
      },
    });

    const token = await createSessionToken({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    const response = NextResponse.json({ ok: true, email: user.email });
    return applySessionCookie(response, token);
  } catch {
    return NextResponse.json(
      { error: "Database unavailable. Start Postgres and run migrations." },
      { status: 503 },
    );
  }
}
