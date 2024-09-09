import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrthographicCamera,
  RoundedBox,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { HeaderBackground } from "./HeaderBackground";
import { Mesh } from "three";

export function HeaderScene() {
  const cubeRef = useRef<Mesh | null>(null);
  const { width: viewportWidth, height: viewportHeight } = usePortfolioStore(
    (state) => state.viewportSize
  );

  useFrame((state, delta) => {
    state.camera.zoom = Math.min(
      window.innerWidth / viewportWidth,
      window.innerHeight / viewportHeight
    );
    state.camera.updateProjectionMatrix();

    if (cubeRef.current !== null) {
      cubeRef.current.rotation.x += delta * 0.1;
      cubeRef.current.rotation.y += delta * 0.1;
      cubeRef.current.rotation.z += delta * 0.1;
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

      {/* Cube */}
      <mesh
        position={[0, 0, 1]}
        ref={cubeRef}
        scale={Math.min(viewportHeight / 1.75, viewportWidth / 1.75)}
      >
        <RoundedBox>
          <MeshTransmissionMaterial
            transmission={1}
            thickness={1}
            chromaticAberration={0.5}
            resolution={77}
            samples={1}
          />
        </RoundedBox>
      </mesh>

      <HeaderBackground />

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
