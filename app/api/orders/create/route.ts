import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items } = body;

    // Преобразуем данные из интерфейса в формат OrderData вашего бота
    const formattedOrders = items.map((item: any) => ({
      brand: item.brand || "Не указан",          // Состояние OrderBrand 
      name: item.name,                           // Состояние OrderName 
      color: item.color || "Универсальный",      // Состояние OrderColor 
      vendor_code: item.article,                 // Состояние OrderVendorCode 
      marketplace_code: item.marketplace_code || "", // Состояние OrderMarketplaceCode 
      barcode: item.barcode || item.article,     // Состояние OrderBarcode 
      sizes: [                                   // Список словарей согласно OrderData 
        {
          size: item.size || "O/S",              // Состояние OrderSize 
          quantity: item.quantity                // Состояние OrderSizeQuantity 
        }
      ],
      warehouse_destination: "Приемка",          // Значение по умолчанию из вашей модели 
      supply_creation: "Личный кабинет",         // Соответствует OrderSupplyCreation 
      delivery_info: "Доставка клиентом",        // Соответствует OrderDelivery 
    }));

    // Логируем результат для проверки (здесь должна быть запись в БД)
    console.log("Заявка сформирована для бота (OrderConfirm):", formattedOrders);

    return NextResponse.json({ 
      success: true, 
      message: "Заявка на приемку успешно создана",
      count: formattedOrders.length 
    });

  } catch (error) {
    console.error("Ошибка при обработке заявки:", error);
    return NextResponse.json(
      { error: "Ошибка сервера при формировании заказа" }, 
      { status: 500 }
    );
  }
}
