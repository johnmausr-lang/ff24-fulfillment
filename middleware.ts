// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from '@/lib/auth'; // Убедитесь, что путь верный

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  // ИСПРАВЛЕНИЕ 1: Добавляем await, так как верификация токена обычно асинхронна
  // ИСПРАВЛЕНИЕ 2: Приводим тип к "any" или вашему интерфейсу, чтобы TS видел .role
  const verifiedToken = token ? await verifyToken(token) : null;
  
  const isAuthenticated = !!verifiedToken;
  
  // Приводим к типу, содержащему role, чтобы избежать ошибки Property 'role' does not exist
  const payload = verifiedToken as any; 
  const userRole = payload?.role;

  const { pathname } = req.nextUrl;
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';
  const isDashboard = pathname.startsWith('/dashboard');

  // 1. Если пользователь авторизован, не пускаем его на страницы входа/регистрации
  if ((isLogin || isRegister) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 2. Если пользователь НЕ авторизован и пытается зайти в админку
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // 3. Дополнительная проверка ролей (если нужно)
  // if (pathname.startsWith('/dashboard/admin') && userRole !== 'ADMIN') {
  //   return NextResponse.redirect(new URL('/dashboard', req.url));
  // }

  return NextResponse.next();
}

// Указываем, на каких путях должен работать middleware
export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
