import React from 'react';
import { Download, Box, Package, Truck, CheckCircle } from 'lucide-react';
import FadeInDiv from './FadeInDiv'; // Для анимации

// Данные для таймлайна
const steps = [
  {
    icon: Download,
    title: '1. Синхронизация и заявка',
    description: 'Вы интегрируете свой кабинет маркетплейса с нашей WMS-системой. Создаете заявку на фулфилмент.',
  },
  {
    icon: Box,
    title: '2. Приемка товара на складе',
    description: 'Мы принимаем ваш товар, проводим его верификацию, пересчет и вносим в систему.',
  },
  {
    icon: Package,
    title: '3. Упаковка и маркировка (SKU)',
    description: 'Профессиональная упаковка, печать штрихкодов и маркировка по требованиям Wildberries/Ozon.',
  },
  {
    icon: Truck,
    title: '4. Доставка на склад MP',
    description: 'Мы формируем отгрузочные документы и доставляем готовую партию на необходимый склад маркетплейса.',
  },
  {
    icon: CheckCircle,
    title: '5. Завершение и отчет',
    description: 'Вы получаете финальный отчет о доставке и успешной приемке товара маркетплейсом.',
  },
];

const ProcessTimeline: React.FC = () => {
  return (
    <section id="process" className="section-container bg-background">
      <FadeInDiv>
        <h3 className="text-3xl md:text-4xl font-bold text-center text-primary mb-16">
          Как работает ФФ24?
        </h3>
      </FadeInDiv>

      <div className="relative max-w-4xl mx-auto">
        
        {/* Вертикальная линия таймлайна (Фиолетовый) */}
        <div className="absolute left-4 top-0 bottom-0 w-1 bg-primary/20 md:left-1/2 md:transform md:-translate-x-1/2"></div>
        
        {steps.map((step, index) => (
          <FadeInDiv key={index} delay={index * 200}>
            <div 
              className={`mb-8 flex justify-between items-center w-full 
                        ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
            >
              
              {/* Левый/Правый контент */}
              <div className="w-10/12 md:w-5/12 p-4">
                <div className={`bg-white p-6 rounded-xl shadow-lg border-l-4 ${index % 2 === 0 ? 'border-r-0 border-accent/70' : 'border-l-0 border-accent/70'}`}>
                  <h4 className="text-xl font-semibold text-content mb-2">{step.title}</h4>
                  <p className="text-content/70 text-sm">{step.description}</p>
                </div>
              </div>

              {/* Центральный круговой индикатор (Неоново-салатовый) */}
              <div className="flex justify-center items-center w-8 h-8 md:w-auto md:h-auto md:absolute md:left-1/2 md:transform md:-translate-x-1/2 z-10">
                <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-primary font-bold border-4 border-primary shadow-neon transition-all duration-300 hover:scale-110">
                  {/* Иконка этапа */}
                  <step.icon className="w-5 h-5 text-primary" />
                </div>
              </div>

              {/* Пустая колонка для выравнивания на мобильных */}
              <div className="w-10/12 md:w-5/12 hidden md:block"></div>
            </div>
          </FadeInDiv>
        ))}
      </div>
    </section>
  );
};

export default ProcessTimeline;
