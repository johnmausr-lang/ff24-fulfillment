// app/dashboard/orders/new/page.tsx
"use client";

import { useState, useMemo } from 'react';
import { ShoppingCart, Search, MinusCircle, PlusCircle, Trash, Truck, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useOrderCreation, OrderItem } from '@/hooks/useOrderCreation';
import { useRouter } from 'next/navigation';

// Мок-данные о товарах для поиска
const availableProductsMock = [
    { id: 'prod-1', msId: 'ms-12345', sku: 'FF-WB-001', name: 'Смарт-часы X1 Pro', stockAvailable: 450 },
    { id: 'prod-2', msId: 'ms-67890', sku: 'FF-WB-002', name: 'Беспроводные наушники X3', stockAvailable: 1200 },
    { id: 'prod-3', msId: 'ms-11223', sku: 'FF-OZ-003', name: 'Пауэрбанк 20000mAh', stockAvailable: 50 },
    { id: 'prod-4', msId: 'ms-44556', sku: 'FF-WB-004', name: 'Микрофон студийный', stockAvailable: 750 },
];

export default function NewOrderPage() {
    const { items, addItem, updateItemQty, removeItem, clearOrder } = useOrderCreation();
    const [searchTerm, setSearchTerm] = useState('');
    const [targetMarketplace, setTargetMarketplace] = useState('Wildberries');
    const [note, setNote] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    // Фильтрация товаров для поиска
    const filteredProducts = useMemo(() => {
        if (!searchTerm) return availableProductsMock;
        const lowerCaseSearch = searchTerm.toLowerCase();
        return availableProductsMock.filter(p => 
            p.name.toLowerCase().includes(lowerCaseSearch) ||
            p.sku.toLowerCase().includes(lowerCaseSearch)
        );
    }, [searchTerm]);

    // Общее количество позиций в заказе
    const totalItems = items.reduce((acc, i) => acc + i.qty, 0);

    const handleSubmitOrder = async () => {
        if (items.length === 0) {
            toast.error('Добавьте хотя бы один товар в заказ.');
            return;
        }

        setIsSubmitting(true);

        const orderDataToSend = items.map(i => ({ 
            msId: i.msId, 
            qty: i.qty,
            name: i.name, // Для сохранения в логах
        }));

        try {
            const res = await fetch('/api/dashboard/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    orderItems: orderDataToSend, 
                    targetMarketplace, 
                    note 
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success(`Заказ #${data.orderId} успешно создан и передан в Мой Склад!`);
                clearOrder();
                router.push('/dashboard/orders');
            } else {
                toast.error(data.error || 'Ошибка при отправке заказа.');
            }
        } catch (error) {
            toast.error('Ошибка сети. Не удалось отправить заказ.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-extrabold text-white flex items-center">
                <ShoppingCart className="h-8 w-8 mr-3 text-accent-DEFAULT" /> Создание Нового Заказа
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                {/* 1. Поиск и Добавление Товаров (2/3 ширины) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Поиск по SKU или названию товара..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-3 pl-10 rounded-lg bg-gray-800 border border-gray-700 focus:border-accent-DEFAULT focus:ring-accent-DEFAULT"
                        />
                    </div>

                    <div className="bg-gray-800 rounded-xl overflow-y-auto max-h-[600px] border border-gray-700">
                        <div className="p-4 border-b border-gray-700 font-semibold text-gray-300 grid grid-cols-4">
                            <span>Название</span>
                            <span>SKU</span>
                            <span className='text-center'>В наличии</span>
                            <span className='text-right'>Действие</span>
                        </div>
                        
                        <div className="divide-y divide-gray-700">
                            {filteredProducts.map(product => {
                                const inCart = items.find(i => i.id === product.id);
                                return (
                                    <div key={product.id} className="p-4 grid grid-cols-4 hover:bg-gray-700 transition-colors items-center">
                                        <span className="font-medium text-white">{product.name}</span>
                                        <span className="text-accent-DEFAULT font-mono">{product.sku}</span>
                                        <span className={`text-center font-bold ${product.stockAvailable < 100 ? 'text-yellow-500' : 'text-green-500'}`}>
                                            {product.stockAvailable}
                                        </span>
                                        <div className='text-right'>
                                            {inCart ? (
                                                <span className='text-sm text-gray-400'>Добавлено ({inCart.qty})</span>
                                            ) : (
                                                <Button 
                                                    size="sm" 
                                                    onClick={() => addItem(product)} 
                                                    disabled={product.stockAvailable === 0}
                                                >
                                                    Добавить
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                            {filteredProducts.length === 0 && <div className="p-4 text-center text-gray-500">Товары не найдены.</div>}
                        </div>
                    </div>
                </div>

                {/* 2. Корзина Заказа и Оформление (1/3 ширины) */}
                <div className="space-y-6">
                    <div className="bg-gray-800 p-6 rounded-xl border border-accent-DEFAULT/30 shadow-neon-sm space-y-4">
                        <h2 className="text-2xl font-bold text-accent-DEFAULT flex items-center">
                            <Truck className="h-6 w-6 mr-2" /> Заказ (Всего: {totalItems} шт.)
                        </h2>
                        
                        {/* Список товаров в корзине */}
                        <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                            {items.length === 0 ? (
                                <p className="text-gray-500 italic">Начните добавлять товары.</p>
                            ) : (
                                items.map(item => (
                                    <OrderItemRow 
                                        key={item.id} 
                                        item={item} 
                                        updateQty={updateItemQty} 
                                        remove={removeItem} 
                                    />
                                ))
                            )}
                        </div>

                        {/* Настройки заказа */}
                        <div className='space-y-4 pt-4 border-t border-gray-700'>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Маркетплейс для отгрузки</label>
                                <select
                                    value={targetMarketplace}
                                    onChange={(e) => setTargetMarketplace(e.target.value)}
                                    className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
                                >
                                    <option value="Wildberries">Wildberries</option>
                                    <option value="Ozon">Ozon</option>
                                    <option value="YandexMarket">Yandex.Market</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-1">Примечание (опционально)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    rows={2}
                                    className="w-full p-2 rounded-lg bg-gray-700 border border-gray-600"
                                    placeholder="Стикеры или особые требования к упаковке"
                                />
                            </div>
                        </div>

                        <div className='flex justify-between pt-2'>
                            <Button 
                                variant="secondary" 
                                size="sm" 
                                onClick={clearOrder} 
                                disabled={items.length === 0 || isSubmitting}
                                className='text-red-400 border-red-400 hover:bg-red-900/50'
                            >
                                <Trash className="h-4 w-4 mr-1" /> Очистить
                            </Button>

                            <Button 
                                size="lg" 
                                onClick={handleSubmitOrder} 
                                disabled={items.length === 0 || isSubmitting}
                            >
                                {isSubmitting ? 'Отправка...' : <><Send className="h-5 w-5 mr-2" /> Отправить в FF24</>}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Вспомогательный компонент для строки товара в корзине
const OrderItemRow = ({ item, updateQty, remove }: { item: OrderItem, updateQty: (id: string, qty: number) => void, remove: (id: string) => void }) => (
    <div className="flex justify-between items-center p-2 bg-gray-900 rounded-lg">
        <div className="flex-1 min-w-0 mr-3">
            <p className="text-sm font-medium truncate">{item.name}</p>
            <p className="text-xs text-gray-500">{item.sku}</p>
        </div>
        
        <div className="flex items-center space-x-2">
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => updateQty(item.id, item.qty - 1)}
                disabled={item.qty <= 1}
                className='text-accent-DEFAULT hover:bg-gray-700'
            >
                <MinusCircle className="h-4 w-4" />
            </Button>
            <span className="w-6 text-center text-sm font-bold text-white">{item.qty}</span>
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => updateQty(item.id, item.qty + 1)}
                disabled={item.qty >= item.stockAvailable}
                className='text-accent-DEFAULT hover:bg-gray-700'
            >
                <PlusCircle className="h-4 w-4" />
            </Button>
            <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => remove(item.id)}
                className='text-red-500 hover:bg-red-900/30'
            >
                <Trash className="h-4 w-4" />
            </Button>
        </div>
    </div>
);
