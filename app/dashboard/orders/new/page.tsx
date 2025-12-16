// app/dashboard/orders/new/page.tsx
"use client";

import { useState } from 'react';
// ИСПРАВЛЕНО: Предполагаем, что имя файла компонента Card с заглавной буквы
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card'; 
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { useOrderCreation, CartItem } from '@/hooks/useOrderCreation'; 
import { useRouter } from 'next/navigation';
import { Separator } from '@/components/ui/separator';
import { Plus, Minus, Trash2 } from 'lucide-react';

// ... (остальной код остается тем же)

// Мок-данные о товарах для поиска
interface Product {
    id: string;
    name: string;
    price: number;
}

const MOCK_PRODUCTS: Product[] = [
    { id: 'prod1', name: 'Смартфон X', price: 50000 },
    { id: 'prod2', name: 'Ноутбук Pro', price: 120000 },
    { id: 'prod3', name: 'Монитор 4K', price: 35000 },
    { id: 'prod4', name: 'Клавиатура RGB', price: 8000 },
];

// Вспомогательная функция для форматирования валюты
const currencyFormatter = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency: 'RUB',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};


export default function NewOrderPage() {
    const { 
        items, 
        addItem, 
        removeItem, 
        updateQuantity, 
        totalPrice, 
        clearCart 
    } = useOrderCreation();
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const filteredProducts = MOCK_PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAddItem = (product: Product) => {
        const newItem: CartItem = { 
            id: product.id, 
            name: product.name, 
            price: product.price, 
            quantity: 1 
        };
        addItem(newItem);
        toast.success(`"${product.name}" добавлен в заказ.`);
    };

    const handleCreateOrder = () => {
        if (items.length === 0) {
            toast.error("Добавьте товары, прежде чем создавать заказ.");
            return;
        }

        // В реальном приложении здесь будет логика отправки данных на API
        console.log("Отправка заказа:", items);
        
        toast.success("Заказ успешно создан!");
        clearCart(); // Очистка корзины после успешной отправки
        router.push('/dashboard/orders'); // Перенаправление на страницу заказов
    };

    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold">Создание нового заказа</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Левая колонка: Поиск товаров */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Поиск товаров</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <input
                            type="text"
                            placeholder="Найти товар..."
                            className="w-full p-2 border border-input rounded-md mb-4 bg-background"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="space-y-3 max-h-80 overflow-y-auto">
                            {filteredProducts.map(product => (
                                <div key={product.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800">
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p className="text-sm text-muted-foreground">{currencyFormatter(product.price)}</p>
                                    </div>
                                    <Button 
                                        onClick={() => handleAddItem(product)}
                                        size="sm"
                                    >
                                        <Plus className="h-4 w-4 mr-1" /> Добавить
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Правая колонка: Корзина заказа */}
                <Card>
                    <CardHeader>
                        <CardTitle>Текущий заказ ({items.length} {items.length === 1 ? 'товар' : 'товаров'})</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        
                        {items.length === 0 ? (
                            <p className="text-center text-muted-foreground">Корзина пуста. Добавьте товары слева.</p>
                        ) : (
                            <>
                                <div className="max-h-60 overflow-y-auto space-y-3">
                                    {items.map(item => (
                                        <div key={item.id} className="flex items-center justify-between border-b pb-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium truncate">{item.name}</p>
                                                <p className="text-xs text-muted-foreground">{currencyFormatter(item.price)}</p>
                                            </div>
                                            
                                            {/* Управление количеством */}
                                            <div className="flex items-center space-x-1">
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    className="h-6 w-6"
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span className="text-sm w-5 text-center">{item.quantity}</span>
                                                <Button 
                                                    variant="outline" 
                                                    size="icon" 
                                                    className="h-6 w-6"
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" 
                                                    size="icon" 
                                                    className="h-6 w-6 text-red-500"
                                                    onClick={() => removeItem(item.id)}
                                                >
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                
                                <Separator />

                                <div className="flex justify-between font-bold text-lg">
                                    <span>Итого:</span>
                                    <span>{currencyFormatter(totalPrice)}</span>
                                </div>
                            </>
                        )}
                        
                        <Button 
                            className="w-full" 
                            onClick={handleCreateOrder} 
                            disabled={items.length === 0}
                        >
                            Создать заказ
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
