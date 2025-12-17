import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // В будущем здесь будет запрос к БД по номеру телефона из сессии
  const stats = {
    inbound_total: 1240,    // Всего поступило единиц
    in_stock: 856,         // Сейчас на хранении
    shipped_today: 42,     // Отгружено сегодня
    active_shipments: 3,   // Активных заявок на поставку (Inbound)
  };

  return NextResponse.json(stats);
}
