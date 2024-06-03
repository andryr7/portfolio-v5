import {
  MeshTransmissionMaterial,
  Outlines,
  RoundedBox,
} from "@react-three/drei";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useColors } from "@/handlers/useColors";

import * as THREE from "three";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { easing } from "maath";
import { Tesseract } from "../contact/Tesseract";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  targetPosition = new THREE.Vector3(0, 0, 2.5),
  currentRotation = new THREE.Quaternion(),
  targetRotation = new THREE.Quaternion(),
}) {
  const colors = useColors();
  const cubePhysicsApi = useRef<RapierRigidBody>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const cubeMaterialRef = useRef<any>(null);
  const testcolor = useMemo(() => {
    return new THREE.Color(colors.backgroundOne);
  }, [colors]);

  const {
    viewportSize: { width: viewportWidth, height: viewportHeight },
    worksScrollProgress,
    contactScrollProgress,
  } = usePortfolioStore((state) => ({
    viewportSize: state.viewportSize,
    worksScrollProgress: state.worksScrollProgress,
    contactScrollProgress: state.contactScrollProgress,
  }));

  const worksSceneIsActive = useMemo(() => {
    return worksScrollProgress >= 0.25 && worksScrollProgress <= 0.75;
  }, [worksScrollProgress]);

  const contactSceneIsActive = useMemo(() => {
    return contactScrollProgress >= 0.25;
  }, [contactScrollProgress]);

  useEffect(() => {
    if (cubePhysicsApi.current !== null && worksSceneIsActive) {
      cubePhysicsApi.current.applyImpulse(new THREE.Vector3(10, 10, 10), true);
    }
  }, [worksSceneIsActive, contactSceneIsActive]);

  //Resetting the cube position on resize
  const handleResize = useCallback(() => {
    cubePhysicsApi.current?.setTranslation(
      currentPosition.set(0, 0, 2.5),
      true
    );
  }, [currentPosition]);

  //Resize event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    // Step 4: Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [handleResize]);

  useFrame((_, delta) => {
    //Position pinning animations
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

    //Scale animations
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

    //Contact section animation
    if (cubeMaterialRef.current !== null) {
      easing.damp(
        cubeMaterialRef.current,
        "opacity",
        contactSceneIsActive ? 0 : 1,
        0.25,
        delta
      );
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
      linearDamping={worksSceneIsActive || contactSceneIsActive ? 10 : 1}
      angularDamping={worksSceneIsActive || contactSceneIsActive ? 10 : 1}
      enabledTranslations={[true, true, false]}
      // enabledRotations={[false, false, true]}
      type={
        worksSceneIsActive || contactSceneIsActive
          ? "kinematicPosition"
          : "dynamic"
      }
    >
      <CuboidCollider args={[1, 1, 1]} />
      <group scale={2} ref={cubeRef}>
        <mesh>
          <RoundedBox>
            <MeshTransmissionMaterial
              clearcoat={0}
              thickness={0.25}
              anisotropicBlur={0.1}
              chromaticAberration={1}
              samples={4}
              resolution={2048}
              backside
              background={testcolor}
              transparent
              ref={cubeMaterialRef}
            />
          </RoundedBox>
        </mesh>
        <mesh visible={contactSceneIsActive}>
          <Tesseract />
        </mesh>
      </group>
    </RigidBody>
  );
}
