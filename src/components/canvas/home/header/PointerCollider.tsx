import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import * as THREE from "three";

export function PointerCollider({
  colliderPosition,
  vec = new THREE.Vector3(),
}) {
  const ref = useRef(null);

  useFrame((state) => {
    ref.current?.setNextKinematicTranslation(
      vec.set(colliderPosition.x, colliderPosition.y, 0)
    );
  });

  return (
    <RigidBody
      position={[0, 0, 0]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <CuboidCollider args={[0.25, 0.25, 2]} />
    </RigidBody>
  );
}
