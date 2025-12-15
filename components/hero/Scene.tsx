"use client";

import PortalFrame from "./PortalFrame";

export default function Scene() {
  return (
    <group>
      {/* Пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Стеллажи */}
      {[...Array(12)].map((_, i) => (
        <mesh
          key={i}
          position={[-4 + (i % 6) * 1.6, 1.2, -2 - Math.floor(i / 6) * 6]}
          castShadow
        >
          <boxGeometry args={[1, 2.4, 0.4]} />
          <meshStandardMaterial
            color="#111"
            emissive="#28064f"
            emissiveIntensity={0.12}
          />
        </mesh>
      ))}

      {/* Порталы */}
      <PortalFrame position={[0, 1.8, -6]} />
      <PortalFrame position={[0, 1.8, -12]} />
      <PortalFrame position={[0, 1.8, -18]} />

      {/* Свет */}
      <directionalLight position={[6, 8, 6]} intensity={1.3} castShadow />
      <ambientLight intensity={0.35} />
    </group>
  );
}
