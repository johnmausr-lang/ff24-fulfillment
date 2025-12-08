// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Перезаписываем все куки с безопасными флагами
  const cookies = response.cookies.getAll();
  
  cookies.forEach((cookie) => {
    response.cookies.set({
      ...cookie,                    // ← берём всё из оригинальной куки
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });
  });

  // Защита роутов (если нужно)
  const protectedPaths = ['/dashboard', '/orders', '/products', '/settings'];
  const isProtected = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  );

  const session = request.cookies.get('ff24_session');

  if (isProtected && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|login|register).*)'],
};
