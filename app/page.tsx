import Link from 'next/link';
import { Truck, Zap, Lock, DollarSign } from 'lucide-react';
import FadeInDiv from '@/components/FadeInDiv';

// Иконки и данные для секции Преимуществ
const advantageData = [
  {
    icon: Truck,
    title: 'Мгновенная обработка',
    description: 'Приемка и отправка заказов в течение 24 часов. Никаких задержек — только скорость!',
    color: 'border-accent/50 text-accent',
  },
  {
    icon: DollarSign,
    title: 'Прозрачные тарифы',
    description: 'Справедливая и понятная цена, которая не изменится. Рассчитайте стоимость прямо на сайте.',
    color: 'border-primary/50 text-primary',
  },
  {
    icon: Zap,
    title: 'Интеграция с маркетплейсами',
    description: 'Полная автоматизация обмена данными с Wildberries, Ozon и Яндекс.Маркет.',
    color: 'border-accent/50 text-accent',
  },
  {
    icon: Lock,
    title: 'Контроль и надежность',
    description: 'Система видеонаблюдения и строгое соблюдение WMS-стандартов для сохранности вашего товара.',
    color: 'border-primary/50 text-primary',
  },
];

const HomePage = () => {
  return (
    <div>
      {/* ------------------------------------------------------------------- */}
      {/* 1. Секция ГЕРОЙ (HERO) */}
      {/* ------------------------------------------------------------------- */}
      <section className="section-container pt-24 pb-32 md:pt-32 md:pb-48 text-center bg-background">
        <FadeInDiv>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 text-primary">
            ФФ24: Фулфилмент
          </h1>
        </FadeInDiv>

        <FadeInDiv delay={200}>
          <h2 className="text-2xl md:text-3xl font-light text-content/80 mb-8">
            Быстрее. Точнее. <span className="text-accent font-semibold">Надежнее.</span>
          </h2>
        </FadeInDiv>

        <FadeInDiv delay={400}>
          <p className="max-w-3xl mx-auto text-lg text-content/70 mb-10">
            Мы берем на себя все заботы по упаковке, маркировке, хранению и доставке ваших товаров на склады крупнейших маркетплейсов России.
          </p>
        </FadeInDiv>

        <FadeInDiv delay={600} className="flex justify-center space-x-4">
          {/* Главный CTA (акцентный цвет) */}
          <Link href="#calculator" className="neon-button text-lg">
            Рассчитать цену за 1 минуту
          </Link>
          {/* Вторичный CTA */}
          <Link 
            href="#contacts" 
            className="px-8 py-3 text-lg font-bold border border-primary/30 rounded-lg text-primary hover:bg-primary/10 transition-colors duration-300"
          >
            Связаться с нами
          </Link>
        </FadeInDiv>
      </section>

      {/* ------------------------------------------------------------------- */}
      {/* 2. Секция ПРЕИМУЩЕСТВА (ADVANTAGES) */}
      {/* ------------------------------------------------------------------- */}
      <section id="advantages" className="section-container bg-white shadow-inner -mt-16 rounded-t-2xl relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12 text-content">
          Почему выбирают ФФ24?
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {advantageData.map((item, index) => (
            <FadeInDiv key={index} delay={index * 150}>
              <div 
                className={`bg-white p-6 rounded-xl shadow-lg border-b-4 ${item.color} 
                          transition-transform duration-300 hover:scale-[1.03]`}
              >
                <item.icon className={`w-8 h-8 mb-4 ${item.color.split(' ')[2]}`} />
                <h4 className="text-xl font-semibold mb-3 text-content">{item.title}</h4>
                <p className="text-content/70 text-sm">{item.description}</p>
              </div>
            </FadeInDiv>
          ))}
        </div>
      </section>
      
      {/* ------------------------------------------------------------------- */}
      {/* Здесь будут следующие секции: Калькулятор, Процесс, Интеграции и т.д. */}
      {/* ------------------------------------------------------------------- */}
    </div>
  );
};

export default HomePage;
