export function WorksScene() {
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <color args={["green"]} attach="background" />
    </>
  );
}
