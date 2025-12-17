import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Временно разрешаем всем доступ ко всему, чтобы проверить работу Дашборда
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
