import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;

  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isLogin = req.nextUrl.pathname.startsWith("/login");

  // Если пользователь не авторизован и идёт в dashboard → отправляем на login
  if (isDashboard && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Если пользователь авторизован и идёт на login → отправляем в dashboard
  if (isLogin && token) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
