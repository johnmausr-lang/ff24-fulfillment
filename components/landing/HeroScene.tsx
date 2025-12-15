"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import * as THREE from "three";

/* ------------------ NEON LINES ------------------ */

function NeonLines() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    group.current.rotation.z = state.clock.elapsedTime * 0.03;
  });

  return (
    <group ref={group}>
      {[...Array(6)].map((_, i) => (
        <mesh key={i} position={[i * 1.2 - 3, 0.01, -i * 2]}>
          <boxGeometry args={[6, 0.03, 0.03]} />
          <meshStandardMaterial
            emissive="#8A2BE2"
            emissiveIntensity={2}
            color="#28064F"
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------ FLOOR ------------------ */

function WarehouseFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color="#050505" />
    </mesh>
  );
}

/* ------------------ CAMERA MOVE ------------------ */

function CameraRig() {
  useFrame(({ camera, mouse }) => {
    camera.position.x += (mouse.x * 0.6 - camera.position.x) * 0.03;
    camera.position.y += (-mouse.y * 0.4 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ------------------ SCENE ------------------ */

export default function HeroScene() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      gl={{ antialias: true }}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}
    >
      <PerspectiveCamera makeDefault position={[0, 4, 10]} fov={45} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.2}
        castShadow
      />

      <WarehouseFloor />
      <NeonLines />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.5}
        scale={20}
        blur={2.5}
      />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <CameraRig />
    </Canvas>
  );
}
