import { Text } from "@react-three/drei";

export function OverlayScene({ name = "test" }: { name: string }) {
  return (
    <>
      <mesh>
        <Text>{name}</Text>
      </mesh>
    </>
  );
}
