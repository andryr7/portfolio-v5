export function HeaderScene() {
  return (
    <>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="green" />
      </mesh>
      <color args={["red"]} attach="background" />
    </>
  );
}
