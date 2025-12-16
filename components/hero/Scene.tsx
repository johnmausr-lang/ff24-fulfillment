// components/hero/Scene.tsx

"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Center } from "@react-three/drei";
import { Model } from './Model'; // Предполагаем, что Model тоже здесь
import CameraRig from './CameraRig'; // <-- ИСПРАВЛЕНИЕ: Добавлен импорт CameraRig

export default function Scene() {
  return (
    <Canvas
      shadows
      camera={{ position: [0, 0, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      {/* 1. Свет */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={1.5} castShadow />

      {/* 2. Фон (Окружение) */}
      {/* Предполагаем, что 'sunset' — это один из встроенных пресетов Drei */}
      <Environment preset="sunset" /> 

      {/* 3. Обертка для центрирования модели */}
      <Center>
        {/* 4. Модель (Замените на вашу фактическую 3D-модель) */}
        {/* Модель должна принимать scale, rotation и position */}
        <Model /> 
      </Center>

      {/* 5. CameraRig - Движение камеры */}
      {/* Теперь компонент CameraRig импортирован и может быть использован */}
      <CameraRig /> 

    </Canvas>
  );
}
