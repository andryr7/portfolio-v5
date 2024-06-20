import { TechnologiesPhysicalScene } from "@/components/canvas/home/technologies/TechnologiesPhysicalScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import {
  Bounds,
  Environment,
  Lightformer,
  PerspectiveCamera,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { Suspense } from "react";

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
      <Environment preset="city" />
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
