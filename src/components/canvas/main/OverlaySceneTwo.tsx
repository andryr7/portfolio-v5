import { Text } from "@react-three/drei";

export function OverlaySceneTwo({ name = "test" }: { name: string }) {
  return (
    <>
      <mesh>
        <Text>{name}</Text>
      </mesh>
      <color args={["red"]} attach="background" />
    </>
  );
}
