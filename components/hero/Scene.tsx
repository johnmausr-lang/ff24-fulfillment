"use client";

import { MeshStandardMaterial } from "three";

export default function Scene() {
  return (
    <group>
      {/* Пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Стеллажи */}
      {[...Array(6)].map((_, i) => (
        <mesh
          key={i}
          position={[-4 + i * 1.6, 0, -3]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 2.4, 0.4]} />
          <meshStandardMaterial
            color="#111"
            emissive="#28064f"
            emissiveIntensity={0.15}
          />
        </mesh>
      ))}

      {/* Неоновые линии */}
      <mesh position={[0, 0.01, -1]}>
        <boxGeometry args={[10, 0.02, 0.02]} />
        <meshStandardMaterial
          emissive="#ffeb3b"
          emissiveIntensity={2}
          color="#000"
        />
      </mesh>

      {/* Свет */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
      />
      <ambientLight intensity={0.3} />
    </group>
  );
}
