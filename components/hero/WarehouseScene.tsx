import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function WarehouseScene() {
  const lines = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (lines.current) {
      lines.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Пол */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[40, 40]} />
        <meshStandardMaterial
          color="#0a0a0a"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>

      {/* Неоновые линии склада */}
      <group ref={lines}>
        {Array.from({ length: 12 }).map((_, i) => (
          <mesh
            key={i}
            position={[
              -6 + i,
              0.01,
              -6 - i * 0.6
            ]}
            rotation={[-Math.PI / 2, 0, 0]}
          >
            <planeGeometry args={[0.15, 12]} />
            <meshStandardMaterial
              color="#ffeb3b"
              emissive="#ffeb3b"
              emissiveIntensity={0.6}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}
