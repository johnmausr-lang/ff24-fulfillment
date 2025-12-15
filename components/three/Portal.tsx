"use client";

import { MeshProps } from "@react-three/fiber";

export default function Portal({
  z = 0,
}: {
  z: number;
}) {
  return (
    <group position={[0, 2.5, z]}>
      {/* Основная рама */}
      <mesh>
        <boxGeometry args={[6, 4, 0.3]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Неоновая окантовка */}
      <mesh position={[0, 0, 0.16]}>
        <boxGeometry args={[6.4, 4.4, 0.05]} />
        <meshStandardMaterial
          color="#28064F"
          emissive="#8A2BE2"
          emissiveIntensity={2.8}
        />
      </mesh>
    </group>
  );
}
