import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center group">
      <div className="flex flex-col">
        <div className="flex items-center text-4xl font-extrabold text-primary">
          {/* FF (Первая часть) */}
          <span className="tracking-tighter">FF</span>
          
          {/* Стрелка и цифра 24 */}
          <div className="relative flex items-center ml-[-8px]">
            {/* Стрелка (анимирована для движения) */}
            <svg 
              className="w-10 h-10 text-accent transition-transform duration-300 group-hover:scale-[1.05]" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              {/* Путь стрелки с неоновым мерцанием */}
              <polyline 
                points="16 17 21 12 16 7" 
                className="stroke-accent/90 animate-pulse" 
              />
              <line x1="4" y1="12" x2="21" y2="12" />
            </svg>
            
            {/* 24 */}
            <span className="ml-[-8px] tracking-tighter z-10">24</span>
          </div>
        </div>
        
        {/* Подпись "ФУЛФИЛМЕНТ" */}
        <span className="text-xs tracking-widest uppercase mt-[-8px] text-content/70">
          Фулфилмент
        </span>
      </div>
    </Link>
  );
};

export default Logo;
