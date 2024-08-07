import { useFrame } from "@react-three/fiber";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useRef } from "react";
import * as THREE from "three";
import {
  Bounds,
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  OrthographicCamera,
  RoundedBox,
  Text,
} from "@react-three/drei";
import spacemono from "@/assets/fonts/space-mono.ttf";
import spacemonoitalic from "@/assets/fonts/space-mono-italic.ttf";

export function HeaderScene() {
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const colors = usePortfolioStore((state) => state.colors);

  useFrame((_, delta) => {
    if (cubeRef.current !== null) {
      cubeRef.current.rotation.x += delta * 0.1;
      cubeRef.current.rotation.y += delta * 0.1;
      cubeRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      <OrthographicCamera
        makeDefault
        near={0.01}
        far={1000}
        position={[0, 0, 1]}
      />
      <color attach="background" args={[colors.backgroundOne]} />
      <ambientLight />
      <Bounds fit clip observe margin={1}>
        <mesh>
          <boxGeometry args={[8.5, 5, 5]} />
          <meshBasicMaterial color="red" wireframe />
        </mesh>
      </Bounds>
      <mesh scale={3} position={[0, 0, -2]} ref={cubeRef}>
        <RoundedBox>
          <MeshTransmissionMaterial
            thickness={0.25}
            chromaticAberration={0.5}
          />
        </RoundedBox>
      </mesh>
      <group>
        <Text
          font={spacemono}
          anchorX="center"
          anchorY="bottom"
          lineHeight={1}
          color={colors.main}
          textAlign="center"
        >
          Andry{"\n"}Ratsimba
        </Text>
        <Text
          font={spacemonoitalic}
          anchorX="center"
          anchorY="top"
          lineHeight={1}
          fillOpacity={0}
          strokeWidth={0.01}
          strokeColor={colors.main}
          textAlign="center"
        >
          independent{"\n"}web developer
        </Text>
      </group>
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
