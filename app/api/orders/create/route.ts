import { NextResponse } from 'next/server';
import { msFetch } from '@/lib/moysklad';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

// Ваши константы
const CURRENCY_HREF = "https://api.moysklad.ru/api/remap/1.2/entity/currency/1fff2e16-b07b-11ee-0a80-029a00100419";
const PRICETYPE_HREF = "https://api.moysklad.ru/api/remap/1.2/context/companysettings/pricetype/1fff8ac6-b07b-11ee-0a80-029a0010041a";

export async function POST(request: Request) {
  try {
    const email = cookies().get('token')?.value;
    if (!email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await request.json();
    const { items, description } = body; 

    // 1. Получаем данные клиента
    const agents = await msFetch(`/entity/counterparty?filter=email=${email}`);
    const agent = agents.rows[0];
    const orgs = await msFetch('/entity/organization');
    const organization = orgs.rows[0];

    // 2. Формируем позиции с учетом ваших атрибутов
    const positions = await Promise.all(items.map(async (item: any) => {
      // Ищем или создаем товар
      let productSearch = await msFetch(`/entity/product?filter=code=${item.article}`);
      let product;

      if (!productSearch.rows || productSearch.rows.length === 0) {
        product = await msFetch('/entity/product', {
          method: 'POST',
          body: JSON.stringify({
            name: item.name,
            code: item.article,
            attributes: [
              { id: "4c8186f7-b2f6-11ee-0a80-0b8f002a82cd", value: item.brand }, // MS_BRAND_ID
              { id: "6629b2ff-b6c4-11ee-0a80-15cd000fa4ca", value: item.size },  // MS_SIZE_ID
              { id: "6629b639-b6c4-11ee-0a80-15cd000fa4cb", value: item.color }  // MS_COLOR_ID
            ],
            // Если есть изображение (base64)
            ...(item.image && {
              images: [{ filename: "photo.jpg", content: item.image.split(',')[1] }]
            })
          })
        });
      } else {
        product = productSearch.rows[0];
      }

      return {
        quantity: parseFloat(item.quantity),
        price: 0,
        assortment: { meta: product.meta }
      };
    }));

    // 3. Создаем заказ с вашей валютой
    const order = await msFetch('/entity/purchaseorder', {
      method: 'POST',
      body: JSON.stringify({
        organization: { meta: organization.meta },
        agent: { meta: agent.meta },
        rate: { currency: { meta: { href: CURRENCY_HREF, type: "currency" } } },
        positions,
        description: description || `Заявка от ${email}`
      })
    });

    return NextResponse.json({ success: true, id: order.id });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
