"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { ContactShadows, Environment } from "@react-three/drei";

import Scene from "./Scene";
import ScrollRig from "./ScrollRig";

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none", // HTML кликабелен поверх
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{
          position: [0, 1.8, 4],
          fov: 50,
          near: 0.1,
          far: 100,
        }}
      >
        <Suspense fallback={null}>
          {/* Камера, управляемая скроллом */}
          <ScrollRig />

          {/* Основная сцена склада */}
          <Scene />

          {/* Контактные тени под объектами */}
          <ContactShadows
            position={[0, 0.01, 0]}
            opacity={0.45}
            scale={30}
            blur={2.5}
            far={20}
          />

          {/* Окружение (мягкий индустриальный свет) */}
          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}
