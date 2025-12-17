import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const phone = cookies().get('token')?.value;
    const body = await request.json();
    const { items } = body;

    // 1. Находим контрагента (клиента) в МС
    const agents = await msFetch(`/entity/counterparty?filter=phone~${phone}`);
    const agent = agents.rows[0];

    // 2. Находим вашу организацию (от чьего имени принимаем)
    const orgs = await msFetch('/entity/organization');
    const organization = orgs.rows[0];

    // 3. Формируем позиции заказа (товары)
    const positions = await Promise.all(items.map(async (item: any) => {
      // Ищем товар в справочнике МС по артикулу
      const productSearch = await msFetch(`/entity/product?filter=code=${item.article}`);
      
      let productHref;
      if (productSearch.rows.length > 0) {
        productHref = productSearch.rows[0].meta.href;
      } else {
        // Если товара нет - создаем его (опционально)
        const newProduct = await msFetch('/entity/product', {
          method: 'POST',
          body: JSON.stringify({
            name: item.name,
            code: item.article,
            description: `Бренд: ${item.brand}, Цвет: ${item.color}`
          })
        });
        productHref = newProduct.meta.href;
      }

      return {
        quantity: parseFloat(item.quantity),
        price: 0, // Цену для приемки можно оставить 0 или подтягивать из МС
        assortment: {
          meta: {
            href: productHref,
            type: 'product'
          }
        }
      };
    }));

    // 4. Создаем сам документ "Заказ поставщику"
    const order = await msFetch('/entity/purchaseorder', {
      method: 'POST',
      body: JSON.stringify({
        organization: { meta: organization.meta },
        agent: { meta: agent.meta },
        positions: positions,
        description: "Создано через Личный кабинет FF24",
        // Можно добавить доп. поле для номера телефона или статуса
      })
    });

    return NextResponse.json({ success: true, orderId: order.name });

  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
