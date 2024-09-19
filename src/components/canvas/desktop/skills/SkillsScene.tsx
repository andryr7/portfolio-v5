import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import {
  Bounds,
  Box,
  MeshTransmissionMaterial,
  Plane,
  Sphere,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import { Group } from "three";

export function SkillsScene() {
  const groupRef = useRef<Group | null>(null);
  const boxMaterialRef = useRef(null);
  const sphereMaterialRef = useRef(null);
  const shapeMaterialRef = useRef(null);
  const colors = usePortfolioStore((state) => state.colors);
  const skillsScrollProgress = usePortfolioStore(
    (state) => state.skillsScrollProgress
  );

  useFrame((_, delta) => {
    if (groupRef.current !== null) {
      groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.1;
      groupRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      {/* <OrbitControls /> */}
      <group ref={groupRef}>
        <mesh>
          <Sphere>
            <MeshTransmissionMaterial
              chromaticAberration={1}
              thickness={0.1}
              transmission={1}
              ref={sphereMaterialRef}
            />
          </Sphere>
        </mesh>
        <mesh>
          <Box args={[1.15, 1.15, 1.15]}>
            <meshBasicMaterial
              wireframe
              color={colors.main}
              ref={boxMaterialRef}
              visible={skillsScrollProgress > 0.33}
            />
          </Box>
        </mesh>
        <group ref={shapeMaterialRef}>
          <mesh>
            <Plane args={[2, 2]}>
              <meshBasicMaterial
                wireframe
                color={colors.main}
                visible={skillsScrollProgress > 0.66}
              />
            </Plane>
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <Plane args={[2, 2]}>
              <meshBasicMaterial
                wireframe
                color={colors.main}
                visible={skillsScrollProgress > 0.66}
              />
            </Plane>
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <Plane args={[2, 2]}>
              <meshBasicMaterial
                wireframe
                color={colors.main}
                visible={skillsScrollProgress > 0.66}
              />
            </Plane>
          </mesh>
        </group>
      </group>

      {/* Scene bounds */}
      <Bounds clip fit observe margin={1}>
        <mesh>
          <boxGeometry args={[3, 3, 3]} />
          <meshBasicMaterial wireframe color={"red"} visible={false} />
        </mesh>
      </Bounds>

      <color attach={"background"} args={[colors.backgroundTwo]} />
    </>
  );
}
