"use client";

import { useState } from "react";
import { 
  Plus, 
  Trash2, 
  PackagePlus, 
  Send, 
  AlertCircle, 
  CheckCircle2,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface OrderItem {
  id: string;
  brand: string;
  name: string;
  article: string;
  size: string;
  color: string;
  quantity: number;
}

export default function CreateOrderPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<OrderItem[]>([]);
  
  // Поля для нового товара
  const [newItem, setNewItem] = useState({
    brand: "",
    name: "",
    article: "",
    size: "O/S",
    color: "Multi",
    quantity: 1
  });

  const addItem = () => {
    if (!newItem.name || !newItem.article) {
      toast.error("Название и Артикул обязательны");
      return;
    }
    setItems([...items, { ...newItem, id: Math.random().toString(36).substr(2, 9) }]);
    setNewItem({ brand: "", name: "", article: "", size: "O/S", color: "Multi", quantity: 1 });
    toast.success("Товар добавлен в список");
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSubmit = async () => {
    if (items.length === 0) {
      toast.error("Список товаров пуст");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(`Заказ ${data.orderId} успешно создан в МойСклад!`);
        setItems([]); // Очищаем список
        setTimeout(() => router.push("/dashboard/shipments"), 2000);
      } else {
        toast.error(data.error || "Ошибка при создании заказа");
      }
    } catch (error) {
      toast.error("Ошибка сети. Проверьте соединение.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 space-y-8 bg-[#1A0B2E] min-h-screen text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black italic uppercase text-white leading-none">
            Новая <span className="text-[#D9FF00]">Поставка</span>
          </h1>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mt-2 italic">
            Формирование заявки на приемку в МойСклад
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Форма добавления */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-[#2A1445] rounded-[3rem] p-8 border border-white/5 shadow-2xl">
            <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2 text-[#D9FF00]">
              <PackagePlus size={24} /> Данные товара
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Бренд</label>
                <input 
                  className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D9FF00] transition-all"
                  placeholder="Напр: Nike"
                  value={newItem.brand}
                  onChange={e => setNewItem({...newItem, brand: e.target.value})}
                />
              </div>
              <div>
                <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Название товара *</label>
                <input 
                  className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D9FF00] transition-all"
                  placeholder="Напр: Кепка черная"
                  value={newItem.name}
                  onChange={e => setNewItem({...newItem, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Артикул *</label>
                  <input 
                    className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D9FF00] transition-all"
                    placeholder="SKU-123"
                    value={newItem.article}
                    onChange={e => setNewItem({...newItem, article: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-slate-500 ml-2 tracking-widest">Кол-во</label>
                  <input 
                    type="number"
                    className="w-full bg-[#1A0B2E] border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-[#D9FF00] transition-all"
                    value={newItem.quantity}
                    onChange={e => setNewItem({...newItem, quantity: parseInt(e.target.value) || 1})}
                  />
                </div>
              </div>
              
              <button 
                onClick={addItem}
                className="w-full bg-white/5 hover:bg-white/10 text-white font-black py-5 rounded-2xl uppercase italic flex items-center justify-center gap-2 transition-all border border-white/5"
              >
                <Plus size={20} /> Добавить в список
              </button>
            </div>
          </div>
        </div>

        {/* Список к отправке */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#2A1445] rounded-[3rem] p-8 border border-white/5 shadow-2xl min-h-[500px] flex flex-col">
            <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-[#D9FF00]" size={24} /> Состав поставки ({items.length})
            </h3>

            <div className="flex-1 space-y-4">
              <AnimatePresence>
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20">
                    <AlertCircle size={48} className="mb-4 opacity-20" />
                    <p className="uppercase font-black italic tracking-widest opacity-20">Список пуст</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="bg-[#1A0B2E] p-6 rounded-3xl border border-white/5 flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-[#D9FF00]/10 rounded-xl flex items-center justify-center text-[#D9FF00] font-black italic">
                          {item.quantity}
                        </div>
                        <div>
                          <p className="font-black italic uppercase">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            {item.brand} • Арт: {item.article}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-3 text-slate-600 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={20} />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {items.length > 0 && (
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="mt-8 w-full bg-[#D9FF00] text-[#1A0B2E] font-black py-6 rounded-[2rem] text-xl uppercase italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_50px_rgba(217,255,0,0.2)] disabled:opacity-50"
              >
                {loading ? <Loader2 className="animate-spin" /> : <><Send size={24} /> Отправить в МойСклад</>}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
