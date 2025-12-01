'use client';

import React, { useRef, useEffect, useState } from 'react';

// Компонент для плавного появления элементов при прокрутке
interface FadeInDivProps {
  children: React.ReactNode;
  delay?: number; 
  className?: string; // <-- ИСПРАВЛЕНИЕ: Добавление className в интерфейс
}

const FadeInDiv: React.FC<FadeInDivProps> = ({ children, delay = 0, className }) => { // <-- ИСПРАВЛЕНИЕ: Деструктуризация className
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Если элемент вошел в область видимости
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Отключаем наблюдателя, чтобы анимация не повторялась
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // Область просмотра (viewport)
        rootMargin: '0px',
        threshold: 0.1, // Начинать, когда 10% элемента видно
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className} // <-- ИСПРАВЛЕНИЕ: Передача className корневому div
      style={{ 
        opacity: isVisible ? 1 : 0, 
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease-out ${delay}ms, transform 0.6s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

export default FadeInDiv;
