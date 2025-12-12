"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function ScrollScene() {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;

    function onScroll() {
      const rect = el.getBoundingClientRect();
      const progress = Math.min(
        Math.max(1 - rect.top / window.innerHeight, 0),
        1
      );

      el.style.setProperty("--scroll", progress.toString());
    }

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sceneRef} className="scroll-scene">
      {/* Грузчик */}
      <div className="scene-worker">
        <Image
          src="/illustrations/worker-ff24.png"
          alt="FF24 Worker"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Коробки */}
      <div className="scene-box box-a" />
      <div className="scene-box box-b" />
      <div className="scene-box box-c" />

      {/* Неоновые линии */}
      <div className="scene-lines" />
    </section>
  );
}
