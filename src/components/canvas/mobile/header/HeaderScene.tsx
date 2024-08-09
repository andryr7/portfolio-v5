import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrbitControls,
  OrthographicCamera,
  RoundedBox,
  Text,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { HeaderBackground } from "./HeaderBackground";

export function HeaderScene() {
  const cubeRef = useRef(null);
  const colors = usePortfolioStore((state) => state.colors);
  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );

  const heroVisibility = useMemo((): boolean => {
    return worksScrollProgress < 0.5;
  }, [worksScrollProgress]);

  const worksBackgroundPosition = useMemo(
    (): [number, number, number] => [
      0,
      -viewportHeight + worksScrollProgress * viewportHeight * 2,
      0.25,
    ],
    [viewportHeight, worksScrollProgress]
  );

  useFrame((state, delta) => {
    state.camera.zoom = Math.min(
      window.innerWidth / viewportWidth,
      window.innerHeight / viewportHeight
    );
    state.camera.updateProjectionMatrix();

    if (cubeRef.current !== null) {
      cubeRef.current.rotation.x += delta * 0.2;
      cubeRef.current.rotation.y += delta * 0.2;
      cubeRef.current.rotation.z += delta * 0.2;
    }
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

      {/* Texts */}
      <group
        position={[
          -viewportWidth / 2 + viewportWidth / 30,
          (-viewportHeight / 2 + viewportWidth / 30) * 0.9,
          0,
        ]}
        scale={Math.min(viewportWidth / 8.5, viewportHeight / 6)}
        visible={heroVisibility}
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
          independent{"\n"}web developer
        </Text>
      </group>

      <mesh position={[0, 0, 1]} ref={cubeRef} scale={1.25}>
        <RoundedBox>
          <MeshTransmissionMaterial thickness={1} />
        </RoundedBox>
      </mesh>

      <HeaderBackground />

      {/* Works background */}
      <group position={worksBackgroundPosition}>
        {/* Background */}
        <mesh scale={[viewportWidth, viewportHeight, 1]}>
          {/* <planeGeometry args={[1, 1, 1, 1]} /> */}
          <planeGeometry args={[1, 1]} />
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
      {/* <Environment preset="studio" /> */}
      <Environment resolution={256}>
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer
            form="circle"
            intensity={4}
            rotation-x={Math.PI / 2}
            position={[0, 5, -9]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, 1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={Math.PI / 2}
            position={[-5, -1, -1]}
            scale={2}
          />
          <Lightformer
            form="circle"
            intensity={2}
            rotation-y={-Math.PI / 2}
            position={[10, 1, 0]}
            scale={8}
          />
        </group>
      </Environment>
    </>
  );
}
