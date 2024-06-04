import {
  MeshTransmissionMaterial,
  Outlines,
  RoundedBox,
  Text,
} from "@react-three/drei";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useColors } from "@/handlers/useColors";
import * as THREE from "three";
import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { easing } from "maath";
import { Tesseract } from "../contact/Tesseract";
import spacemono from "@/assets/fonts/space-mono.ttf";

export function InteractiveCube({
  currentPosition = new THREE.Vector3(),
  currentRotation = new THREE.Quaternion(),
  targetPosition = new THREE.Vector3(),
  targetRotation = new THREE.Quaternion(),
}) {
  const colors = useColors();
  const cubePhysicsApi = useRef<RapierRigidBody>(null);
  const cubeRef = useRef<THREE.Group>(null);
  const cubeMaterialRef = useRef<any>(null);
  const squareMaterialRef = useRef<any>(null);
  const cubeTextMaterialRef = useRef<any>(null);
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

  const sceneIsActive = worksSceneIsActive || contactSceneIsActive;

  const sceneTargetPosition = useMemo(() => {
    const worksSceneTargetPosition: [number, number, number] = [
      0,
      -viewportHeight + worksScrollProgress * viewportHeight * 2,
      2.5,
    ];
    const contactSceneTargetPosition: [number, number, number] = [
      0,
      -viewportHeight +
        Math.min(contactScrollProgress, 0.5) * viewportHeight * 2,
      2.5,
    ];
    return worksSceneIsActive
      ? worksSceneTargetPosition
      : contactSceneTargetPosition;
  }, [
    viewportHeight,
    worksScrollProgress,
    contactScrollProgress,
    worksSceneIsActive,
  ]);

  //Resetting the cube position on window resize
  useEffect(() => {
    const handleResize = () => {
      cubePhysicsApi.current?.setTranslation(
        currentPosition.set(0, 0, 2.5),
        true
      );
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [currentPosition]);

  useEffect(() => {
    if (!worksSceneIsActive && !contactSceneIsActive) {
      cubePhysicsApi.current?.applyImpulse(new THREE.Vector3(25, 25, 0), true);
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
      currentRotation.slerp(targetRotation, 0.1);
      cubePhysicsApi.current.setNextKinematicRotation(currentRotation);
    }

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

    //3d cube material opacity animation
    if (cubeMaterialRef.current !== null) {
      easing.damp(
        cubeMaterialRef.current,
        "opacity",
        !worksSceneIsActive && worksScrollProgress > 0.5 ? 0 : 1,
        0.25,
        delta
      );
    }

    //2d cube material opacity animation
    if (squareMaterialRef.current !== null) {
      easing.damp(
        squareMaterialRef.current,
        "opacity",
        !worksSceneIsActive &&
          !contactSceneIsActive &&
          worksScrollProgress > 0.5
          ? 1
          : 0,
        0.25,
        delta
      );
    }

    if (cubeTextMaterialRef.current !== null) {
      easing.damp(
        cubeTextMaterialRef.current,
        "opacity",
        !worksSceneIsActive &&
          !contactSceneIsActive &&
          worksScrollProgress > 0.5
          ? 1
          : 0,
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
      linearDamping={sceneIsActive ? 10 : 1}
      angularDamping={sceneIsActive ? 10 : 1}
      enabledTranslations={[true, true, false]}
      enabledRotations={
        worksScrollProgress > 0.5 ? [false, false, true] : [true, true, true]
      }
      type={sceneIsActive ? "kinematicPosition" : "dynamic"}
    >
      <CuboidCollider args={[1, 1, 1]} />
      <group scale={2} ref={cubeRef}>
        {/* 3d cube */}
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
              // transmission={0}
            />
            {/* <Outlines color={colors.main} /> */}
          </RoundedBox>
        </mesh>

        {/* 2d cube */}
        <group
          visible={
            !worksSceneIsActive &&
            !contactSceneIsActive &&
            worksScrollProgress > 0.5
          }
        >
          <mesh>
            <RoundedBox>
              <meshBasicMaterial
                color={colors.backgroundOne}
                toneMapped={false}
                transparent
                ref={squareMaterialRef}
              />
              <Outlines thickness={0.025} color={colors.main} />
            </RoundedBox>
          </mesh>
          <mesh position={[0, 0, 0.51]}>
            <Text
              fontSize={0.2}
              font={spacemono}
              color={colors.main}
              textAlign="center"
            >
              scroll
              {"\n"}
              to
              {"\n"}
              contact
              <meshBasicMaterial transparent ref={cubeTextMaterialRef} />
            </Text>
          </mesh>
        </group>

        {/* 4d cube */}
        <mesh visible={contactSceneIsActive}>
          <Tesseract active={contactSceneIsActive} />
        </mesh>
      </group>
    </RigidBody>
  );
}
