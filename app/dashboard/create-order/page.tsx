"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface OrderItem {
  name: string;
  article: string;
  brand: string;
  size: string;
  color: string;
  quantity: number;
  image: string | null; // Base64 строка
}

export default function CreateOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState('');
  const [items, setItems] = useState<OrderItem[]>([
    { name: '', article: '', brand: '', size: '', color: '', quantity: 1, image: null }
  ]);

  // Добавление новой строки товара
  const addItem = () => {
    setItems([...items, { name: '', article: '', brand: '', size: '', color: '', quantity: 1, image: null }]);
  };

  // Удаление строки
  const removeItem = (index: number) => {
    setItems(items.filter((_, i) => i !== index));
  };

  // Обработка изменений в полях
  const handleChange = (index: number, field: keyof OrderItem, value: any) => {
    const newItems = [...items];
    (newItems[index] as any)[field] = value;
    setItems(newItems);
  };

  // Обработка загрузки фото и перевод в Base64
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        alert("Файл слишком большой (макс. 2МБ)");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        handleChange(index, 'image', base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Отправка заказа
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, description }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Заказ успешно создан!");
        router.push('/dashboard/orders');
      } else {
        alert("Ошибка: " + data.error);
      }
    } catch (err) {
      alert("Ошибка при отправке заказа");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Создание нового заказа</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white p-4 rounded shadow">
          <label className="block mb-2 font-medium">Комментарий к заказу</label>
          <textarea 
            className="w-full border p-2 rounded"
            placeholder="Например: Срочная доставка, проверить на брак"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        {items.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded border relative space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-600">Название товара *</label>
                <input
                  required
                  className="w-full border p-2 rounded"
                  value={item.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Артикул / Код *</label>
                <input
                  required
                  className="w-full border p-2 rounded"
                  value={item.article}
                  onChange={(e) => handleChange(index, 'article', e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <label className="text-sm text-gray-600">Бренд</label>
                <input
                  className="w-full border p-2 rounded"
                  value={item.brand}
                  onChange={(e) => handleChange(index, 'brand', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Размер</label>
                <input
                  className="w-full border p-2 rounded"
                  value={item.size}
                  onChange={(e) => handleChange(index, 'size', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Цвет</label>
                <input
                  className="w-full border p-2 rounded"
                  value={item.color}
                  onChange={(e) => handleChange(index, 'color', e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Кол-во *</label>
                <input
                  type="number"
                  required
                  min="1"
                  className="w-full border p-2 rounded"
                  value={item.quantity}
                  onChange={(e) => handleChange(index, 'quantity', parseInt(e.target.value))}
                />
              </div>
            </div>

            <div>
              <label className="text-sm text-gray-600 block mb-1">Фото товара</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, index)}
                className="text-sm"
              />
              {item.image && (
                <p className="text-green-600 text-xs mt-1">Фото загружено</p>
              )}
            </div>

            {items.length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="text-red-500 text-sm font-bold"
              >
                Удалить позицию
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-4">
          <button
            type="button"
            onClick={addItem}
            className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            + Добавить товар
          </button>
          
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 disabled:bg-blue-300"
          >
            {loading ? "Отправка..." : "Создать заказ"}
          </button>
        </div>
      </form>
    </div>
  );
}
