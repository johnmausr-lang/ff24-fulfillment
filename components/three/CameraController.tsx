"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export default function CameraController() {
  const { camera } = useThree();
  const targetZ = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const h = window.innerHeight;

      if (y < h * 0.9) targetZ.current = 0;
      else if (y < h * 1.9) targetZ.current = -6;
      else if (y < h * 2.9) targetZ.current = -14;
      else targetZ.current = -24;
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(({ mouse }) => {
    camera.position.z +=
      (10 + targetZ.current - camera.position.z) * 0.04;

    camera.position.x +=
      (mouse.x * 0.8 - camera.position.x) * 0.025;

    camera.position.y +=
      (2.2 - camera.position.y) * 0.02;

    camera.lookAt(0, 2.2, targetZ.current - 6);
  });

  return null;
}
