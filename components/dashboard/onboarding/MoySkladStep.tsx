// components/dashboard/onboarding/MoySkladStep.tsx
"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, Loader2, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface IntegrationStepProps {
  onNext: () => void;
}

export default function MoySkladStep({ onNext }: IntegrationStepProps) {
  const [key, setKey] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!key) return;

    setIsLoading(true);
    setStatus('idle');

    try {
      const res = await fetch('/api/dashboard/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ integrationType: 'MoySklad', key, companyName }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus('success');
        toast.success('Мой Склад подключен! Идет первая синхронизация.');
        setTimeout(onNext, 2000); 
      } else {
        setStatus('error');
        toast.error(`Ошибка подключения: ${data.error || 'Проверьте ключ.'}`);
      }
    } catch (error) {
      setStatus('error');
      toast.error('Ошибка сети. Проверьте соединение.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-primary-DEFAULT/90 p-8 rounded-xl shadow-2xl border border-accent-DEFAULT/30 max-w-lg mx-auto">
      <div className='flex items-center justify-center mb-4'><Zap className='h-8 w-8 text-accent-DEFAULT mr-2'/></div>
      <h2 className="text-3xl font-bold mb-4 text-accent-DEFAULT text-center">Шаг 3: Мой Склад (Ключевой)</h2>
      <p className="text-gray-300 mb-6 text-center">
        Это необходимо для синхронизации остатков и заказов.
      </p>

      <form onSubmit={handleConnect} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">Название компании (для FF24)</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-accent-DEFAULT focus:ring-accent-DEFAULT"
            placeholder="Ваша компания"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-400 mb-1">API Ключ / Логин:Пароль МС</label>
          <input
            type="text"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:border-accent-DEFAULT focus:ring-accent-DEFAULT"
            placeholder="токен Мой Склад"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full py-3 text-lg mt-6" 
          disabled={isLoading || status === 'success'}
        >
          {isLoading ? (
            <Loader2 className="animate-spin mr-2 h-5 w-5" />
          ) : status === 'success' ? (
            <CheckCircle className="mr-2 h-5 w-5" />
          ) : (
            'Подключить и Проверить'
          )}
        </Button>
      </form>
    </div>
  );
}
