"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { PerspectiveCamera } from "three";

export default function CameraRig() {
  const camera = useRef<PerspectiveCamera>(null!);
  const targetZ = useRef(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      const h = window.innerHeight;

      if (y < h * 0.8) targetZ.current = 0;
      else if (y < h * 1.6) targetZ.current = -6;
      else if (y < h * 2.4) targetZ.current = -14;
      else targetZ.current = -24;
    }

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useFrame(({ mouse }) => {
    if (!camera.current) return;

    camera.current.position.z +=
      (10 + targetZ.current - camera.current.position.z) * 0.05;

    camera.current.position.x +=
      (mouse.x * 1.2 - camera.current.position.x) * 0.03;

    camera.current.lookAt(0, 2.2, targetZ.current - 6);
  });

  return <perspectiveCamera ref={camera} />;
}
