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
import { OverlayCube } from "./OverlayCube";
import { TransparentCube } from "./TransparentCube";
import { WorksCube } from "../works/WorksCube";
import { Tesseract } from "../contact/Tesseract";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  currentRotation = new THREE.Quaternion(),
  targetPosition = new THREE.Vector3(),
  targetRotation = new THREE.Quaternion(),
  angle = new THREE.Euler(),
}) {
  const cubePhysicsApi = useRef<RapierRigidBody>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const { height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const contactScrollProgress = usePortfolioStore(
    (state) => state.contactScrollProgress
  );
  const hoveredWorkIndex = usePortfolioStore((state) => state.hoveredWorkIndex);
  const worksSceneIsActive = useMemo(() => {
    return worksScrollProgress >= 0.1 && worksScrollProgress <= 0.9;
  }, [worksScrollProgress]);
  const contactSceneIsActive = useMemo(() => {
    return contactScrollProgress >= 0.25;
  }, [contactScrollProgress]);
  const sceneIsActive = worksSceneIsActive || contactSceneIsActive;

  const sceneTargetPosition = useMemo<[number, number, number]>(() => {
    if (worksSceneIsActive) {
      //If work scroll is between 0.1 and 0.2, calculate an intermediary position
      if (worksScrollProgress < 0.2)
        return [0, (worksScrollProgress - 0.2) * 5 * viewportHeight, 2.5];
      //If work scroll is between 0.8 and 0.9, calculate an intermediary position
      if (worksScrollProgress > 0.8)
        return [0, (worksScrollProgress - 0.8) * 5 * viewportHeight, 2.5];
      //Else, return a center position
      return [0, 0, 2.5];
    }

    //If it's the contact scene
    return [
      0,
      -0.9 * viewportHeight +
        Math.min(contactScrollProgress, 0.5) * viewportHeight * 2,
      2.5,
    ];
  }, [
    viewportHeight,
    worksSceneIsActive,
    worksScrollProgress,
    contactScrollProgress,
  ]);

  const sceneTargetRotation = useMemo<[number, number, number]>(() => {
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

  const enabledCubeRotations = useMemo((): [boolean, boolean, boolean] => {
    return worksScrollProgress > 0.9
      ? [false, false, true]
      : [true, true, true];
  }, [worksScrollProgress]);

  useFrame((_, delta) => {
    //Position and rotation animations
    if (cubePhysicsApi.current !== null && sceneIsActive) {
      // Calculating and applying position translation
      currentPosition.copy(cubePhysicsApi.current.translation());
      targetPosition.set(...sceneTargetPosition);
      currentPosition.lerp(targetPosition, 0.1);
      cubePhysicsApi.current.setNextKinematicTranslation(currentPosition);

      //Calculating and applying rotation
      currentRotation.copy(cubePhysicsApi.current.rotation());
      worksSceneIsActive
        ? targetRotation.setFromEuler(angle.set(...sceneTargetRotation))
        : targetRotation.setFromEuler(angle.set(0, 0, 0));
      currentRotation.slerp(targetRotation, 0.1);
      cubePhysicsApi.current.setNextKinematicRotation(currentRotation);
    }

    //TODO Work section transition animation
    // if (
    //   cubePhysicsApi.current !== null &&
    //   !sceneIsActive &&
    //   worksScrollProgress > 0.5
    // ) {
    //   //Calculating the necessary rotation
    //   const {
    //     x = 0,
    //     y = 0,
    //     z = 0,
    //     w = 1,
    //   } = cubePhysicsApi.current?.rotation() || {};
    //   currentRotation.set(x, y, z, w);

    //   //Smoothing the rotation
    //   const slerpFactor = 0.5; // Adjust this value for the speed of rotation
    //   const smoothRotationTarget = currentRotation.slerp(
    //     targetRotation,
    //     slerpFactor
    //   );

    //   //Converting the rotation to rapier format
    //   const rapierRotationTarget = quat(smoothRotationTarget);

    //   //Applying the rotation
    //   cubePhysicsApi.current?.applyTorqueImpulse(rapierRotationTarget, true);
    // }

    //Scale animations
    if (cubeRef.current !== null) {
      const targetScale = sceneIsActive ? 5 : 2;
      easing.damp3(
        cubeRef.current.scale,
        [targetScale, targetScale, targetScale],
        0.25,
        delta
      );
    }
  });

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

  //Each time user leaves works scene or contact scene, apply an impulse to move the cube
  useEffect(() => {
    if (!worksSceneIsActive && !contactSceneIsActive) {
      cubePhysicsApi.current?.applyImpulse(new THREE.Vector3(25, 25, 0), true);
    }
  }, [worksSceneIsActive, contactSceneIsActive]);

  //Each time user leaves works scene, rotate the cube to show the text
  useEffect(() => {
    if (
      !worksSceneIsActive &&
      worksScrollProgress > 0.5 &&
      cubePhysicsApi.current !== null
    ) {
      cubePhysicsApi.current?.setRotation(
        new THREE.Quaternion(0, 0, 0, Math.PI / 5),
        true
      );
    }
  }, [worksSceneIsActive]); // eslint-disable-line react-hooks/exhaustive-deps
  //* worksScrollProgress is not included in the dependency array because the effect must not trigger at every scroll

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
      enabledRotations={enabledCubeRotations}
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
        <OverlayCube
          visible={
            !worksSceneIsActive &&
            !contactSceneIsActive &&
            worksScrollProgress > 0.9
          }
        />

        {/* 4d cube */}
        <Tesseract
          active={contactSceneIsActive}
          visible={contactScrollProgress > 0}
          scale={1 / 210}
        />
      </group>
    </RigidBody>
  );
}
