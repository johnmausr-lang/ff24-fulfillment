"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

/* ================= CAMERA CONTROLLER ================= */

function CameraController() {
  const { camera } = useThree();
  const targetZ = useRef(8);

  useFrame(() => {
    const scrollY = window.scrollY || 0;
    const progress = Math.min(scrollY / window.innerHeight, 1);

    targetZ.current = 8 - progress * 2; // dolly-in
    camera.position.z += (targetZ.current - camera.position.z) * 0.05;
    camera.lookAt(0, 1, 0);
  });

  return null;
}

/* ================= NEON LINES ================= */

function NeonLines() {
  const mat = useRef<THREE.MeshStandardMaterial>(null);

  return (
    <mesh
      position={[0, 1.2, 0]}
      onPointerMove={() => {
        if (mat.current) mat.current.emissiveIntensity = 3;
      }}
      onPointerOut={() => {
        if (mat.current) mat.current.emissiveIntensity = 1.5;
      }}
    >
      <boxGeometry args={[12, 0.05, 0.05]} />
      <meshStandardMaterial
        ref={mat}
        color="#28064f"
        emissive="#8a2be2"
        emissiveIntensity={1.5}
      />
    </mesh>
  );
}

/* ================= WAREHOUSE ================= */

function Warehouse() {
  return (
    <>
      {/* Пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#080808" />
      </mesh>

      {/* Стены */}
      <mesh position={[0, 3, -10]}>
        <boxGeometry args={[30, 6, 1]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* Неон */}
      <NeonLines />

      {/* Тени */}
      <ContactShadows
        position={[0, 0.01, 0]}
        opacity={0.6}
        scale={20}
        blur={2}
        far={10}
      />
    </>
  );
}

/* ================= SCENE ================= */

export default function FF24Scene() {
  return (
    <Canvas
      camera={{ position: [0, 2.5, 8], fov: 45 }}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#050505"]} />

      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 10, 5]}
        intensity={1}
        castShadow
      />

      <CameraController />
      <Warehouse />

      <Environment preset="warehouse" />

      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}
