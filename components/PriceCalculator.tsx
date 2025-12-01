'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link'; // <-- ИСПРАВЛЕНИЕ: Добавление импорта Link
import { Package, ShoppingCart, TrendingUp } from 'lucide-react';
import FadeInDiv from './FadeInDiv'; // Для анимации

// Базовые тарифы для имитации расчета (Mock-up)
const BASE_PRICE = 30; // Базовая цена за одно SKU/упаковку
const MARKETPLACE_MULTIPLIER = {
  wildberries: 1.0,
  ozon: 1.1, // Чуть дороже из-за требований
  yandex: 1.05,
};

const PriceCalculator: React.FC = () => {
  const [skuCount, setSkuCount] = useState(100);
  const [itemsPerOrder, setItemsPerOrder] = useState(1);
  const [marketplace, setMarketplace] = useState<'wildberries' | 'ozon' | 'yandex'>('wildberries');

  // Функция для имитации расчета стоимости
  const totalPrice = useMemo(() => {
    const totalItems = skuCount * itemsPerOrder;
    const baseCost = totalItems * BASE_PRICE;
    const finalCost = baseCost * MARKETPLACE_MULTIPLIER[marketplace];
    
    // Добавляем минимальную комиссию и округляем
    return Math.round(finalCost * 1.05); 
  }, [skuCount, itemsPerOrder, marketplace]);

  const pricePerItem = (totalPrice / (skuCount * itemsPerOrder)).toFixed(2);
  
  // Данные для полей выбора
  const marketplaceOptions = [
    { value: 'wildberries', label: 'Wildberries' },
    { value: 'ozon', label: 'Ozon' },
    { value: 'yandex', label: 'Яндекс.Маркет' },
  ];

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>, setter: React.Dispatch<React.SetStateAction<any>>) => {
    setter(Number(e.target.value));
  };

  return (
    <section id="calculator" className="section-container bg-primary/5">
      <FadeInDiv>
        <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-2xl">
          <h3 className="text-3xl font-bold text-center text-primary mb-2">
            Калькулятор стоимости
          </h3>
          <p className="text-center text-content/70 mb-10">
            Получите мгновенный расчет фулфилмента
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Колонка 1 & 2: Формы ввода (Слайдеры) */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Выбор маркетплейса */}
              <div>
                <label className="block text-content font-semibold mb-2 flex items-center">
                  <ShoppingCart className="w-5 h-5 mr-2 text-accent" />
                  Маркетплейс
                </label>
                <div className="flex space-x-4">
                  {marketplaceOptions.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setMarketplace(opt.value as any)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 
                        ${marketplace === opt.value 
                          ? 'bg-accent text-primary shadow-md' 
                          : 'bg-gray-100 text-content/80 hover:bg-gray-200'
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Слайдер: Количество SKU */}
              <div>
                <label className="block text-content font-semibold mb-3 flex justify-between items-center">
                  <span>
                    <Package className="w-5 h-5 mr-2 inline-block text-accent" />
                    Количество SKU (единиц товара)
                  </span>
                  <span className="text-2xl font-bold text-primary">{skuCount}</span>
                </label>
                <input
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={skuCount}
                  onChange={(e) => handleSliderChange(e, setSkuCount)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-primary"
                />
                <div className="flex justify-between text-xs text-content/60 mt-1">
                  <span>50 SKU</span>
                  <span>10 000+ SKU</span>
                </div>
              </div>

              {/* Слайдер: Среднее количество вложений в один заказ */}
              <div>
                <label className="block text-content font-semibold mb-3 flex justify-between items-center">
                  <span>
                    <TrendingUp className="w-5 h-5 mr-2 inline-block text-accent" />
                    Среднее количество вложений в заказ
                  </span>
                  <span className="text-2xl font-bold text-primary">{itemsPerOrder}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="1"
                  value={itemsPerOrder}
                  onChange={(e) => handleSliderChange(e, setItemsPerOrder)}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer range-lg accent-primary"
                />
                <div className="flex justify-between text-xs text-content/60 mt-1">
                  <span>1 ед.</span>
                  <span>5+ ед.</span>
                </div>
              </div>
            </div>

            {/* Колонка 3: Результат */}
            <div className="lg:col-span-1 bg-primary text-white p-6 rounded-xl shadow-inner flex flex-col justify-center">
              <p className="text-sm uppercase tracking-widest text-white/80">Итоговая стоимость (ориентировочно)</p>
              <p className="text-5xl font-extrabold my-2">
                {totalPrice.toLocaleString('ru-RU')} ₽
              </p>
              <p className="text-white/70 mb-6">
                ~ {pricePerItem} ₽ за единицу товара
              </p>
              
              {/* CTA для перехода к деталям */}
              <Link href="#contact-form" className="neon-button text-center bg-accent text-primary">
                Получить точный расчет
              </Link>
            </div>
          </div>
        </div>
      </FadeInDiv>
    </section>
  );
};

export default PriceCalculator;
