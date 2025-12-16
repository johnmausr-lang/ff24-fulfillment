// app/dashboard/integrations/page.tsx
"use client";

import { useState, useEffect } from 'react';
import { Clock, RefreshCw, PlugZap, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

interface IntegrationStatus {
  type: string;
  isEnabled: boolean;
  companyName: string;
  lastSync: string;
}

// Моки для отображения всех карточек
const mockAvailableIntegrations = ['MoySklad', 'Wildberries', 'Ozon'];

const getLogo = (type: string) => {
    switch(type) {
        case 'MoySklad': return <PlugZap className="h-6 w-6 text-accent-DEFAULT" />;
        // Используем иконки-заглушки для WB/Ozon
        case 'Wildberries': return <div className="text-white text-xl font-bold">WB</div>;
        case 'Ozon': return <div className="text-white text-xl font-bold">OZ</div>;
        default: return <PlugZap className="h-6 w-6 text-gray-500" />;
    }
};

const formatTime = (isoString: string) => {
    if (!isoString) return 'Нет данных';
    return new Date(isoString).toLocaleString('ru-RU', {
        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit',
    });
};

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchIntegrations = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/dashboard/integrations');
      if (res.ok) {
        const data = await res.json();
        setIntegrations(data);
      } else {
        toast.error('Не удалось загрузить статусы интеграций.');
      }
    } catch (error) {
      toast.error('Ошибка сети при загрузке данных.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const handleManualSync = (type: string) => {
    toast.promise(
      new Promise((resolve) => {
        // Здесь будет POST-запрос на запуск синхронизации
        setTimeout(() => {
          resolve({ message: `Синхронизация ${type} запущена. Обновляем статус...` });
          fetchIntegrations(); 
        }, 1500);
      }),
      {
        loading: `Запуск синхронизации ${type}...`,
        success: (data: any) => data.message,
        error: `Ошибка при запуске синхронизации ${type}.`,
      }
    );
  };
  
  // Объединяем полученные статусы с моками для отображения всех карточек
  const displayIntegrations = mockAvailableIntegrations.map(type => {
      const existing = integrations.find(i => i.type === type);
      return existing || { type, isEnabled: false, companyName: '', lastSync: new Date().toISOString() };
  });


  return (
    <div className="p-8">
      <h1 className="text-4xl font-extrabold text-white mb-8">Управление Интеграциями</h1>
      
      {isLoading ? (
        <div className="flex items-center text-gray-400">
          <Loader2 className="animate-spin mr-2 h-5 w-5" /> Загрузка статусов...
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayIntegrations.map((item, index) => (
            <div 
              key={item.type} 
              className={`p-6 rounded-xl shadow-2xl transition-all duration-300 
                ${item.isEnabled 
                  ? 'bg-gray-800 border-l-4 border-accent-DEFAULT hover:shadow-neon-sm' 
                  : 'bg-gray-900 border-l-4 border-gray-600'}`
              }
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center space-x-3">
                  {getLogo(item.type)}
                  <h2 className="text-2xl font-bold text-white">{item.type}</h2>
                </div>
                {item.isEnabled ? (
                  <CheckCircle className="h-6 w-6 text-accent-DEFAULT" />
                ) : (
                  <XCircle className="h-6 w-6 text-gray-500" />
                )}
              </div>

              <p className="text-sm text-gray-400 mb-4">
                {item.isEnabled 
                  ? `Подключено к: ${item.companyName || 'N/A'}` 
                  : 'Требуется подключение API-ключа.'
                }
              </p>

              <div className="flex items-center text-xs text-gray-500 mb-6">
                <Clock className="h-4 w-4 mr-1" />
                Последняя синхронизация: {formatTime(item.lastSync)}
              </div>

              {item.isEnabled ? (
                <Button 
                  variant="secondary" 
                  size="sm" 
                  onClick={() => handleManualSync(item.type)}
                >
                  <RefreshCw className="h-4 w-4 mr-2" /> 
                  Синхронизировать сейчас
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={() => toast(`Открывается окно настройки ${item.type}`)} 
                >
                  Подключить
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
