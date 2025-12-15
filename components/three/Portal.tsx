"use client";

export default function Portal({ z }: { z: number }) {
  return (
    <group position={[0, 2.6, z]}>
      {/* ВНУТРЕННЯЯ ТЬМА */}
      <mesh>
        <boxGeometry args={[6, 4, 0.6]} />
        <meshStandardMaterial
          color="#060606"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* НЕОНОВАЯ РАМКА */}
      <mesh position={[0, 0, 0.36]}>
        <boxGeometry args={[6.4, 4.4, 0.05]} />
        <meshStandardMaterial
          color="#28064F"
          emissive="#8A2BE2"
          emissiveIntensity={3}
          toneMapped={false}
        />
      </mesh>

      {/* ВНУТРЕННИЙ СВЕТ */}
      <pointLight
        position={[0, 0, 0.8]}
        intensity={1.5}
        distance={6}
        color="#8A2BE2"
      />
    </group>
  );
}
