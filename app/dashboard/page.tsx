import React from 'react';
import { Package, TrendingUp, DollarSign, Truck } from 'lucide-react';

// Данные для карточек метрик (Mock-up)
const dashboardMetrics = [
  {
    title: 'Остаток SKU на складе',
    value: '14 520',
    unit: 'ед.',
    icon: Package,
    color: 'text-primary bg-primary/10',
  },
  {
    title: 'Обработано заказов (месяц)',
    value: '3 218',
    unit: 'шт.',
    icon: TrendingUp,
    color: 'text-accent bg-accent/10',
  },
  {
    title: 'Баланс счета',
    value: '45 800',
    unit: '₽',
    icon: DollarSign,
    color: 'text-green-600 bg-green-100',
  },
  {
    title: 'Заявок на отгрузку',
    value: '4',
    unit: 'активных',
    icon: Truck,
    color: 'text-orange-600 bg-orange-100',
  },
];

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-content mb-8">Сводная панель ФФ24</h1>
      
      {/* Секция Метрик */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dashboardMetrics.map((metric, index) => (
          <div 
            key={index} 
            className="bg-white p-6 rounded-xl shadow-md border-b-4 border-primary/20 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-content/70">{metric.title}</p>
              <metric.icon className={`w-6 h-6 p-1 rounded-full ${metric.color}`} />
            </div>
            <div className="mt-4">
              <span className="text-4xl font-extrabold text-content">{metric.value}</span>
              <span className="text-base text-content/60 ml-2">{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Секция последних заказов (для полноты) */}
      <h2 className="text-2xl font-semibold text-content mb-4">Последние операции</h2>
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Заказ</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Маркетплейс</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {/* Имитация строк данных */}
                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">28.11.2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">WB-20531</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Wildberries</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Отправлен
                            </span>
                        </td>
                    </tr>
                    <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">27.11.2025</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-primary font-medium">OZ-98211</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ozon</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                                В обработке
                            </span>
                        </td>
                    </tr>
                    {/* ... другие строки */}
                </tbody>
            </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
