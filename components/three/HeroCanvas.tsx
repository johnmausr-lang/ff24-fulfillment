"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import CameraController from "./CameraController";
import WarehouseScene from "./WarehouseScene";

export default function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 2, 10], fov: 55 }}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <Suspense fallback={null}>
        <CameraController />
        <WarehouseScene />
      </Suspense>
    </Canvas>
  );
}
