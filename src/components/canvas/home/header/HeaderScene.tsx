import { Environment, OrthographicCamera, Text } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { TextShaderMaterial } from "./TextShaderMaterial";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { useColors } from "@/handlers/useColors";
import { PhysicsScene } from "./PhysicsScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

extend({ TextShaderMaterial });

export function HeaderScene() {
  const colors = useColors();
  const testRef = useRef(null);

  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );

  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );

  useFrame((state) => {
    state.camera.zoom = Math.min(
      window.innerWidth / viewportWidth,
      window.innerHeight / viewportHeight
    );
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      {/* Camera */}
      <OrthographicCamera
        makeDefault
        near={0.01}
        far={1000}
        position={[0, 0, 10]}
      />

      {/* Physics scene */}
      <Suspense fallback={null}>
        <Physics
          colliders={false}
          gravity={worksScrollProgress >= 0.75 ? [0, -9.81, 0] : [0, 0, 0]}
          // debug
        >
          <PhysicsScene />
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
        visible={worksScrollProgress < 0.5}
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
        // onPointerMove={handleMove}
        visible={worksScrollProgress < 0.5}
        ref={testRef}
      >
        <planeGeometry args={[1, 1, 1, 1]} />
        <meshBasicMaterial color={colors.backgroundOne} />
        {/* <textShaderMaterial
          key={TextShaderMaterial.key}
          darkcolor={new THREE.Color(colors.backgroundOne)}
          lightcolor={new THREE.Color(colors.backgroundTwo)}
        /> */}
      </mesh>

      {/* Works background */}
      <group
        position={[
          0,
          -viewportHeight + worksScrollProgress * viewportHeight * 2,
          0.25,
        ]}
      >
        {/* Background */}
        <mesh scale={[viewportWidth, viewportHeight, 1]}>
          <planeGeometry args={[1, 1, 1, 1]} />
          <meshBasicMaterial color={colors.main} toneMapped={false} />
        </mesh>
        {/* Texts */}
        <group>
          <Text
            font={spacemono}
            color={colors.backgroundTwo}
            position={[0, 3, 0]}
            fontSize={viewportWidth / 10}
          >
            selected
          </Text>
          <Text
            font={spacemono}
            color={colors.backgroundTwo}
            position={[0, -3, 0]}
            fontSize={viewportWidth / 10}
          >
            works
          </Text>
        </group>
      </group>

      {/* Environment lighting */}
      <Environment preset="studio" />
    </>
  );
}
