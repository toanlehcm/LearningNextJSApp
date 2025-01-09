import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === "/dashboard" && !request.cookies.has("auth")) {
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  return NextResponse.next();
}
