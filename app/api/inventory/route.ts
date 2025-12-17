import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  const userPhone = cookieStore.get('token'); // В нашем случае токен = телефон (или зашифрованный ID)

  if (!userPhone) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }

  // Имитация запроса к БД: поиск товаров, где owner_phone === userPhone
  // Эти данные соответствуют твоим моделям: бренд, артикул, размеры
  const mockInventory = [
    { 
      id: 'inv_1', 
      brand: 'Nike', 
      name: 'Кепка Dry-Fit', 
      article: 'NK-22001', 
      barcode: '4603728192001',
      stock: 150, 
      size: 'L',
      color: 'Черный'
    },
    { 
      id: 'inv_2', 
      brand: 'Adidas', 
      name: 'Футболка Performance', 
      article: 'AD-9902', 
      barcode: '4603728192882',
      stock: 42, 
      size: 'XL',
      color: 'Белый'
    }
  ];

  return NextResponse.json({ items: mockInventory });
}
