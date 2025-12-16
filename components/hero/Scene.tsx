// components/hero/Scene.tsx
import { Plane, Sphere, Environment } from '@react-three/drei';
import { RepeatWrapping, Color } from 'three';

// ⚠️ Этот компонент должен быть внутри <ScrollControls>

export default function Scene() {
  // Фирменный цвет: PRIMARY (Фиолетовый) и ACCENT (Салатовый)
  const primaryColor = new Color('#312e81'); 
  const accentColor = new Color('#a3e635'); 
  
  return (
    <>
      {/* 1. Настройка Окружения (Свет и Отражения) */}
      <Environment preset="city" blur={0.8} />

      {/* 2. Основное Освещение */}
      <spotLight 
        position={[20, 20, 20]} 
        angle={0.3} 
        penumbra={1} 
        intensity={500} 
        color={accentColor} 
      />
      
      {/* 3. Геометрия: Технологичный Пол (Mesh) */}
      <Plane 
        args={[100, 100]} 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -5, 0]}
      >
        <meshStandardMaterial 
          color={primaryColor} 
          roughness={0.1} 
          metalness={0.9} 
          wireframe={true} // Эффект технологической сетки
        />
      </Plane>
      
      {/* 4. Геометрия: Плавающие Объекты (Символизируют Инвентарь/Данные) */}
      <Sphere position={[10, 5, 5]} args={[2, 32, 32]}>
        <meshStandardMaterial color={accentColor} emissive={accentColor} emissiveIntensity={0.5} roughness={0.1} metalness={1} />
      </Sphere>
      
      <Sphere position={[-15, -3, 15]} args={[1, 16, 16]}>
        <meshStandardMaterial color={primaryColor} emissive={primaryColor} emissiveIntensity={0.3} roughness={0.5} metalness={0.5} />
      </Sphere>

      {/* 5. CameraRig - Движение камеры */}
      <CameraRig />
    </>
  );
}
