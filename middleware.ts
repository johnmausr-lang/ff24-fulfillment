import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Предполагаем, что verifyToken импортируется из вашей библиотеки
// Если библиотеки еще нет, для тестов можно просто проверять наличие строки
async function dummyVerifyToken(token: string) {
  if (token === "fake-token") return { role: "USER" }; // Заглушка
  return null;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  
  // В реальном проекте здесь будет: await verifyToken(token)
  const verifiedToken = token ? await dummyVerifyToken(token) : null;
  
  const isAuthenticated = !!verifiedToken;
  const payload = verifiedToken as any; 
  const userRole = payload?.role;

  const { pathname } = req.nextUrl;
  const isLogin = pathname === '/login';
  const isRegister = pathname === '/register';
  const isDashboard = pathname.startsWith('/dashboard');

  // 1. Залогиненных не пускаем на вход/регистрацию
  if ((isLogin || isRegister) && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // 2. Неавторизованных не пускаем в дашборд
  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
