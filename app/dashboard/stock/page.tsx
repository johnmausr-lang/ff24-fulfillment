'use client';

import React, { useState, useEffect } from 'react';
import { Loader2, ArrowUpDown, ChevronDown, ChevronUp } from 'lucide-react'; // <-- ИСПРАВЛЕНО: Добавлен Loader2

// --- Модель данных (предполагаемая структура) ---
interface InventoryItem {
    productName: string;
    code: string;
    stock: number;
    inTransit: number;
}

// --- Условный хук для загрузки данных (для примера) ---
const useInventory = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            setLoading(true);
            setError(null);
            try {
                // Вызываем наш защищенный API-маршрут
                const response = await fetch('/api/inventory/list'); 

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Не удалось загрузить данные об остатках.');
                }

                const data: InventoryItem[] = await response.json();
                setInventory(data);
            } catch (err) {
                setError((err as Error).message);
                console.error('Fetch Inventory Error:', err);
            } finally {
                setLoading(false);
            }
        };

        // В реальном приложении здесь должна быть проверка на наличие токена/авторизации
        fetchInventory();
    }, []);

    return { inventory, loading, error };
};


// --- Компонент страницы ---
const StockPage = () => {
    const { inventory, loading, error } = useInventory();

    // Заголовок
    const Title = () => (
        <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
            Складские остатки клиента
        </h1>
    );

    // Обработка состояний loading/error
    if (loading) return (
        <div className="text-center py-10">
            <Loader2 className="animate-spin mx-auto w-8 h-8 text-indigo-600" /> 
            <p className="mt-4 text-gray-600">Загрузка остатков...</p>
        </div>
    );
    
    if (error) return (
        <div className="text-center py-10 bg-red-50 border border-red-200 rounded-lg mx-auto max-w-lg">
            <p className="text-red-700 font-medium">❌ Ошибка загрузки данных:</p>
            <p className="text-sm text-red-500 mt-2">{error}</p>
        </div>
    );

    if (inventory.length === 0) return (
        <div className="text-center py-10">
            <Title />
            <p className="text-lg text-gray-500">На данный момент остатки по вашим товарам не найдены.</p>
        </div>
    );
    
    // JSX-код таблицы
    return (
        <div className="container mx-auto p-4 md:p-8 bg-white shadow-xl rounded-xl">
            <Title />

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Наименование товара
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Артикул / Код
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                В наличии
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                В резерве
                            </th>
                            <th className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {inventory.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50 transition duration-150">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                    {item.productName}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.code}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                    <span className={`font-semibold ${item.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {item.stock} шт.
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                    <span className="text-yellow-600">
                                        {item.inTransit} шт.
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    {/* Здесь можно добавить кнопку "Детали" или "Создать заказ" */}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {/* Сводка */}
            <div className="mt-8 pt-4 border-t border-gray-200 text-right">
                <p className="text-lg font-semibold text-gray-700">
                    Всего позиций: {inventory.length}
                </p>
            </div>
        </div>
    );
};

export default StockPage;
