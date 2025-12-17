import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('search');

  // Это временные данные, чтобы ты мог потестить поиск (вводи "Кепка" или "S")
  const mockProducts = [
    { id: '1', name: 'Кепка черная (Classic)', article: 'SKU-CAP-01' },
    { id: '2', name: 'Футболка белая (XL)', article: 'SKU-TSHIRT-W' },
    { id: '3', name: 'Худи Oversize', article: 'SKU-HOODIE-O' },
  ];

  const filtered = mockProducts.filter(p => 
    p.name.toLowerCase().includes(query?.toLowerCase() || '') ||
    p.article.toLowerCase().includes(query?.toLowerCase() || '')
  );

  return NextResponse.json({ products: filtered });
}
