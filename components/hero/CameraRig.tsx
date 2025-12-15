"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { PerspectiveCamera } from "three";

export default function CameraRig() {
  const camera = useRef<PerspectiveCamera>(null!);

  useFrame(({ mouse }) => {
    camera.current.position.x += (mouse.x * 1.2 - camera.current.position.x) * 0.05;
    camera.current.position.y += (1.8 + mouse.y * 0.5 - camera.current.position.y) * 0.05;
    camera.current.lookAt(0, 0.8, 0);
  });

  return <perspectiveCamera ref={camera} />;
}
