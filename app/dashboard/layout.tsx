// app/dashboard/layout.tsx
import Sidebar from '@/components/dashboard/Sidebar';
// import DashboardHeader from '@/components/dashboard/DashboardHeader'; // Удален импорт

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-950">
      {/* Sidebar (фиксированный) */}
      <Sidebar />
      
      {/* Основной контент (с отступом слева) */}
      <div className="flex-1 flex flex-col ml-64 overflow-y-auto">
        {/* Хедер внутри ЛКК */}
        <DashboardHeader />
        
        {/* Тело страницы */}
        <main className="flex-1 p-8 text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

// Дополнительный компонент для хедера внутри дашборда
const DashboardHeader = () => (
    <header className="sticky top-0 z-10 bg-gray-950/95 backdrop-blur-sm p-4 border-b border-gray-800 flex justify-end items-center">
        {/* Здесь будет поиск, уведомления, профиль пользователя */}
        <div className="text-gray-400 text-sm">
            <span className="mr-4">🔔</span>
            <span className="mr-4">🔍</span>
            <span className="text-accent-DEFAULT">User@company.ru</span>
        </div>
    </header>
);
