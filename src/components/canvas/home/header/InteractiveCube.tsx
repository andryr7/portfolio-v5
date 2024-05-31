import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import {
  CuboidCollider,
  RigidBody,
  quat,
  useRapier,
} from "@react-three/rapier";
import { useColors } from "@/handlers/useColors";

import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  targetPosition = new THREE.Vector3(0, 0, 2.5),
  currentRotation = new THREE.Quaternion(),
  targetRotation = new THREE.Quaternion(),
  worksScrollProgress,
}) {
  const colors = useColors();
  const cubePhysicsApi = useRef(null);
  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );

  const testcolor = useMemo(() => {
    return new THREE.Color(colors.main);
  }, [colors]);

  const worksSceneIsActive =
    worksScrollProgress > 0.1 && worksScrollProgress < 0.9;

  useFrame(() => {
    if (worksSceneIsActive) {
      // Setting the position
      currentPosition.copy(cubePhysicsApi.current.translation());
      targetPosition.set(
        0,
        -viewportHeight + worksScrollProgress * viewportHeight * 2,
        2.5
      );
      currentPosition.lerp(targetPosition, 0.1);
      cubePhysicsApi.current.setNextKinematicTranslation(currentPosition);
      //Setting the rotation
      currentRotation.copy(cubePhysicsApi.current.rotation());
      currentRotation.slerp(targetRotation, 0.1);
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
      linearDamping={worksSceneIsActive ? 10 : 0}
      angularDamping={worksSceneIsActive ? 10 : 0}
      enabledTranslations={[true, true, false]}
      type={worksSceneIsActive ? "kinematicPosition" : "dynamic"}
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

// if (worksSceneIsActive) {
//   //Defining the target position
//   targetPositionVec.set(
//     0,
//     -viewportHeight + worksScrollProgress * viewportHeight * 2,
//     2.5
//   );
//   //Applying the translation
//   cubePhysicsApi.current?.applyImpulse(
//     vec
//       .copy(cubePhysicsApi.current.translation())
//       .negate()
//       .add(targetPositionVec)
//       .multiplyScalar(1)
//   );
//   //Defining the rotation
// const targetRotation = new THREE.Quaternion();
// const currentRotationTest = cubePhysicsApi.current?.rotation();
// const currentRotation = new THREE.Quaternion(
//   currentRotationTest.x,
//   currentRotationTest.y,
//   currentRotationTest.z,
//   currentRotationTest.w
// );
// const slerpFactor = 0.5; // Adjust this value for the speed of rotation
// const slerpization = currentRotation.slerp(targetRotation, slerpFactor);
// const rapierTarget = quat(slerpization);
// //Applying the rotation
// cubePhysicsApi.current?.applyTorqueImpulse(rapierTarget, true);
// }
