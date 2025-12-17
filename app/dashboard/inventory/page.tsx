"use client";

import { Package, Search, Plus, Filter, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function InventoryPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-3xl font-black italic uppercase text-[#3A1C5F]">Инвентаризация</h1>
        <div className="flex gap-2 w-full md:w-auto">
          <Button variant="outline" className="rounded-xl border-slate-200"><Download size={18} /></Button>
          <Button className="bg-[#D9FF00] text-[#3A1C5F] font-bold rounded-xl px-6">+ ДОБАВИТЬ ТОВАР</Button>
        </div>
      </div>

      <div className="bg-white rounded-[2.5rem] p-4 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
          <input className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-2xl outline-none" placeholder="Поиск по артикулу или названию..." />
        </div>
        <Button variant="ghost" className="rounded-2xl gap-2 font-bold"><Filter size={18} /> Фильтры</Button>
      </div>

      <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-100 text-slate-400">
        <Package size={64} className="mb-4 opacity-20" />
        <p className="font-bold uppercase italic tracking-widest">Товары не загружены</p>
        <p className="text-sm mt-1">Синхронизируйте данные с маркетплейсом в настройках</p>
      </div>
    </div>
  );
}
