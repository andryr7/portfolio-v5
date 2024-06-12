import { Environment, OrthographicCamera, Text } from "@react-three/drei";
import { extend, useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useRef } from "react";
import { TextShaderMaterial } from "./TextShaderMaterial";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { geometry } from "maath";
import { PhysicsScene } from "./physics/PhysicsScene";

extend({ TextShaderMaterial });
extend(geometry);

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      roundedPlaneGeometry: any;
    }
  }
}

export function HeaderScene() {
  const colors = usePortfolioStore((state) => state.colors);
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
        <meshBasicMaterial color={colors.backgroundOne} toneMapped={false} />
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
          {/* <planeGeometry args={[1, 1, 1, 1]} /> */}
          <roundedPlaneGeometry
            args={[
              1,
              1,
              0.1 -
                Math.min(1, 2 - Math.abs(worksScrollProgress - 0.5) * 4) * 0.1,
            ]}
          />
          <meshBasicMaterial color="#747474" toneMapped={false} />
        </mesh>
        {/* Texts */}
        <group>
          <Text
            font={spacemono}
            color="#d9d9d9"
            position={[0, 2.75, 0]}
            fontSize={viewportWidth / 15}
          >
            selected works
          </Text>
        </group>
      </group>

      {/* Environment lighting */}
      <Environment preset="studio" />
    </>
  );
}
