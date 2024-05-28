import {
  Bounds,
  OrthographicCamera,
  PerspectiveCamera,
} from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { useColors } from "@/handlers/useColors";
import { PhysicBoundaries } from "../header/PhysicBoundaries";
import { Tesseract } from "./Tesseract";

export function ContactScene() {
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();
  const colors = useColors();
  const cameraRef = useRef(null);

  return (
    <>
      {/* Camera */}
      {/* <PerspectiveCamera
        makeDefault
        fov={75}
        near={0.1}
        far={1000}
        position={[0, 0, 6]}
        ref={cameraRef}
      /> */}
      <OrthographicCamera
        makeDefault
        zoom={50}
        near={0.01}
        far={1000}
        position={[0, 0, 5]}
        ref={cameraRef}
      />

      {/* Physics scene */}
      <Suspense fallback={null}>
        <Physics gravity={[0, -1, 0]} debug colliders={false}>
          <RigidBody>
            <CuboidCollider args={[1, 1, 1]} />
            <mesh>
              <Tesseract />
            </mesh>
          </RigidBody>
          <Bounds fit observe margin={1}>
            <PhysicBoundaries
              viewportWidth={viewportWidth}
              viewportHeight={viewportHeight}
            />
          </Bounds>
        </Physics>
      </Suspense>
    </>
  );
}
