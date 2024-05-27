import {
  Bounds,
  MeshTransmissionMaterial,
  RoundedBox,
  Text,
} from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";
import { CuboidCollider, Physics, RigidBody } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { TextShaderMaterial } from "./TextShaderMaterial";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { useColors } from "@/handlers/useColors";
import * as THREE from "three";

extend({ TextShaderMaterial });

export function HeaderScene() {
  const { getCurrentViewport } = useThree((state) => state.viewport);
  const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();
  const cubeRef = useRef(null);
  const colors = useColors();

  // useFrame((state, delta) => {
  //   cubeRef.current.rotation.x += delta * 0.25;
  //   cubeRef.current.rotation.y += delta * 0.25;
  //   cubeRef.current.rotation.z += delta * 0.25;

  //   cubeRef.current.position.x = state.pointer.x * state.viewport.width;
  //   cubeRef.current.position.y = state.pointer.y * state.viewport.height;
  // });

  return (
    <>
      <Suspense fallback={null}>
        <Physics colliders={false} gravity={[0, 0, 0]} debug>
          <RigidBody colliders={false}>
            <CuboidCollider args={[1, 1, 1]} />
            <mesh scale={2} ref={cubeRef}>
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
        </Physics>
      </Suspense>
      <mesh
        scale={[viewportWidth, viewportHeight, 1]}
        onClick={() => console.log("YARUP")}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial color={colors.backgroundOne} />
        <textShaderMaterial
          key={TextShaderMaterial.key}
          darkcolor={new THREE.Color(colors.backgroundOne)}
          lightcolor={new THREE.Color(colors.backgroundTwo)}
        />
      </mesh>
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
      <color args={["white"]} attach="background" />
    </>
  );
}
