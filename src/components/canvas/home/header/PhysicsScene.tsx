import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useColors } from "@/handlers/useColors";

import * as THREE from "three";
import { useMemo } from "react";

export function PhysicsScene() {
  const colors = useColors();
  const testcolor = useMemo(() => {
    return new THREE.Color(colors.main);
  }, [colors]);

  return (
    <>
      <RigidBody
        colliders={false}
        position={[-1, 0, 2]}
        // enabledTranslations={[true, true, false]}
        canSleep={false}
        scale={0.75}
        linearVelocity={[2, 2, 0]}
        angularVelocity={[1, 1, 1]}
      >
        <CuboidCollider args={[1, 1, 1]} />
        <mesh scale={2}>
          <RoundedBox>
            <MeshTransmissionMaterial
              clearcoat={0}
              thickness={0.2}
              anisotropicBlur={0.1}
              chromaticAberration={1}
              samples={4}
              resolution={2048}
              backside
              background={testcolor}
            />
          </RoundedBox>
        </mesh>
      </RigidBody>
      <PointerCollider />
      <PhysicBoundaries />
    </>
  );
}
