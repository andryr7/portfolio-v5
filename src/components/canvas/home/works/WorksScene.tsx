import { useColors } from "@/handlers/useColors";

export function WorksScene() {
  const colors = useColors();

  return (
    <>
      <mesh>
        <boxGeometry />
        <meshBasicMaterial color="blue" />
      </mesh>
      <color args={["#a9a9a9"]} attach="background" />
    </>
  );
}
