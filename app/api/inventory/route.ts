import { NextResponse } from 'next/server';

export async function GET() {
  // В будущем здесь будет запрос к БД или API "МойСклад"
  const inventoryData = [
    { id: '1', brand: 'Nike', name: 'Кепка', color: 'Черный', size: 'L', stock: 45, barcode: '460321...' },
    { id: '2', brand: 'Adidas', name: 'Футболка', color: 'Белый', size: 'XL', stock: 12, barcode: '460789...' },
  ];
  return NextResponse.json({ items: inventoryData });
}
