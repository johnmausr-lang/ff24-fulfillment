"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CreateOrderPage() {
  const [items, setItems] = useState<{ id: string; name: string; quantity: number; meta: any }[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchProducts = async (q: string) => {
    setSearch(q);
    if (q.length < 3) return;
    const res = await fetch(`/api/products/search?search=${q}`);
    const data = await res.json();
    setSearchResults(data.products || []);
  };

  const addItem = (p: any) => {
    if (items.find(i => i.id === p.id)) return;
    setItems([...items, { ...p, quantity: 1 }]);
    setSearch("");
    setSearchResults([]);
  };

  const submitOrder = async () => {
    if (items.length === 0) return toast.error("Добавьте хотя бы один товар");
    setLoading(true);
    const res = await fetch("/api/orders/create", {
      method: "POST",
      body: JSON.stringify({ items }),
    });
    if (res.ok) {
      toast.success("Заказ успешно создан!");
      router.push("/dashboard");
    } else {
      toast.error("Ошибка при отправке заказа");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <button onClick={() => router.back()} className="mb-6 text-[#3A1C5F] font-bold flex items-center gap-2">
          ← НАЗАД
        </button>
        
        <div className="bg-white rounded-[2.5rem] p-8 shadow-2xl border border-slate-100">
          <h1 className="text-3xl font-black text-[#3A1C5F] uppercase italic mb-8">Новый заказ в FF24</h1>
          
          {/* Поиск товаров */}
          <div className="relative mb-10">
            <label className="block text-xs font-black uppercase text-slate-400 mb-2 ml-1">Поиск товара по названию или артикулу</label>
            <input 
              type="text" 
              className="w-full p-5 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-[#D9FF00] outline-none transition-all"
              placeholder="Введите минимум 3 символа..."
              value={search}
              onChange={(e) => searchProducts(e.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute z-10 w-full bg-white mt-2 shadow-2xl rounded-2xl border border-slate-100 overflow-hidden">
                {searchResults.map(p => (
                  <div key={p.id} onClick={() => addItem(p)} className="p-4 hover:bg-[#D9FF00]/10 cursor-pointer border-b last:border-0 transition-colors">
                    <p className="font-bold text-[#3A1C5F]">{p.name}</p>
                    <p className="text-xs text-slate-400">{p.code}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Список выбранных */}
          <div className="space-y-4 mb-10">
            {items.map((item, idx) => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div>
                  <p className="font-bold text-[#3A1C5F]">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.code}</p>
                </div>
                <div className="flex items-center gap-4">
                  <input 
                    type="number" 
                    min="1"
                    className="w-20 p-2 border-2 border-white rounded-xl text-center font-bold"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...items];
                      newItems[idx].quantity = parseInt(e.target.value) || 1;
                      setItems(newItems);
                    }}
                  />
                  <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-red-400 hover:text-red-600">✕</button>
                </div>
              </div>
            ))}
          </div>

          <button 
            onClick={submitOrder}
            disabled={loading}
            className="w-full bg-[#3A1C5F] text-white font-black py-6 rounded-3xl text-xl hover:bg-[#2A1445] transition-all shadow-xl shadow-purple-200"
          >
            {loading ? "СОЗДАЕМ..." : "ОТПРАВИТЬ ЗАКАЗ НА СКЛАД"}
          </button>
        </div>
      </div>
    </div>
  );
}
