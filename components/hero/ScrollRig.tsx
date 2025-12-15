"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera } from "three";

export default function ScrollRig() {
  const { camera } = useThree();
  const targetZ = useRef(0);

  useFrame(() => {
    const scrollY = window.scrollY || 0;
    const progress = Math.min(scrollY / window.innerHeight, 3);

    // Камера летит вперёд по складу
    targetZ.current = -progress * 6;

    camera.position.z += (targetZ.current - camera.position.z) * 0.08;
    camera.position.y = 1.8;
    camera.lookAt(0, 1, camera.position.z - 3);
  });

  return null;
}
