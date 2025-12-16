// components/hero/Model.tsx

import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ВАЖНО: Замените 'your_model_path.glb' на фактический путь к вашему 3D-файлу
const MODEL_PATH = '/models/chair.glb'; 

// Если модель использует анимацию, нужно будет добавить useAnimations, но начнем с простого вращения

export function Model(props: any) {
  // 1. Загрузка модели с помощью useGLTF
  // Этот хук загружает модель и ее материалы.
  const { scene } = useGLTF(MODEL_PATH);
  
  // 2. Ссылка на модель для управления ее положением
  const modelRef = useRef<THREE.Group>(null!);

  // 3. Анимация: вращение модели каждый кадр (опционально)
  useFrame((state, delta) => {
    // Вращение по оси Y для создания эффекта движения
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5; // Скорость вращения
    }
  });

  // 4. Рендеринг
  return (
    <group {...props} dispose={null}>
      <primitive
        ref={modelRef}
        object={scene}
        scale={0.5} // Настройте размер модели
        position={[0, 0, 0]} // Настройте положение
      />
    </group>
  );
}

// 5. Предварительная загрузка для оптимизации
// Это помогает браузеру загрузить 3D-файл до того, как он понадобится
useGLTF.preload(MODEL_PATH);
