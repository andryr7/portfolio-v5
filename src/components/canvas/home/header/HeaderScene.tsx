import {
  Bounds,
  Environment,
  OrbitControls,
  OrthographicCamera,
  Text,
} from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { TextShaderMaterial } from "./TextShaderMaterial";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { useColors } from "@/handlers/useColors";
import { PhysicsScene } from "./PhysicsScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { BoundsHandler } from "./BoundsHandler";

extend({ TextShaderMaterial });

interface HeaderSceneProps {
  worksScrollProgress: number;
}

export function HeaderScene({ worksScrollProgress }: HeaderSceneProps) {
  const colors = useColors();
  const cameraRef = useRef(null);

  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );

  const worksSceneIsActive = usePortfolioStore(
    (state) => state.worksSceneIsActive
  );

  const contactSceneIsActive = usePortfolioStore(
    (state) => state.contactSceneIsActive
  );

  return (
    <>
      {/* Camera */}
      <OrthographicCamera
        makeDefault
        zoom={50}
        near={0.01}
        far={1000}
        position={[0, 0, 10]}
        ref={cameraRef}
      />

      {/* Physics scene */}
      <Suspense fallback={null}>
        <Physics
          colliders={false}
          gravity={[0, 0, 0]}
          debug
          paused={worksSceneIsActive || contactSceneIsActive}
        >
          <PhysicsScene worksScrollProgress={worksScrollProgress} />
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
      <Bounds fit observe margin={1}>
        <mesh
          scale={[viewportWidth, viewportHeight, 1]}
          // onPointerMove={handleMove}
          visible={worksScrollProgress < 0.5}
        >
          <planeGeometry args={[1, 1, 1, 1]} />
          <meshBasicMaterial color={colors.backgroundOne} />
          {/* <textShaderMaterial
          key={TextShaderMaterial.key}
          darkcolor={new THREE.Color(colors.backgroundOne)}
          lightcolor={new THREE.Color(colors.backgroundTwo)}
        /> */}
        </mesh>
      </Bounds>

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
