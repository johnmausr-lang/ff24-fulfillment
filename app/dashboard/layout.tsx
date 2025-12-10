import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import "@/app/globals.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-bg flex min-h-screen text-white">
      {/* Левое меню */}
      <Sidebar />

      {/* Правая часть */}
      <div className="flex-1 flex flex-col relative overflow-hidden">

        {/* Верхняя панель */}
        <DashboardHeader />

        {/* Контент */}
        <main className="relative z-10 px-8 py-10 ff24-fade-up">
          {children}
        </main>

        {/* НЕОН + линий фон как на главной */}
        <div className="ff24-hero-grid"></div>

        <div className="ff24-hero-lines pointer-events-none">
          <div className="ff24-hero-line" />
          <div className="ff24-hero-line" />
          <div className="ff24-hero-line" />
        </div>
      </div>
    </div>
  );
}
