import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useColors } from "@/handlers/useColors";

export function PhysicsScene() {
  const heroIsInView = usePortfolioStore((state) => state.heroIsInView);
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();
  const colors = useColors();

  return (
    <>
      <RigidBody
        colliders={false}
        position={[-1, 0, 2]}
        enabledTranslations={[true, true, false]}
        canSleep={false}
        scale={0.75}
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
              transmission={heroIsInView ? 1 : 0}
            />
          </RoundedBox>
        </mesh>
      </RigidBody>
      <PointerCollider />
      <PhysicBoundaries
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
      />
    </>
  );
}
