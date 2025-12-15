"use client";

import { Environment, ContactShadows, Fog } from "@react-three/drei";
import Portal from "./Portal";

export default function WarehouseScene() {
  return (
    <>
      {/* ТУМАН — КЛЮЧЕВО ДЛЯ DEPTH */}
      <Fog
        attach="fog"
        args={["#050505", 8, 32]}
      />

      {/* СВЕТ */}
      <ambientLight intensity={0.35} />

      <directionalLight
        position={[6, 10, 4]}
        intensity={1.2}
        color="#ffffff"
      />

      <pointLight
        position={[-6, 4, -8]}
        intensity={2}
        color="#8A2BE2"
      />

      {/* ПОЛ + КОНТАКТНЫЕ ТЕНИ */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.45}
        scale={40}
        blur={2.5}
        far={30}
      />

      {/* ПОРТАЛЫ (СЛОИ ГЛУБИНЫ) */}
      <Portal z={-4} />
      <Portal z={-12} />
      <Portal z={-22} />

      {/* ОКРУЖЕНИЕ */}
      <Environment preset="warehouse" />
    </>
  );
}
