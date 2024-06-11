import { TechnologiesPhysicalScene } from "@/components/canvas/home/technologies/TechnologiesPhysicalScene";
import { useColors } from "@/handlers/useColors";
import {
  Bounds,
  Environment,
  Lightformer,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense } from "react";

export function TechnologiesScene() {
  const colors = useColors();

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
        <TechnologiesPhysicalScene />
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
