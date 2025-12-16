// components/hero/Model.tsx
// ВРЕМЕННАЯ ЗАГЛУШКА, чтобы пройти компиляцию

import React, { useRef } from 'react';
// Импорт useGLTF здесь не нужен, так как мы не загружаем файл
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Временный компонент Model, который рендерит простой куб
export function Model(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);

  // Простое вращение для демонстрации
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <mesh
      {...props}
      ref={meshRef}
      scale={1}
      position={[0, 0, 0]}
      // Полупрозрачный куб
    >
      <boxGeometry args={[1, 1, 1]} /> 
      <meshStandardMaterial color="#3498db" transparent opacity={0.8} />
    </mesh>
  );
}

// Убедитесь, что здесь нет вызова useGLTF.preload, чтобы не вызвать ошибку
// useGLTF.preload(MODEL_PATH); // Эту строку мы удаляем
