"use client";

import { Environment, ContactShadows } from "@react-three/drei";
import Portal from "./Portal";

export default function WarehouseScene() {
  return (
    <>
      {/* Свет */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1.4}
        color="#ffffff"
      />

      {/* Пол + тени */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={40}
        blur={2}
        far={20}
      />

      {/* Порталы */}
      <Portal z={-4} />
      <Portal z={-12} />
      <Portal z={-20} />

      {/* Окружение */}
      <Environment preset="warehouse" />
    </>
  );
}
