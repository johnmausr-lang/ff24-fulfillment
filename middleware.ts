// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Устанавливаем безопасные флаги для всех cookies при любом ответе
  const cookies = response.cookies.getAll();
  cookies.forEach((cookie) => {
    response.cookies.set({
      name: cookie.name,
      value: cookie.value,
      ...cookie,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  });

  // Если пользователь заходит на защищённые страницы без сессии — редиректим на логин
  const protectedPaths = ['/dashboard', '/orders', '/products', '/warehouses', '/settings'];
  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  const sessionCookie = request.cookies.get('ff24_session');
  
  if (isProtectedPath && !sessionCookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
};
