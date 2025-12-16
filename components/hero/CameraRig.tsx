// components/hero/CameraRig.tsx
"use client";

import { useFrame, useThree } from '@react-three/fiber';
import { useScroll } from '@react-three/drei';
import * as THREE from 'three';
import { useRef } from 'react';

// ⚠️ Этот компонент должен быть внутри <ScrollControls>

export default function CameraRig() {
  const { camera } = useThree();
  const scroll = useScroll();
  const targetPosition = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    // Получаем нормализованное смещение скролла (от 0 до 1)
    const offset = scroll.offset; 
    
    // --- Определение ключевых позиций камеры в сцене ---
    
    // Позиция 1: Начало (Глубокий вид на лого/сцену)
    const pos1 = new THREE.Vector3(0, 0, 45); 
    
    // Позиция 2: Приближение к первому порталу (Информация/Статистика)
    const pos2 = new THREE.Vector3(15, 0, 15); 
    
    // Позиция 3: Дальнейшее приближение к калькулятору
    const pos3 = new THREE.Vector3(-10, 5, -5); 

    // --- Интерполяция позиций в зависимости от скролла ---
    
    if (offset < 0.5) {
      // С 0% до 50% скролла: переходим от pos1 к pos2
      const t = THREE.MathUtils.mapLinear(offset, 0, 0.5, 0, 1);
      targetPosition.current.lerpVectors(pos1, pos2, t);
    } else {
      // С 50% до 100% скролла: переходим от pos2 к pos3
      const t = THREE.MathUtils.mapLinear(offset, 0.5, 1, 0, 1);
      targetPosition.current.lerpVectors(pos2, pos3, t);
    }
    
    // Плавное движение камеры к целевой позиции
    camera.position.lerp(targetPosition.current, delta * 3);
    
    // Камера всегда смотрит в центр
    camera.lookAt(0, 0, 0); 
    camera.updateProjectionMatrix();
  });
  
  return null;
}
