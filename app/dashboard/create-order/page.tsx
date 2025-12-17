"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { ArrowLeft, Search, Plus, Trash2, Package, Truck, MoveRight } from "lucide-react";

export default function CreateShipmentPage() {
  const [items, setItems] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSearch = async (val: string) => {
    setSearch(val);
    if (val.length < 2) { setSearchResults([]); return; }
    try {
      const res = await fetch(`/api/products/search?search=${encodeURIComponent(val)}`);
      const data = await res.json();
      setSearchResults(data.products || []);
    } catch (e) {
      setSearchResults([]);
    }
  };

  const addItem = (p: any) => {
    if (items.find(i => i.id === p.id)) return;
    setItems([...items, { ...p, quantity: 1 }]);
    setSearch("");
    setSearchResults([]);
  };

  const handleCreate = async () => {
    if (items.length === 0) return toast.error("Добавьте хотя бы один товар");
    setLoading(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          type: "INBOUND", // Тип: Входящая поставка
          items 
        }),
      });
      if (res.ok) {
        toast.success("Заявка на приемку создана!");
        router.push("/dashboard");
      } else { 
        toast.error("Ошибка при создании"); 
      }
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#1A0B2E] p-4 md:p-10 text-white">
      <div className="max-w-3xl mx-auto">
        <button 
          onClick={() => router.back()} 
          className="mb-8 flex items-center gap-2 text-[#D9FF00] font-black uppercase italic tracking-widest text-sm"
        >
          <ArrowLeft size={18} /> Назад
        </button>

        <div className="bg-[#2A1445] rounded-[3rem] shadow-2xl overflow-hidden border border-white/5">
          {/* Header */}
          <div className="bg-[#3A1C5F] p-8 flex items-center justify-between border-b border-white/5">
            <div>
              <h1 className="text-3xl font-black uppercase italic leading-none">Новая поставка</h1>
              <p className="text-[#D9FF00] text-xs font-bold mt-2 tracking-widest uppercase opacity-80 italic">
                Передача товара на склад FF24
              </p>
            </div>
            <Truck className="text-[#D9FF00] opacity-20" size={48} />
          </div>

          <div className="p-8 md:p-12 space-y-8">
            {/* Поиск товаров клиента */}
            <div className="relative">
              <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block ml-2">Найти мой товар в базе</label>
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                <input 
                  type="text"
                  placeholder="Артикул, название или штрихкод..."
                  className="w-full bg-white/5 border-2 border-white/10 rounded-2xl px-14 py-5 outline-none focus:border-[#D9FF00] transition-all font-medium"
                  value={search}
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>

              {searchResults.length > 0 && (
                <div className="absolute z-50 w-full bg-[#3A1C5F] mt-2 shadow-2xl rounded-2xl border border-white/10 max-h-60 overflow-y-auto backdrop-blur-xl">
                  {searchResults.map(p => (
                    <div key={p.id} onClick={() => addItem(p)} className="p-4 hover:bg-[#D9FF00]/10 cursor-pointer flex justify-between items-center border-b border-white/5 last:border-0 transition-colors">
                      <div>
                        <p className="font-bold text-white uppercase italic">{p.name}</p>
                        <p className="text-[10px] text-[#D9FF00] font-mono tracking-tighter">{p.article}</p>
                      </div>
                      <div className="bg-[#D9FF00] p-1 rounded-lg text-black"><Plus size={16} /></div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Список товаров к отгрузке */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest ml-2">Состав поставки:</h3>
              {items.length === 0 ? (
                <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
                   <Package className="mx-auto text-white/5 mb-4" size={64} />
                   <p className="text-slate-500 font-bold uppercase italic text-sm">Добавьте товары, которые планируете привезти</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={item.id} className="flex items-center justify-between p-6 bg-white/5 rounded-[2rem] border border-white/5">
                      <div className="flex-1">
                        <p className="font-black text-white italic uppercase">{item.name}</p>
                        <p className="text-[10px] text-[#D9FF00] font-mono mt-1 tracking-widest">{item.article}</p>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="flex flex-col items-center">
                           <span className="text-[10px] font-bold text-slate-500 uppercase mb-1">Кол-во</span>
                           <input 
                            type="number"
                            min="1"
                            className="w-24 bg-[#1A0B2E] border-2 border-white/10 rounded-xl py-2 text-center font-black text-[#D9FF00] focus:border-[#D9FF00] outline-none"
                            value={item.quantity}
                            onChange={(e) => {
                              const newItems = [...items];
                              newItems[idx].quantity = parseInt(e.target.value) || 1;
                              setItems(newItems);
                            }}
                          />
                        </div>
                        <button 
                          onClick={() => setItems(items.filter(i => i.id !== item.id))} 
                          className="text-white/20 hover:text-red-500 transition-colors mt-4"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Итоговая кнопка */}
            <div className="pt-6">
              <button 
                onClick={handleCreate}
                disabled={loading || items.length === 0}
                className="w-full bg-[#D9FF00] hover:scale-[1.02] disabled:bg-slate-700 disabled:scale-100 text-[#1A0B2E] font-black py-7 rounded-[2rem] text-xl uppercase tracking-widest shadow-[0_20px_40px_rgba(217,255,0,0.15)] transition-all flex items-center justify-center gap-3 italic"
              >
                {loading ? "Формирование..." : <>Создать заявку на приемку <MoveRight /></>}
              </button>
              <p className="text-center text-slate-500 text-[10px] mt-4 uppercase font-bold tracking-widest opacity-50">
                После создания заявки наш менеджер свяжется с вами для уточнения времени
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
