import { RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";

export function PhysicCube({ children }: { children: React.ReactNode }) {
  return (
    <RigidBody
      colliders={false}
      position={[-1, -1, 2]}
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
