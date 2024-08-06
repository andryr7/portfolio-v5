import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  Environment,
  Lightformer,
  OrthographicCamera,
} from "@react-three/drei";

export function HeaderScene() {
  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );

  const cubeRef = useRef<THREE.Mesh | null>(null);
  const colors = usePortfolioStore((state) => state.colors);

  const mainColor = useMemo(() => {
    return new THREE.Color(colors.main);
  }, [colors]);

  const backgroundColor = useMemo(() => {
    return new THREE.Color(colors.backgroundOne);
  }, [colors]);

  useFrame((state) => {
    state.camera.zoom = Math.min(
      window.innerWidth / viewportWidth,
      window.innerHeight / viewportHeight
    );
    state.camera.updateProjectionMatrix();
  });

  return (
    <>
      <OrthographicCamera
        makeDefault
        near={0.01}
        far={1000}
        position={[0, 0, 10]}
      />
      <color attach="background" args={[colors.backgroundOne]} />
      <ambientLight />
      <mesh>
        <boxGeometry />
      </mesh>
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
