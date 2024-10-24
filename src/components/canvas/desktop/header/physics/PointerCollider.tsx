import { useMousePosition } from "@/handlers/useMousePosition";
import { useFrame } from "@react-three/fiber";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";
import { useRoute } from "wouter";

export function PointerCollider({ vec = new THREE.Vector3() }) {
  const ref = useRef<RapierRigidBody | null>(null);
  const mousePosition = useMousePosition();
  const [isHomepage] = useRoute("/");

  useFrame((state) => {
    if (ref.current !== null && isHomepage) {
      ref.current.setNextKinematicTranslation(
        vec.set(
          mousePosition.x * state.viewport.getCurrentViewport().width,
          -mousePosition.y * state.viewport.getCurrentViewport().height,
          2
        )
      );
    }
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <CuboidCollider args={[0.1, 0.1, 2]} />
    </RigidBody>
  );
}
