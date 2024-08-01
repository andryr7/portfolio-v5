import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import {
  Bounds,
  Environment,
  Lightformer,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";
import { TechnologiesPhysicalScene } from "./TechnologiesPhysicalScene";

export function TechnologiesScene() {
  const colors = usePortfolioStore((state) => state.colors);

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={10} />

      {/* Lighting and environment */}
      <ambientLight intensity={1} />
      <spotLight
        position={[5, 5, 10]}
        angle={0.15}
        penumbra={1}
        intensity={1}
        castShadow
      />
      {/* <Environment preset="city" /> */}
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
      <color attach={"background"} args={[colors.backgroundTwo]} />

      {/* Physical scene scene */}
      <Suspense fallback={null}>
        <Physics gravity={[0, 0, 0]}>
          <TechnologiesPhysicalScene />
        </Physics>
      </Suspense>

      {/* Scene bounds */}
      <Bounds clip fit observe margin={1}>
        <mesh>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial wireframe color="red" visible={false} />
        </mesh>
      </Bounds>
    </>
  );
}
