import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import {
  Bounds,
  Box,
  Cone,
  MeshTransmissionMaterial,
  Sphere,
} from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useRef } from "react";
import { Group } from "three";

export function SkillsScene() {
  const groupRef = useRef<Group | null>(null);
  const frontendMaterialRef = useRef(null);
  const backendMaterialRef = useRef(null);
  const devopsMaterialRef = useRef(null);
  const colors = usePortfolioStore((state) => state.colors);
  const skillsScrollProgress = usePortfolioStore(
    (state) => state.skillsScrollProgress
  );

  useFrame((_, delta) => {
    if (groupRef.current !== null) {
      // groupRef.current.rotation.x += delta * 0.1;
      groupRef.current.rotation.y += delta * 0.1;
      // sphereRef.current.rotation.z += delta * 0.1;
    }

    if (frontendMaterialRef.current !== null) {
      easing.damp(
        frontendMaterialRef.current,
        "opacity",
        skillsScrollProgress < 0.33 ? 1 : 0,
        0.25,
        delta
      );
    }

    if (backendMaterialRef.current !== null) {
      easing.damp(
        backendMaterialRef.current,
        "opacity",
        skillsScrollProgress > 0.33 ? 1 : 0,
        0.25,
        delta
      );
    }

    if (devopsMaterialRef.current !== null) {
      easing.damp(
        devopsMaterialRef.current,
        "opacity",
        skillsScrollProgress > 0.66 ? 1 : 0,
        0.25,
        delta
      );
    }
  });

  return (
    <>
      <group ref={groupRef} rotation={[Math.PI / 8, 0, 0]}>
        <group>
          <mesh>
            <Sphere>
              <MeshTransmissionMaterial
                ref={frontendMaterialRef}
                chromaticAberration={1}
                thickness={1}
                transmission={1}
                transparent
              />
            </Sphere>
          </mesh>
          <mesh scale={1.15}>
            <Box>
              <meshBasicMaterial color={colors.main} transparent wireframe />
            </Box>
          </mesh>
        </group>
        <mesh>
          <Sphere>
            <meshBasicMaterial
              ref={backendMaterialRef}
              color={colors.main}
              transparent
              wireframe
              opacity={0}
            />
          </Sphere>
        </mesh>
        <mesh>
          <Box args={[2, 2, 2]}>
            <meshBasicMaterial
              ref={devopsMaterialRef}
              color={colors.main}
              transparent
              wireframe
            />
          </Box>
        </mesh>
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
