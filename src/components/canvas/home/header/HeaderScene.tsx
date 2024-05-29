import {
  Bounds,
  Environment,
  OrbitControls,
  OrthographicCamera,
  Text,
  useTrailTexture,
} from "@react-three/drei";
import { extend, useThree } from "@react-three/fiber";
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
  // const { getCurrentViewport } = useThree((state) => state.viewport);
  // const { width: viewportWidth, height: viewportHeight } = getCurrentViewport();
  const colors = useColors();
  const cameraRef = useRef(null);
  const heroIsInView = usePortfolioStore((state) => state.heroIsInView);

  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );

  // const { debug, ease, ...conf } = useControls("Trail", {
  //   size: { value: 64, min: 8, max: 256, step: 8 },
  //   radius: { value: 0.3, min: 0, max: 1 },
  //   maxAge: { value: 750, min: 300, max: 1000 },
  //   interpolate: { value: 0, min: 0, max: 2, step: 1 },
  //   smoothing: { value: 0, min: 0, max: 0.99, step: 0.01 },
  //   minForce: { value: 0.3, min: 0, max: 1, step: 0.1 },
  //   intensity: { value: 0.2, min: 0, max: 1, step: 0.1 },
  //   blend: { value: "screen", options: ["source-over", "screen"] },
  //   debug: false,
  // });

  // const [texture, onMove] = useTrailTexture({ ...conf });

  // const handleMove = (e: any) => {
  //   onMove(e);
  // };

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

      <Environment preset="studio" />

      {/* Physics scene */}
      <Suspense fallback={null}>
        <Physics
          colliders={false}
          gravity={heroIsInView ? [0, 0, 0] : [0, -9.81, 0]}
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
        visible={heroIsInView}
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
      <Bounds fit observe margin={1} maxDuration={0.1}>
        <mesh
          scale={[viewportWidth, viewportHeight, 1]}
          // onPointerMove={handleMove}
          visible={heroIsInView}
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

      {/* Color background */}
      {/* <color args={[colors.main]} attach="background"/> */}
    </>
  );
}
