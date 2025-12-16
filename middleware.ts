// middleware.ts (Обновленная версия с проверкой ролей)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./lib/auth"; // Импортируем нашу функцию верификации

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth_token")?.value;
  const isDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/dashboard/admin");
  const isLogin = req.nextUrl.pathname.startsWith("/login");
  const isRegister = req.nextUrl.pathname.startsWith("/register");
  
  const verifiedToken = token ? verifyToken(token) : null;
  const isAuthenticated = !!verifiedToken;
  const userRole = verifiedToken?.role;

  // 1. Если пользователь авторизован, не пускаем его на страницы входа/регистрации
  if ((isLogin || isRegister) && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 2. Защита ЛКК: Если не авторизован и пытается попасть в dashboard → отправляем на login
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // 3. ✅ Защита Админ-маршрутов: Проверка по Роли
  if (isAdminRoute && isAuthenticated && userRole !== 'ADMIN') {
    // Перенаправляем не-админов в обычный dashboard
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  
  // Добавляем роль пользователя в заголовки для использования в серверных компонентах
  const response = NextResponse.next();
  if (verifiedToken) {
    response.headers.set('X-User-Role', userRole || 'CLIENT');
    response.headers.set('X-User-Id', verifiedToken.userId);
  }

  return response;
}

export const config = {
  // Теперь защищены: все в dashboard, login, register
  matcher: ["/dashboard/:path*", "/login", "/register"],
};
