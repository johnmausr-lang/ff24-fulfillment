"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";
import CameraRig from "./CameraRig";

export default function HeroCanvas() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: -1,
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 10], fov: 50 }}
        dpr={[1, 2]}
      >
        <color attach="background" args={["#050505"]} />

        <Suspense fallback={null}>
          <Scene />
          <CameraRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
