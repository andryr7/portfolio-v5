import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useColors } from "@/handlers/useColors";

import * as THREE from "three";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  targetPosition = new THREE.Vector3(0, 0, 2.5),
  currentRotation = new THREE.Quaternion(),
  targetRotation = new THREE.Quaternion(),
}) {
  const colors = useColors();
  const cubePhysicsApi = useRef(null);
  const testcolor = useMemo(() => {
    return new THREE.Color(colors.main);
  }, [colors]);

  const {
    viewportSize: { width: viewportWidth, height: viewportHeight },
    worksSceneIsActive,
    contactSceneIsActive,
    worksScrollProgress,
    contactScrollProgress,
  } = usePortfolioStore((state) => ({
    viewportSize: state.viewportSize,
    worksSceneIsActive: state.worksSceneIsActive,
    contactSceneIsActive: state.contactSceneIsActive,
    worksScrollProgress: state.worksScrollProgress,
    contactScrollProgress: state.contactScrollProgress,
  }));

  useFrame(() => {
    if (
      cubePhysicsApi.current !== null &&
      (worksSceneIsActive || contactSceneIsActive)
    ) {
      // Calculating the target position
      currentPosition.copy(cubePhysicsApi.current.translation());
      targetPosition.set(
        0,
        worksSceneIsActive
          ? -viewportHeight + worksScrollProgress * viewportHeight * 2
          : -viewportHeight +
              Math.min(contactScrollProgress, 0.5) * viewportHeight * 2,
        2.5
      );
      currentPosition.lerp(targetPosition, 0.1);

      // Setting the position
      cubePhysicsApi.current.setNextKinematicTranslation(currentPosition);

      //Calculating the rotation
      currentRotation.copy(cubePhysicsApi.current.rotation());
      currentRotation.slerp(targetRotation, 0.1);

      // Setting the rotation
      cubePhysicsApi.current.setNextKinematicRotation(currentRotation);
    }
  });

  return (
    <RigidBody
      colliders={false}
      position={[-1, 0, 2]}
      canSleep={false}
      scale={0.75}
      linearVelocity={[2, 2, 0]}
      angularVelocity={[1, 1, 1]}
      ref={cubePhysicsApi}
      linearDamping={worksSceneIsActive || contactSceneIsActive ? 10 : 0}
      angularDamping={worksSceneIsActive || contactSceneIsActive ? 10 : 0}
      enabledTranslations={[true, true, false]}
      type={
        worksSceneIsActive || contactSceneIsActive
          ? "kinematicPosition"
          : "dynamic"
      }
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
  );
}
