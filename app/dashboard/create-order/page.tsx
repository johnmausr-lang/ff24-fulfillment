"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function CreateOrderPage() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (val: string) => {
    setSearch(val);
    if (val.length < 2) { setSearchResults([]); return; }
    const res = await fetch(`/api/products/search?search=${val}`);
    const data = await res.json();
    setSearchResults(data.products || []);
  };

  const addItem = (p: any) => {
    if (items.find(i => i.id === p.id)) return;
    setItems([...items, { ...p, quantity: 1 }]);
    setSearch("");
    setSearchResults([]);
  };

  const handleCreate = async () => {
    if (items.length === 0) return toast.error("Выберите товары");
    setLoading(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        body: JSON.stringify({ items }),
      });
      if (res.ok) {
        toast.success("Поставка успешно создана!");
        router.push("/dashboard");
      } else { toast.error("Ошибка при создании"); }
    } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 md:p-10">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => router.back()} className="mb-8 flex items-center gap-2 text-[#3A1C5F] font-black uppercase italic tracking-widest text-sm">
          ← Назад в дашборд
        </button>

        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-[#3A1C5F] p-8 text-white">
            <h1 className="text-3xl font-black uppercase italic leading-none">Новая поставка</h1>
            <p className="text-[#D9FF00] text-xs font-bold mt-2 tracking-widest uppercase opacity-80">Добавление товара на склад FF24</p>
          </div>

          <div className="p-8 md:p-12 space-y-8">
            {/* SEARCH */}
            <div className="relative">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block ml-2">Поиск SKU в базе</label>
              <input 
                type="text"
                placeholder="Введите название или артикул..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-[#D9FF00] transition-all font-medium"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
              {searchResults.length > 0 && (
                <div className="absolute z-50 w-full bg-white mt-2 shadow-2xl rounded-2xl border border-slate-100 max-h-60 overflow-y-auto">
                  {searchResults.map(p => (
                    <div key={p.id} onClick={() => addItem(p)} className="p-4 hover:bg-[#D9FF00]/10 cursor-pointer flex justify-between items-center border-b last:border-0">
                      <div>
                        <p className="font-bold text-[#3A1C5F]">{p.name}</p>
                        <p className="text-xs text-slate-400 uppercase font-mono">{p.article}</p>
                      </div>
                      <span className="text-[#3A1C5F] font-black text-xl">+</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SELECTED ITEMS */}
            <div className="space-y-3">
              {items.map((item, idx) => (
                <div key={item.id} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border-2 border-white shadow-sm">
                  <div className="max-w-[60%]">
                    <p className="font-bold text-[#3A1C5F] leading-tight">{item.name}</p>
                    <p className="text-[10px] text-slate-400 font-mono mt-1">{item.article}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <input 
                      type="number"
                      className="w-20 bg-white border-2 border-slate-100 rounded-xl px-2 py-2 text-center font-black text-[#3A1C5F]"
                      value={item.quantity}
                      onChange={(e) => {
                        const newItems = [...items];
                        newItems[idx].quantity = e.target.value;
                        setItems(newItems);
                      }}
                    />
                    <button onClick={() => setItems(items.filter(i => i.id !== item.id))} className="text-slate-300 hover:text-red-500 transition-colors">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={handleCreate}
              disabled={loading || items.length === 0}
              className="w-full bg-[#3A1C5F] hover:bg-[#2A1445] disabled:bg-slate-200 text-white font-black py-6 rounded-2xl text-lg uppercase tracking-widest shadow-xl shadow-purple-100 transition-all active:scale-[0.98]"
            >
              {loading ? "Отправка данных..." : "Оформить поставку"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
