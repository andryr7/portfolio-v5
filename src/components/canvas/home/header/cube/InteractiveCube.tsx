import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { easing } from "maath";
import { Tesseract } from "./Tesseract";
import { ToyCube } from "./ToyCube";
import { TransparentCube } from "./TransparentCube";
import { WorksCube } from "./WorksCube";
import { useShallow } from "zustand/react/shallow";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  currentRotation = new THREE.Quaternion(),
  targetPosition = new THREE.Vector3(),
  targetRotation = new THREE.Quaternion(),
}) {
  const cubePhysicsApi = useRef<RapierRigidBody>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const { height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );
  const worksScrollProgress = usePortfolioStore(
    useShallow((state) => state.worksScrollProgress)
  );
  const contactScrollProgress = usePortfolioStore(
    useShallow((state) => state.contactScrollProgress)
  );
  const hoveredWorkIndex = usePortfolioStore(
    useShallow((state) => state.hoveredWorkIndex)
  );

  const worksSceneIsActive = useMemo(() => {
    return worksScrollProgress >= 0.25 && worksScrollProgress <= 0.75;
  }, [worksScrollProgress]);

  const contactSceneIsActive = useMemo(() => {
    return contactScrollProgress >= 0.25;
  }, [contactScrollProgress]);

  const sceneIsActive = worksSceneIsActive || contactSceneIsActive;

  const sceneTargetPosition = useMemo<[number, number, number]>(() => {
    const yWorks = -viewportHeight + worksScrollProgress * viewportHeight * 2;
    const yContact =
      -0.9 * viewportHeight +
      Math.min(contactScrollProgress, 0.5) * viewportHeight * 2;

    return [0, worksSceneIsActive ? yWorks : yContact, 2.5];
  }, [
    viewportHeight,
    worksScrollProgress,
    contactScrollProgress,
    worksSceneIsActive,
  ]);

  const sceneTargetRotation = useMemo(() => {
    switch (hoveredWorkIndex) {
      case 0:
        return [-Math.PI / 2, 0, 0];
      case 1:
        return [-Math.PI / 2, 0, -Math.PI / 2];
      case 2:
        return [-Math.PI / 2, 0, (-2 * Math.PI) / 2];
      case 3:
        return [-Math.PI / 2, 0, (-3 * Math.PI) / 2];
      default:
        return [0, 0, 0];
    }
  }, [hoveredWorkIndex]);

  //Resetting the cube position on window resize
  useEffect(() => {
    const handleResize = () => {
      const newPosition = new THREE.Vector3(0, 0, 2.5);
      cubePhysicsApi.current?.setTranslation(newPosition, true);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Setting cube position and applying impulse on work and contact section exit
  useEffect(() => {
    if (!worksSceneIsActive && !contactSceneIsActive) {
      cubePhysicsApi.current?.applyImpulse(new THREE.Vector3(25, 25, 0), true);
    }

    if (cubePhysicsApi.current !== null && !worksSceneIsActive) {
      cubePhysicsApi.current.setRotation(
        new THREE.Quaternion(0, 0, 0, 1),
        true
      );
    }
  }, [worksSceneIsActive, contactSceneIsActive]);

  useFrame((_, delta) => {
    //Position pinning animations
    if (cubePhysicsApi.current !== null && sceneIsActive) {
      // Calculating and applying position translation
      currentPosition.copy(cubePhysicsApi.current.translation());
      targetPosition.set(...sceneTargetPosition);
      currentPosition.lerp(targetPosition, 0.1);
      cubePhysicsApi.current.setNextKinematicTranslation(currentPosition);

      //Calculating and applying rotation
      currentRotation.copy(cubePhysicsApi.current.rotation());
      worksSceneIsActive
        ? targetRotation.setFromEuler(new THREE.Euler(...sceneTargetRotation))
        : targetRotation.setFromEuler(new THREE.Euler(0, 0, 0));
      currentRotation.slerp(targetRotation, 0.1);
      cubePhysicsApi.current.setNextKinematicRotation(currentRotation);
    }

    //Scale animations
    if (cubeRef.current !== null) {
      const targetScale = sceneIsActive ? (worksSceneIsActive ? 5 : 7.5) : 2;
      easing.damp3(
        cubeRef.current.scale,
        [targetScale, targetScale, targetScale],
        0.25,
        delta
      );
    }
  });

  return (
    <RigidBody
      colliders={false}
      canSleep={false}
      scale={0.75}
      position={[-1, 0, 2]}
      linearVelocity={[2, 2, 0]}
      angularVelocity={[1, 1, 1]}
      linearDamping={sceneIsActive ? 10 : 1}
      angularDamping={sceneIsActive ? 10 : 1}
      enabledTranslations={[true, true, false]}
      enabledRotations={
        worksScrollProgress > 0.5 ? [false, false, true] : [true, true, true]
      }
      type={sceneIsActive ? "kinematicPosition" : "dynamic"}
      ref={cubePhysicsApi}
    >
      <CuboidCollider args={[1, 1, 1]} />
      <group scale={2} ref={cubeRef}>
        {/* 3d cube */}
        <TransparentCube />

        {/* 3d works cube */}
        <WorksCube />

        {/* 2d cube */}
        <ToyCube
          visible={
            !worksSceneIsActive &&
            !contactSceneIsActive &&
            worksScrollProgress > 0.5
          }
        />

        {/* 4d cube */}
        <Tesseract visible={contactSceneIsActive} />
      </group>
    </RigidBody>
  );
}
