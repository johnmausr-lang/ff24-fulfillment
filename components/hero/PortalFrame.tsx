"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface PortalFrameProps {
  position?: [number, number, number];
}

export default function PortalFrame({
  position = [0, 0, 0],
}: PortalFrameProps) {
  const frame = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!frame.current) return;

    const material = frame.current
      .material as THREE.MeshStandardMaterial;

    material.emissiveIntensity =
      1.2 + Math.sin(clock.elapsedTime * 2) * 0.3;
  });

  return (
    <mesh ref={frame} position={position}>
      <boxGeometry args={[2.4, 3.6, 0.15]} />
      <meshStandardMaterial
        color="#111111"
        emissive="#8a2be2"
        emissiveIntensity={1.2}
        metalness={0.85}
        roughness={0.25}
      />
    </mesh>
  );
}
