import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const SESSION_COOKIE = "manik_session";

async function isValidSession(token: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    return false;
  }

  try {
    await jwtVerify(token, new TextEncoder().encode(secret));
    return true;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(SESSION_COOKIE)?.value;
  const pathname = request.nextUrl.pathname;

  const needsAuth =
    pathname.startsWith("/dashboard") || pathname.startsWith("/api/admin");

  if (!needsAuth) {
    return NextResponse.next();
  }

  if (!token || !(await isValidSession(token))) {
    if (pathname.startsWith("/api/admin")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*", "/api/admin", "/api/admin/:path*"],
};
