import { extend, useFrame } from "@react-three/fiber";
import { BackgroundMaterial } from "../../desktop/header/BackgroundMaterial";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import {
  Grid,
  MeshTransmissionMaterial,
  OrbitControls,
  RoundedBox,
} from "@react-three/drei";

extend({ BackgroundMaterial });

export function HeaderScene() {
  const cubeRef = useRef<THREE.Mesh>(null);
  const colors = usePortfolioStore((state) => state.colors);

  const mainColor = useMemo(() => {
    return new THREE.Color(colors.main);
  }, [colors]);

  const backgroundColor = useMemo(() => {
    return new THREE.Color(colors.backgroundOne);
  }, [colors]);

  useFrame((_, delta) => {
    if (cubeRef.current !== null) {
      cubeRef.current.rotation.x += delta;
      cubeRef.current.rotation.y += delta;
      cubeRef.current.rotation.z += delta;
    }
  });

  return (
    <>
      <color attach="background" args={[colors.backgroundOne]} />
      <OrbitControls />
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <Grid
          args={[10, 10]}
          sectionSize={0}
          cellSize={1}
          cellColor={mainColor}
          cellThickness={1}
        />
      </mesh>
      <mesh position={[0, 0, 2]} scale={2} ref={cubeRef}>
        <RoundedBox>
          <MeshTransmissionMaterial />
        </RoundedBox>
      </mesh>
    </>
  );
}
