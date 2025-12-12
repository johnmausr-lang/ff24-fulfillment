"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  PerspectiveCamera
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import { Suspense, useRef } from "react";

/* ---------------- СКЛАД ---------------- */

function Warehouse() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (!group.current) return;
    group.current.position.z = Math.sin(clock.elapsedTime * 0.2) * 0.2;
  });

  return (
    <group ref={group}>
      {/* Пол */}
      <mesh rotation-x={-Math.PI / 2} position={[0, -0.01, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color="#0b0b0b"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Стеллажи */}
      {Array.from({ length: 6 }).map((_, i) => (
        <mesh key={i} position={[i * 3 - 7.5, 1.5, -6]}>
          <boxGeometry args={[1.2, 3, 0.4]} />
          <meshStandardMaterial
            color="#121212"
            emissive="#28064f"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* Неоновые линии */}
      {Array.from({ length: 12 }).map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0.01, i * -3]}>
          <boxGeometry args={[20, 0.02, 0.05]} />
          <meshStandardMaterial
            color="#000"
            emissive="#ffeb3b"
            emissiveIntensity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ---------------- СЦЕНА ---------------- */

export default function FF24Scene() {
  return (
    <div className="ff24-3d-bg">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={45} />

        <ambientLight intensity={0.15} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
        />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <Warehouse />
        </Suspense>

        {/* Тени от объектов */}
        <ContactShadows
          position={[0, -0.01, 0]}
          opacity={0.35}
          scale={30}
          blur={2.5}
          far={20}
        />

        {/* Неоновый bloom */}
        <EffectComposer>
          <Bloom
            intensity={0.6}
            luminanceThreshold={0.25}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
