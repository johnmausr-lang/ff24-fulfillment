// app/dashboard/onboarding/page.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MoySkladStep from '@/components/dashboard/onboarding/MoySkladStep';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';

// Моки для других шагов
const WelcomeStep = ({ onNext }: { onNext: () => void }) => (
    <div className="text-center">
        <h1 className="text-5xl font-extrabold text-accent-DEFAULT mb-4">Начнем!</h1>
        <p className="text-lg text-gray-300">Пройдите 4 простых шага для активации ЛКК.</p>
        <Button onClick={onNext} size="lg" className="mt-8">Начать настройку</Button>
    </div>
);
const FinalStep = ({ onNext }: { onNext: () => void }) => (
    <div className="text-center">
        <h2 className="text-4xl font-bold mb-4">Настройка Завершена!</h2>
        <p className="text-gray-300 mb-6">Ваши системы синхронизируются. Переходим к дашборду.</p>
        <Button onClick={onNext} size="lg" className="mt-8">Перейти в Дашборд</Button>
    </div>
);

const steps = [
    { name: "Приветствие", component: WelcomeStep },
    { name: "Мой Склад", component: MoySkladStep }, // Шаг 2 - Ключевой
    { name: "Завершение", component: FinalStep },
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);
    const router = useRouter();
    const totalSteps = steps.length;

    const handleNext = () => {
        if (currentStep < totalSteps - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            router.push('/dashboard'); 
        }
    };

    const StepComponent = steps[currentStep].component;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-4">
            
            {/* Прогресс-бар */}
            <div className="w-full max-w-xl mb-12">
                <div className="text-sm font-medium text-gray-400 mb-2">
                    Шаг {currentStep + 1} из {totalSteps}: {steps[currentStep].name}
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                    <div 
                        className="bg-accent-DEFAULT h-2.5 rounded-full transition-all duration-500" 
                        style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
                    ></div>
                </div>
            </div>

            {/* Контейнер Шага */}
            <div className="w-full max-w-xl p-8">
                <StepComponent onNext={handleNext} />
            </div>
        </div>
    );
}
