export async function GET() {
  const phone = cookies().get('token')?.value;
  // 1. Находим ID контрагента по телефону
  const agentData = await msFetch(`/entity/counterparty?filter=phone~${phone}`);
  const agentId = agentData.rows[0].id;

  // 2. Тянем заказы именно этого агента
  const orders = await msFetch(`/entity/purchaseorder?filter=agent=https://api.moysklad.ru/api/remap/1.2/entity/counterparty/${agentId}`);
  
  return NextResponse.json({
    orders: orders.rows.map((o: any) => ({
      id: o.name,
      status: o.state.name, // Статус из МС (например, "Новый", "Подтвержден")
      date: o.moment.split(' ')[0],
      items: o.positions.meta.size // Количество позиций
    }))
  });
}
