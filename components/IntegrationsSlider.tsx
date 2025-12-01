import React from 'react';
import FadeInDiv from './FadeInDiv'; 

// Данные для логотипов маркетплейсов (Mock-up)
// В реальном проекте здесь будут использоваться компоненты Next/Image с реальными логотипами
const marketplaceLogos = [
  { name: 'Wildberries', color: 'bg-[#C11776]', text: 'text-white' },
  { name: 'Ozon', color: 'bg-[#005FEA]', text: 'text-white' },
  { name: 'Яндекс.Маркет', color: 'bg-[#FFCC00]', text: 'text-content' },
  { name: 'AliExpress', color: 'bg-[#FF5500]', text: 'text-white' },
  { name: 'KazanExpress', color: 'bg-[#FF4D00]', text: 'text-white' },
];

const IntegrationsSlider: React.FC = () => {
  // Мы дублируем логотипы, чтобы обеспечить плавный переход и создать эффект бесконечности
  const doubledLogos = [...marketplaceLogos, ...marketplaceLogos]; 

  return (
    <section id="integrations" className="section-container bg-white">
      <FadeInDiv>
        <h3 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
          Полная интеграция с Маркетплейсами
        </h3>
        <p className="text-center text-lg text-content/70 mb-16 max-w-2xl mx-auto">
          Автоматизированный обмен данными со всеми ключевыми площадками для ускорения обработки ваших заказов.
        </p>
      </FadeInDiv>

      {/* Контейнер для слайдера */}
      <FadeInDiv delay={200}>
        <div className="overflow-hidden relative w-full border-y-2 border-primary/10 py-6">
          
          {/* Создаем анимацию "бегущей строки" через CSS-классы */}
          <style jsx global>{`
            /* Определяем ключевые кадры для движения */
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); } /* Сдвигаем на 50% ширины контейнера (т.е. на один набор логотипов) */
            }
            
            /* Применяем анимацию к внутреннему контейнеру */
            .marquee-content {
              animation: marquee 30s linear infinite; /* 30 секунд, линейно, бесконечно */
              width: 200%; /* Удвоенная ширина для размещения двух наборов лого */
              display: flex;
            }
            /* Останавливаем анимацию при наведении */
            .marquee-content:hover {
                animation-play-state: paused;
            }
          `}</style>

          <div className="marquee-content flex space-x-12">
            {doubledLogos.map((logo, index) => (
              <div 
                key={index} 
                className={`flex-shrink-0 flex items-center justify-center p-4 rounded-lg h-24 w-48 ${logo.color} ${logo.text} text-xl font-bold shadow-md opacity-80 hover:opacity-100 transition-opacity duration-300`}
              >
                {/* В реальном проекте: <Image src={...} alt={logo.name} /> */}
                {logo.name}
              </div>
            ))}
          </div>

          {/* Неоновый градиент для маскирования начала/конца */}
          <div className="absolute top-0 bottom-0 left-0 w-16 bg-gradient-to-r from-white to-transparent"></div>
          <div className="absolute top-0 bottom-0 right-0 w-16 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </FadeInDiv>
    </section>
  );
};

export default IntegrationsSlider;
