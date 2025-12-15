export default function Lights() {
  return (
    <>
      {/* Основной мягкий свет */}
      <ambientLight intensity={0.25} />

      {/* Ключевой верхний */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.1}
        color="#ffffff"
      />

      {/* Фиолетовый неон слева */}
      <pointLight
        position={[-6, 2, 2]}
        intensity={1.6}
        color="#8a2be2"
      />

      {/* Жёлтый акцент FF24 */}
      <pointLight
        position={[6, 1, -3]}
        intensity={1.2}
        color="#ffeb3b"
      />
    </>
  );
}
