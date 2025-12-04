// app/dashboard/stock/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
// ... (импорты: Table, Package, Loader2)

interface InventoryItem {
    productName: string;
    code: string;
    stock: number;
    inTransit: number;
}

const StockPage: React.FC = () => {
    const [inventory, setInventory] = useState<InventoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError('Сессия истекла. Пожалуйста, войдите снова.');
                    return;
                }

                const res = await fetch('/api/inventory/list', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (!res.ok) {
                    const data = await res.json();
                    throw new Error(data.message || 'Ошибка загрузки остатков.');
                }

                const data: InventoryItem[] = await res.json();
                setInventory(data);

            } catch (e: any) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };

        fetchInventory();
    }, []);

    // ... (Обработка состояний loading/error)

    if (loading) return <div className="text-center py-10"><Loader2 className="animate-spin mx-auto w-8 h-8 text-primary" /> Загрузка остатков...</div>;
    if (error) return <div className="text-center py-10 text-red-600">❌ Ошибка: {error}</div>;

    // ... (JSX-код таблицы с использованием массива inventory)
    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold flex items-center"><Package className="mr-3 text-accent" /> Складские Остатки</h2>
            {/* Рендеринг таблицы... */}
        </div>
    );
};

export default StockPage;
