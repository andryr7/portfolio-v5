import {
  Environment,
  Grid,
  MeshTransmissionMaterial,
  OrbitControls,
  OrthographicCamera,
  RoundedBox,
  Text,
  useTrailTexture,
} from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
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
import { useControls } from "leva";

extend({ TextShaderMaterial });

export function HeaderScene() {
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();
  const [colliderPosition, setColliderPosition] = useState({ x: 10, y: 10 });
  const cubeRef = useRef(null);
  const colors = useColors();
  const cameraRef = useRef(null);
  const boundsObjectRef = useRef(null);

  const { debug, ease, ...conf } = useControls("Trail", {
    size: { value: 64, min: 8, max: 256, step: 8 },
    radius: { value: 0.3, min: 0, max: 1 },
    maxAge: { value: 750, min: 300, max: 1000 },
    interpolate: { value: 0, min: 0, max: 2, step: 1 },
    smoothing: { value: 0, min: 0, max: 0.99, step: 0.01 },
    minForce: { value: 0.3, min: 0, max: 1, step: 0.1 },
    intensity: { value: 0.2, min: 0, max: 1, step: 0.1 },
    blend: { value: "screen", options: ["source-over", "screen"] },
    debug: false,
  });

  const [texture, onMove] = useTrailTexture({ ...conf });

  const handleMove = (e: any) => {
    setColliderPosition({ x: e.point.x, y: e.point.y });
    onMove(e);
  };

  return (
    <>
      {/* Camera */}
      <OrthographicCamera
        makeDefault
        zoom={50}
        near={0.01}
        far={1000}
        position={[0, 0, 5]}
        ref={cameraRef}
      />

      {/* Camera zoom handler */}
      <CameraHandler camera={cameraRef} target={boundsObjectRef} />

      <Environment preset="studio" />

      {/* Physics scene */}
      <Suspense fallback={null}>
        <Physics colliders={false} gravity={[0, 0, 0]}>
          <RigidBody
            colliders={false}
            position={[-1, -1, 2]}
            enabledTranslations={[true, true, false]}
            canSleep={false}
            scale={0.75}
          >
            <CuboidCollider args={[1, 1, 1]} />
            <mesh ref={cubeRef} scale={2}>
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
          color={colors.main}
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
        onPointerMove={handleMove}
        ref={boundsObjectRef}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial color={colors.backgroundOne} />
        {/* <textShaderMaterial
          key={TextShaderMaterial.key}
          darkcolor={new THREE.Color(colors.backgroundOne)}
          lightcolor={new THREE.Color(colors.backgroundTwo)}
        /> */}
      </mesh>

      {/* Color background */}
      <color args={[colors.main]} attach="background" />
    </>
  );
}
