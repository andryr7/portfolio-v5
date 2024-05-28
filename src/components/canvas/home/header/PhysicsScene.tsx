import { MeshTransmissionMaterial } from "@react-three/drei";
import { useThree } from "@react-three/fiber";
import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";
import { PhysicCube } from "./PhysicCube";

interface PhysicsSceneProps {
  colliderPosition: { x: number; y: number };
}

export function PhysicsScene({ colliderPosition }: PhysicsSceneProps) {
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();

  return (
    <>
      <PhysicCube>
        <MeshTransmissionMaterial
          clearcoat={1}
          thickness={0.2}
          anisotropicBlur={0.1}
          chromaticAberration={1}
          samples={4}
          resolution={2048}
          backside
        />
      </PhysicCube>
      <PhysicCube>
        <meshStandardMaterial
          metalness={0}
          roughness={0}
          color="red"
          toneMapped={false}
        />
      </PhysicCube>
      <PhysicCube>
        <meshStandardMaterial
          metalness={0}
          roughness={0}
          color="green"
          toneMapped={false}
        />
      </PhysicCube>
      <PhysicCube>
        <meshStandardMaterial
          metalness={0}
          roughness={0}
          color="blue"
          toneMapped={false}
        />
      </PhysicCube>
      <PointerCollider colliderPosition={colliderPosition} />
      <PhysicBoundaries
        viewportWidth={viewportWidth}
        viewportHeight={viewportHeight}
      />
    </>
  );
}
