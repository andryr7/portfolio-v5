import {
  Bounds,
  Environment,
  MeshTransmissionMaterial,
  OrthographicCamera,
  RoundedBox,
  Text,
} from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useRef, useState } from "react";
import { TextShaderMaterial } from "./TextShaderMaterial";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { useColors } from "@/handlers/useColors";
import * as THREE from "three";
import { PhysicBoundaries } from "./PhysicBoundaries";
import { PointerCollider } from "./PointerCollider";
import { CameraHandler } from "./CameraHandler";

extend({ TextShaderMaterial });

export function HeaderScene() {
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();
  const [colliderPosition, setColliderPosition] = useState({ x: 10, y: 10 });
  const cubeRef = useRef(null);
  const colors = useColors();
  const testRef = useRef(null);

  return (
    <>
      {/* Camera */}
      <OrthographicCamera
        makeDefault
        zoom={50}
        near={0.1}
        far={1000}
        position={[0, 0, 5]}
      />

      {/* Camera zoom handler */}
      <CameraHandler target={testRef} />

      {/* <Environment preset="city" /> */}

      {/* Physics scene */}
      <Suspense fallback={null}>
        <Physics colliders={false} gravity={[0, 0, 0]}>
          <RigidBody
            colliders={false}
            position={[0, 0, 1]}
            enabledTranslations={[true, true, false]}
            canSleep={false}
          >
            <CuboidCollider args={[0.75, 0.75, 0.75]} />
            <mesh ref={cubeRef} scale={1.5}>
              <RoundedBox>
                <MeshTransmissionMaterial
                  clearcoat={1}
                  thickness={0.2}
                  anisotropicBlur={0.1}
                  chromaticAberration={1}
                  samples={4}
                  resolution={2048}
                  backside
                />
              </RoundedBox>
            </mesh>
          </RigidBody>
          <PointerCollider colliderPosition={colliderPosition} />
          <PhysicBoundaries
            viewportWidth={viewportWidth}
            viewportHeight={viewportHeight}
          />
        </Physics>
      </Suspense>

      {/* Texts */}
      <group
        position={[
          -viewportWidth / 2 + viewportWidth / 30,
          -viewportHeight / 2 + viewportWidth / 30,
          0,
        ]}
        scale={Math.min(viewportWidth / 10, viewportHeight / 5)}
      >
        <Text
          font={spacemono}
          anchorX="left"
          anchorY="bottom"
          position={[0, 2, 0]}
          lineHeight={1}
          color={colors.main}
        >
          Andry{"\n"}Ratsimba
        </Text>
        <Text
          font={spacemonoitalic}
          anchorX="left"
          anchorY="bottom"
          position={[0, 0, 0]}
          lineHeight={1}
          fillOpacity={0}
          strokeWidth={0.01}
          strokeColor={colors.main}
        >
          Independent{"\n"}Web developer
        </Text>
      </group>

      {/* Shader background */}
      <mesh
        scale={[viewportWidth, viewportHeight, 1]}
        onPointerMove={(e) =>
          setColliderPosition({ x: e.point.x, y: e.point.y })
        }
        ref={testRef}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial color={colors.backgroundOne} />
        <textShaderMaterial
          key={TextShaderMaterial.key}
          darkcolor={new THREE.Color(colors.backgroundOne)}
          lightcolor={new THREE.Color(colors.backgroundTwo)}
        />
      </mesh>

      {/* Color background */}
      <color args={["white"]} attach="background" />
    </>
  );
}
