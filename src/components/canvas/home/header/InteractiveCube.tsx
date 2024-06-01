import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useColors } from "@/handlers/useColors";

import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { easing } from "maath";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  targetPosition = new THREE.Vector3(0, 0, 2.5),
  currentRotation = new THREE.Quaternion(),
  targetRotation = new THREE.Quaternion(),
}) {
  const colors = useColors();
  const cubePhysicsApi = useRef(null);
  const cubeRef = useRef(null);
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

  useFrame((_, delta) => {
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

    if (cubeRef.current !== null) {
      easing.damp(
        cubeRef.current.scale,
        "x",
        worksSceneIsActive || contactSceneIsActive ? 5 : 2,
        0.25,
        delta
      );
      easing.damp(
        cubeRef.current.scale,
        "y",
        worksSceneIsActive || contactSceneIsActive ? 5 : 2,
        0.25,
        delta
      );
      easing.damp(
        cubeRef.current.scale,
        "z",
        worksSceneIsActive || contactSceneIsActive ? 5 : 2,
        0.25,
        delta
      );
    }
  });

  //Resetting the cube position on resize
  const handleResize = useCallback(() => {
    cubePhysicsApi.current?.setTranslation(currentPosition.set(0, 0, 2.5));
  }, [currentPosition]);

  //Resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Step 4: Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

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
      <group scale={2} ref={cubeRef}>
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
      </group>
    </RigidBody>
  );
}
