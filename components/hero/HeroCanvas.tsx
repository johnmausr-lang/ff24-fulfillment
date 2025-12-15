"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Environment, ContactShadows } from "@react-three/drei";
import WarehouseScene from "./WarehouseScene";
import Lights from "./Lights";

export default function HeroCanvas() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 3, 10], fov: 45 }}
        dpr={[1, 1.5]}
      >
        <Suspense fallback={null}>
          <color attach="background" args={["#050505"]} />

          <fog attach="fog" args={["#050505", 8, 18]} />

          <Lights />

          <WarehouseScene />

          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.35}
            scale={30}
            blur={2.5}
            far={6}
          />

          <Environment preset="warehouse" />
        </Suspense>
      </Canvas>
    </div>
  );
}
