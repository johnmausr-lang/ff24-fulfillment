// components/dashboard/ProductCard.tsx
"use client";

// ИСПРАВЛЕНИЕ 1: Заменяем отсутствующий useCart на существующий useOrderCreation
import { useOrderCreation } from "@/hooks/useOrderCreation";

// Тип для ProductCard
interface Product {
    id: string;
    name: string;
    code: string;
    salePrices?: { value: number }[];
    // Добавьте другие необходимые свойства, если они используются в других местах
    price: number; 
}

export default function ProductCard({ product }: { product: Product }) {
  // ИСПРАВЛЕНИЕ 2: Используем useOrderCreation
  const orderCreation = useOrderCreation();

  // Вспомогательная функция для добавления товара в заказ
  const handleAddToCart = () => {
    // Форматируем данные продукта в ожидаемый хуком CartItem
    const itemToAdd = {
        id: product.id,
        name: product.name,
        // Используем либо цену из salePrices, либо стандартную price, либо 0
        price: (product.salePrices?.[0]?.value || product.price || 0) / 100, 
        quantity: 1, // При добавлении всегда добавляем 1
    };
    
    // ИСПРАВЛЕНИЕ 3: Вызываем метод addItem (вместо несуществующего add)
    orderCreation.addItem(itemToAdd);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4 border">
      <h3 className="text-lg font-medium">{product.name}</h3>
      <p className="text-gray-500 text-sm">{product.code}</p>

      <p className="mt-3 text-lg font-semibold">
        {/* Отображаем цену. Предполагаем, что цена хранится в копейках/центах */}
        {((product.salePrices?.[0]?.value || product.price || 0) / 100).toLocaleString('ru-RU')} ₽
      </p>

      <button
        onClick={handleAddToCart} // Вызываем исправленную функцию
        className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Добавить в заказ
      </button>
    </div>
  );
}
