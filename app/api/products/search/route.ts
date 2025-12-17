import { NextResponse } from 'next/server';

export async function GET() {
  // Заглушка для поиска товаров
  return NextResponse.json({ products: [] });
}
