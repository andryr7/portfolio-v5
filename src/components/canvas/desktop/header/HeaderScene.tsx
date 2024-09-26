import {
  Environment,
  Lightformer,
  OrthographicCamera,
  Text,
  useProgress,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Suspense, useEffect, useMemo, useRef } from "react";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { PhysicsScene } from "./physics/PhysicsScene";
import { HeaderBackground } from "./HeaderBackground";
import { easing } from "maath";

export function HeaderScene() {
  const worksBackgroundPanel = useRef<any>(null);
  const setIsLoaded = usePortfolioStore((state) => state.setIsLoaded);
  const colors = usePortfolioStore((state) => state.colors);
  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const worksData = usePortfolioStore((state) => state.worksData);
  const hoveredWorkIndex = usePortfolioStore((state) => state.hoveredWorkIndex);
  const isDarkTheme = usePortfolioStore((state) => state.isDarkTheme);
  const workBackgroundColor = useMemo(() => {
    if (hoveredWorkIndex === null) return colors.backgroundOne;
    return isDarkTheme
      ? worksData[hoveredWorkIndex].darkColor
      : worksData[hoveredWorkIndex].lightColor;
  }, [colors, isDarkTheme, hoveredWorkIndex, worksData]);

  const physicsGravity = useMemo((): [number, number, number] => {
    return worksScrollProgress > 0.9 ? [0, -9.81, 0] : [0, 0, 0];
  }, [worksScrollProgress]);

  const heroVisibility = useMemo((): boolean => {
    return worksScrollProgress < 0.5;
  }, [worksScrollProgress]);

  const worksSceneIsActive = useMemo(() => {
    return worksScrollProgress >= 0.1 && worksScrollProgress <= 0.9;
  }, [worksScrollProgress]);

  const worksBackgroundPosition = useMemo((): [number, number, number] => {
    const multiplier = viewportHeight * 5;
    const zPosition = 0.25;

    if (worksScrollProgress <= 0.2) {
      return [0, -viewportHeight + worksScrollProgress * multiplier, zPosition];
    }

    if (worksScrollProgress >= 0.8) {
      return [0, (worksScrollProgress - 0.8) * multiplier, zPosition];
    }

    return [0, 0, zPosition];
  }, [viewportHeight, worksScrollProgress]);

  useFrame((state, delta) => {
    state.camera.zoom = Math.min(
      window.innerWidth / viewportWidth,
      window.innerHeight / viewportHeight
    );
    state.camera.updateProjectionMatrix();

    if (worksBackgroundPanel.current !== null) {
      easing.dampC(
        worksBackgroundPanel.current.material.color,
        worksSceneIsActive ? workBackgroundColor : colors.backgroundTwo,
        0.25,
        delta
      );
    }
  });

  //Loading handling
  const loadingProgress = useProgress();
  useEffect(() => {
    if (loadingProgress.progress === 100) {
      setIsLoaded(true);
    }
  }, [loadingProgress, setIsLoaded]);

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
        <Physics colliders={false} gravity={physicsGravity}>
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

      <HeaderBackground visible={heroVisibility} />

      {/* Works background */}
      <group position={worksBackgroundPosition}>
        {/* Background */}
        <mesh
          scale={[viewportWidth, viewportHeight, 1]}
          ref={worksBackgroundPanel}
        >
          {/* <planeGeometry args={[1, 1, 1, 1]} /> */}
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial color={colors.backgroundTwo} toneMapped={false} />
        </mesh>
      </group>

      {/* Environment lighting */}
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
