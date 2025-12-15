"use client";

import { useRef } from "react";
import { Mesh } from "three";
import { useFrame } from "@react-three/fiber";

export default function PortalFrame({
  position = [0, 1, 0],
}: {
  position?: [number, number, number];
}) {
  const frame = useRef<Mesh>(null!);

  useFrame(({ clock }) => {
    frame.current.material.emissiveIntensity =
      1.2 + Math.sin(clock.elapsedTime * 2) * 0.3;
  });

  return (
    <mesh ref={frame} position={position}>
      <boxGeometry args={[2.8, 3.6, 0.15]} />
      <meshStandardMaterial
        color="#000"
        emissive="#8a2be2"
        emissiveIntensity={1.2}
      />
    </mesh>
  );
}
