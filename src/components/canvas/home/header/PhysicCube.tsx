import { RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export function PhysicCube({
  position = [0, 0, 2],
  children,
}: {
  position?: [number, number, number];
  children: React.ReactNode;
}) {
  return (
    <RigidBody
      colliders={false}
      position={position}
      enabledTranslations={[true, true, false]}
      canSleep={false}
      scale={0.75}
    >
      <CuboidCollider args={[1, 1, 1]} />
      <mesh scale={2}>
        <RoundedBox>{children}</RoundedBox>
      </mesh>
    </RigidBody>
  );
}
