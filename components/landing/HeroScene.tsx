"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ------------------------------------------------
   SCROLL STATE (глобально, без React rerender)
------------------------------------------------ */

let scrollProgress = 0;

function useScrollProgress() {
  useEffect(() => {
    function onScroll() {
      const max =
        document.body.scrollHeight - window.innerHeight;
      scrollProgress = Math.min(
        Math.max(window.scrollY / max, 0),
        1
      );
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

/* ------------------------------------------------
   NEON LINES
------------------------------------------------ */

function NeonLines() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;

    group.current.rotation.z =
      state.clock.elapsedTime * 0.03 +
      scrollProgress * 0.4;
  });

  return (
    <group ref={group}>
      {[...Array(8)].map((_, i) => (
        <mesh key={i} position={[i * 1.2 - 4, 0.02, -i * 3]}>
          <boxGeometry args={[7, 0.035, 0.035]} />
          <meshStandardMaterial
            emissive="#8A2BE2"
            emissiveIntensity={2.2}
            color="#28064F"
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------
   FLOOR
------------------------------------------------ */

function WarehouseFloor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#050505" />
    </mesh>
  );
}

/* ------------------------------------------------
   CAMERA — SCROLL + MOUSE
------------------------------------------------ */

function CameraRig() {
  const { camera } = useThree();

  useFrame(({ mouse }) => {
    const zTarget = 10 - scrollProgress * 6;
    const yTarget = 4 - scrollProgress * 1.5;

    camera.position.z +=
      (zTarget - camera.position.z) * 0.04;
    camera.position.y +=
      (yTarget - camera.position.y) * 0.04;

    camera.position.x +=
      (mouse.x * 0.6 - camera.position.x) * 0.03;

    camera.lookAt(0, 0, -scrollProgress * 4);
  });

  return null;
}

/* ------------------------------------------------
   SCENE
------------------------------------------------ */

export default function HeroScene() {
  useScrollProgress();

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

      <ambientLight intensity={0.35} />
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.3}
        castShadow
      />

      <WarehouseFloor />
      <NeonLines />

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.55}
        scale={25}
        blur={3}
      />

      <Environment preset="city" />

      <EffectComposer>
        <Bloom
          intensity={1.4}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>

      <CameraRig />
    </Canvas>
  );
}
