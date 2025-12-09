// middleware.ts

import { NextResponse } from "next/server";
import { verifyJwt } from "@/lib/auth/jwt";

export function middleware(req: Request) {
  const url = new URL(req.url);

  // защищаем /dashboard/*
  if (url.pathname.startsWith("/dashboard")) {
    const cookie = req.headers
      .get("cookie")
      ?.split("; ")
      ?.find((v) => v.startsWith("auth_token="));

    if (!cookie) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const token = cookie.split("=")[1];
    const user = verifyJwt(token);

    if (!user) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
