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

/* ===================== WAREHOUSE ===================== */

function Warehouse() {
  const group = useRef<THREE.Group>(null);

  useFrame(({ clock, camera }) => {
    const t = Math.min(window.scrollY / 900, 1);

    // лёгкое «въезжание» камеры
    camera.position.z = 10 - t * 2;
    camera.position.y = 4 - t * 1;
    camera.lookAt(0, 1.2, -4);

    if (group.current) {
      group.current.position.z = Math.sin(clock.elapsedTime * 0.15) * 0.15;
    }
  });

  return (
    <group ref={group}>
      {/* Пол */}
      <mesh rotation-x={-Math.PI / 2} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial
          color="#0b0b0b"
          roughness={0.85}
          metalness={0.15}
        />
      </mesh>

      {/* Стеллажи */}
      {Array.from({ length: 7 }).map((_, i) => (
        <mesh key={i} position={[i * 3 - 9, 1.6, -6]} castShadow>
          <boxGeometry args={[1.4, 3.2, 0.4]} />
          <meshStandardMaterial
            color="#121212"
            emissive="#28064f"
            emissiveIntensity={0.25}
          />
        </mesh>
      ))}

      {/* Неоновые направляющие */}
      {Array.from({ length: 14 }).map((_, i) => (
        <mesh key={`line-${i}`} position={[0, 0.02, i * -3]}>
          <boxGeometry args={[24, 0.025, 0.06]} />
          <meshStandardMaterial
            color="#000"
            emissive="#ffeb3b"
            emissiveIntensity={0.75}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ===================== SCENE ===================== */

export default function FF24Scene() {
  return (
    <div className="ff24-3d-bg">
      <Canvas shadows gl={{ antialias: true }}>
        <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={45} />

        <ambientLight intensity={0.15} />
        <directionalLight
          position={[6, 10, 6]}
          intensity={1.2}
          castShadow
        />

        <Suspense fallback={null}>
          <Environment preset="warehouse" />
          <Warehouse />
        </Suspense>

        <ContactShadows
          position={[0, 0.01, 0]}
          opacity={0.35}
          scale={40}
          blur={2.8}
          far={20}
        />

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
