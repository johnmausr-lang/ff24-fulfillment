"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import Scene from "./Scene";
import CameraRig from "./CameraRig";

export default function HeroCanvas() {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]}
      camera={{ position: [0, 1.8, 6], fov: 45 }}
      style={{ height: "100vh", width: "100vw" }}
    >
      <color attach="background" args={["#050505"]} />

      <Suspense fallback={null}>
        <CameraRig />
        <Scene />

        <ContactShadows
          position={[0, -1.4, 0]}
          opacity={0.6}
          scale={10}
          blur={2.5}
          far={5}
        />

        <Environment preset="warehouse" />
      </Suspense>

      <EffectComposer>
        <Bloom
          intensity={0.6}
          luminanceThreshold={0.15}
          luminanceSmoothing={0.9}
        />
      </EffectComposer>
    </Canvas>
  );
}
