import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Tech } from "@/types/tech";
import * as THREE from "three";
import { ThreeEvent, useFrame } from "@react-three/fiber";
import { Box, Outlines, useCursor, useTexture } from "@react-three/drei";
import { RapierRigidBody, RigidBody, quat } from "@react-three/rapier";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useShallow } from "zustand/react/shallow";

interface TechnologyCubeProps {
  position?: [number, number, number];
  tech: Tech;
}

export function TechnologyCube({
  position = [0, 0, 0],
  tech,
}: TechnologyCubeProps) {
  //Refs
  const physicsApiRef = useRef<RapierRigidBody | null>(null);
  const colors = usePortfolioStore((state) => state.colors);

  // Cube state
  const [draggedCubeId, setDraggedCubeId, selectedTechId, setSelectedTechId] =
    usePortfolioStore(
      useShallow((state) => [
        state.draggedTechCubeId,
        state.setDraggedTechCubeId,
        state.selectedTechCubeId,
        state.setSelectedTechCubeId,
      ])
    );
  const isDragged = useMemo(
    () => draggedCubeId === tech._id,
    [draggedCubeId, tech]
  );
  const isSelected = useMemo(
    () => selectedTechId === tech._id,
    [selectedTechId, tech]
  );

  //Texture
  const texture = useTexture(`images/techs/${tech.imageUrl}`);
  texture.center = new THREE.Vector2(0.5, 0.5);

  //Hover handling
  const [hovered, hover] = useState<boolean>(false);
  useCursor(hovered || draggedCubeId !== null, "grab");

  //Waking up the rigid body if anything changes
  useEffect(() => {
    physicsApiRef.current?.wakeUp();
  }, [selectedTechId, draggedCubeId]);

  useFrame((state) => {
    //Do nothing if the ref is not yet assigned
    if (physicsApiRef.current === null) return;

    //Cube centering
    if (!isSelected) {
      physicsApiRef.current?.applyImpulse(
        new THREE.Vector3()
          .copy(physicsApiRef.current.translation())
          .negate()
          .multiplyScalar(0.2),
        true
      );
    }

    //Cube dragging
    if (isDragged) {
      const vec2 = new THREE.Vector3();
      physicsApiRef.current?.applyImpulse(
        vec2.set(state.pointer.x * 0.5, state.pointer.y * 0.5, 0),
        true
      );
    }

    //If the cube is selected, rotate it and center it
    if (isSelected) {
      //Cube translation
      //Calculating the necessary translation
      const offset = new THREE.Vector3(0, 0, 1.5);
      const cubeTranslation = new THREE.Vector3()
        .copy(physicsApiRef.current.translation())
        .negate()
        .multiplyScalar(0.2)
        .add(offset);

      //Applying the translation
      physicsApiRef.current?.applyImpulse(cubeTranslation, true);

      //Cube rotation
      //Calculating the necessary rotation
      const {
        x = 0,
        y = 0,
        z = 0,
        w = 1,
      } = physicsApiRef.current?.rotation() || {};
      const currentRotation = new THREE.Quaternion(x, y, z, w);
      const targetRotation = new THREE.Quaternion();

      //Smoothing the rotation
      const slerpFactor = 0.5; // Adjust this value for the speed of rotation
      const smoothRotationTarget = currentRotation.slerp(
        targetRotation,
        slerpFactor
      );

      //Converting the rotation to rapier format
      const rapierRotationTarget = quat(smoothRotationTarget);

      //Applying the rotation
      physicsApiRef.current?.applyTorqueImpulse(rapierRotationTarget, true);
    }
  });

  const handlePointerEnter = useCallback((event: ThreeEvent<PointerEvent>) => {
    //Prevent the pointer hover from affecting underlying cubes
    event.stopPropagation();
    hover(true);
  }, []);

  const handlePointerLeave = useCallback((event: ThreeEvent<PointerEvent>) => {
    //Prevent the pointer hover from affecting underlying cubes
    event.stopPropagation();
    hover(false);
  }, []);

  const handlePointerDown = useCallback(
    (event: ThreeEvent<PointerEvent>) => {
      //Prevent the drag from affecting underlying cubes
      event.stopPropagation();
      setDraggedCubeId(tech._id);
    },
    [setDraggedCubeId, tech]
  );

  const handleClick = useCallback(
    (event: ThreeEvent<MouseEvent>) => {
      event.stopPropagation();
      //Ensuring click/drag accuracy
      if (event.delta < 10) {
        setSelectedTechId(selectedTechId === tech._id ? null : tech._id);
      }
    },
    [selectedTechId, setSelectedTechId, tech._id]
  );

  return (
    <RigidBody
      linearDamping={isSelected ? 15 : 4}
      angularDamping={isSelected ? 15 : 1}
      friction={0.1}
      ref={physicsApiRef}
      colliders={"cuboid"}
      position={position}
    >
      <mesh
        castShadow
        receiveShadow
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        onPointerDown={handlePointerDown}
        onClick={handleClick}
      >
        <Box>
          <meshStandardMaterial map={texture} metalness={0} roughness={0} />
          <Outlines
            thickness={0.02}
            color={colors.main}
            transparent
            opacity={hovered ? 1 : 0}
          />
        </Box>
      </mesh>
    </RigidBody>
  );
}
