import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import type { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "manik_session";
const ONE_DAY_SECONDS = 60 * 60 * 24;

type SessionPayload = {
  sub: string;
  email: string;
  role: string;
};

function getJwtSecret() {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is required");
  }

  return new TextEncoder().encode(secret);
}

export async function hashPassword(value: string) {
  return bcrypt.hash(value, 12);
}

export async function verifyPassword(value: string, hash: string) {
  return bcrypt.compare(value, hash);
}

export async function createSessionToken(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${ONE_DAY_SECONDS}s`)
    .sign(getJwtSecret());
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, getJwtSecret());
  return payload as SessionPayload;
}

export function getSessionCookieOptions() {
  return {
    httpOnly: true as const,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: ONE_DAY_SECONDS,
  };
}

/**
 * Use this from Route Handlers — setting cookies via `cookies().set()` alone
 * does not always attach Set-Cookie to the response the browser receives.
 */
export function applySessionCookie(response: NextResponse, token: string) {
  response.cookies.set(SESSION_COOKIE, token, getSessionCookieOptions());
  return response;
}

export async function setSessionCookie(token: string) {
  const store = await cookies();
  store.set(SESSION_COOKIE, token, getSessionCookieOptions());
}

export function clearSessionCookieOnResponse(response: NextResponse) {
  response.cookies.set(SESSION_COOKIE, "", {
    ...getSessionCookieOptions(),
    maxAge: 0,
  });
  return response;
}

export async function clearSessionCookie() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function readSession() {
  try {
    const store = await cookies();
    const token = store.get(SESSION_COOKIE)?.value;
    if (!token) {
      return null;
    }

    return await verifySessionToken(token);
  } catch {
    return null;
  }
}
