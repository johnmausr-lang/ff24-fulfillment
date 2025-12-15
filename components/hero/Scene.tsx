"use client";

import { Environment, ContactShadows } from "@react-three/drei";

export default function Scene() {
  return (
    <>
      {/* ТУМАН = ГЛУБИНА */}
      <fog attach="fog" args={["#050505", 6, 28]} />

      {/* СВЕТ */}
      <ambientLight intensity={0.3} />

      <directionalLight
        position={[6, 10, 4]}
        intensity={1.2}
      />

      <pointLight
        position={[-6, 3, -6]}
        intensity={2}
        color="#8A2BE2"
      />

      {/* ПОЛ */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial
          color="#070707"
          roughness={0.85}
          metalness={0.1}
        />
      </mesh>

      {/* ГЛУБИННЫЕ СЛОИ (как складские пролёты) */}
      <DepthLayer z={-6} />
      <DepthLayer z={-14} />
      <DepthLayer z={-24} />

      {/* ТЕНИ */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.4}
        scale={40}
        blur={2.5}
        far={30}
      />

      {/* ОКРУЖЕНИЕ */}
      <Environment preset="warehouse" />
    </>
  );
}

function DepthLayer({ z }: { z: number }) {
  return (
    <mesh position={[0, 2.5, z]}>
      <boxGeometry args={[12, 5, 0.4]} />
      <meshStandardMaterial
        color="#0a0a0a"
        roughness={0.6}
      />
    </mesh>
  );
}
