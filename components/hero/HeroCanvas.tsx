// components/hero/HeroCanvas.tsx
"use client";

import { Canvas } from '@react-three/fiber';
import { ScrollControls } from '@react-three/drei';
import Scene from './Scene';

// Общая высота сцены в "страницах" для ScrollControls
const SCROLL_PAGES = 3; 
// Общее расстояние, на которое сдвигается камера при прокрутке
const SCROLL_DISTANCE_MULTIPLIER = 1.5; 

export default function HeroCanvas() {
  return (
    <Canvas 
      dpr={[1, 2]} // Высокое качество рендеринга
      camera={{ fov: 45, position: [0, 0, 45] }} // Начальная позиция камеры (немного дальше для обзора)
      style={{ background: '#0a0a0a' }} // Темный, технологичный фон
    >
      <ScrollControls pages={SCROLL_PAGES} distance={SCROLL_DISTANCE_MULTIPLIER}>
        {/* Здесь будет вся 3D-сцена и логика */}
        <Scene /> 
      </ScrollControls>
    </Canvas>
  );
}
