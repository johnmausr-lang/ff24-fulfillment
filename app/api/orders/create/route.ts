import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

// Принудительно динамический роут, так как используем куки
export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const email = cookieStore.get('token')?.value;

    if (!email) {
      return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
    }

    const body = await request.json();
    const { items } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Список товаров пуст" }, { status: 400 });
    }

    // 1. Находим контрагента (клиента) в МойСклад по Email
    const agents = await msFetch(`/entity/counterparty?filter=email=${email}`);
    if (!agents.rows || agents.rows.length === 0) {
      return NextResponse.json({ error: "Контрагент с таким Email не найден в МойСклад" }, { status: 404 });
    }
    const agent = agents.rows[0];

    // 2. Находим вашу организацию (от чьего имени принимаем заказ)
    const orgs = await msFetch('/entity/organization');
    const organization = orgs.rows[0];

    // 3. Формируем позиции для документа
    const positions = await Promise.all(items.map(async (item: any) => {
      // Ищем товар в справочнике МС по коду (артикулу)
      const productSearch = await msFetch(`/entity/product?filter=code=${item.article}`);
      
      let productMeta;
      if (productSearch.rows && productSearch.rows.length > 0) {
        // Товар найден
        productMeta = productSearch.rows[0].meta;
      } else {
        // Если товара нет, создаем новую карточку товара
        const newProduct = await msFetch('/entity/product', {
          method: 'POST',
          body: JSON.stringify({
            name: item.name || `Товар ${item.article}`,
            code: item.article,
            article: item.article,
            description: `Создано автоматически из ЛК (Бренд: ${item.brand || '—'})`
          })
        });
        productMeta = newProduct.meta;
      }

      return {
        quantity: parseFloat(item.quantity) || 1,
        price: 0, // Приемка обычно идет по нулевой цене для фулфилмента
        assortment: {
          meta: productMeta
        }
      };
    }));

    // 4. Создаем документ "Заказ поставщику" (Purchase Order)
    const order = await msFetch('/entity/purchaseorder', {
      method: 'POST',
      body: JSON.stringify({
        organization: { meta: organization.meta },
        agent: { meta: agent.meta },
        positions: positions,
        description: `Заявка на приемку через Личный кабинет FF24 (${email})`,
        externalCode: `WEB-${Math.floor(Date.now() / 1000)}`
      })
    });

    return NextResponse.json({ 
      success: true, 
      orderId: order.name,
      id: order.id 
    });

  } catch (error: any) {
    console.error("Order Creation Error:", error);
    return NextResponse.json({ error: error.message || "Ошибка при создании заказа" }, { status: 500 });
  }
}
