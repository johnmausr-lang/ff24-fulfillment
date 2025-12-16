// components/dashboard/CartSidebar.tsx
"use client";

import { useOrderCreation } from "@/hooks/useOrderCreation"; // <-- ИСПРАВЛЕНИЕ: Используем новое имя файла
import Link from "next/link";
import { X, ShoppingCart, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button"; // Предполагаем компонент Shadcn UI
import { ScrollArea } from "@/components/ui/scroll-area"; // Для прокручиваемого содержимого
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

// Вспомогательная функция для форматирования валюты
const currencyFormatter = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};


export default function CartSidebar() {
    // ВАЖНО: Хук должен экспортировать именно эти поля
    const { 
        items, 
        totalItems, 
        totalPrice, 
        removeItem, 
        updateQuantity, 
        clearCart 
    } = useOrderCreation(); 

    if (totalItems === 0) {
        return (
            <div className="p-4 text-center text-gray-500 flex flex-col items-center justify-center h-full">
                <ShoppingCart className="h-10 w-10 mb-3 text-gray-600" />
                <p className="text-lg font-semibold">Корзина пуста</p>
                <p className="text-sm">Добавьте товары для создания отгрузки.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full bg-gray-950">
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold flex items-center">
                    <ShoppingCart className="h-6 w-6 mr-2 text-accent-DEFAULT" />
                    Корзина ({totalItems})
                </h2>
                <Button variant="ghost" size="sm" onClick={clearCart} className="text-sm text-red-500 hover:bg-gray-800">
                    Очистить
                </Button>
            </div>

            {/* Список товаров */}
            <ScrollArea className="flex-1 px-4 py-2">
                <div className="space-y-4">
                    {items.map(item => (
                        <div key={item.id} className="flex items-center justify-between border-b border-gray-800/50 pb-3">
                            <div className="flex-1 mr-4">
                                <p className="font-medium text-white">{item.name}</p>
                                <p className="text-sm text-gray-400">
                                    {currencyFormatter(item.price)} x {item.quantity}
                                </p>
                            </div>
                            
                            {/* Управление количеством */}
                            <div className="flex items-center space-x-2">
                                <Button 
                                    variant="secondary" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                    disabled={item.quantity <= 1}
                                >
                                    <Minus className="h-4 w-4" />
                                </Button>
                                <Input 
                                    type="number"
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                    className="w-12 h-7 text-center bg-gray-900 border-gray-700"
                                />
                                <Button 
                                    variant="secondary" 
                                    size="icon" 
                                    className="h-7 w-7"
                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                    <Plus className="h-4 w-4" />
                                </Button>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-7 w-7 text-gray-500 hover:text-red-500"
                                    onClick={() => removeItem(item.id)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>

            {/* Итоги и кнопка оформления */}
            <div className="p-4 border-t border-gray-800 bg-gray-900">
                <div className="flex justify-between text-lg font-bold mb-3">
                    <span>Итого:</span>
                    <span className="text-accent-DEFAULT">{currencyFormatter(totalPrice)}</span>
                </div>
                <Separator className="bg-gray-700 mb-4" />
                <Button 
                    asChild
                    className="w-full text-lg py-6 bg-accent-DEFAULT text-gray-950 hover:bg-accent-DEFAULT/90"
                >
                    <Link href="/dashboard/supply/create">
                        Оформить отгрузку
                    </Link>
                </Button>
            </div>
        </div>
    );
}
