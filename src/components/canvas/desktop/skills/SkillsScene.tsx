import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import {
  Bounds,
  Box,
  MeshTransmissionMaterial,
  Plane,
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
  const devopsFirstMaterialRef = useRef(null);
  const devopsSecondMaterialRef = useRef(null);
  const devopsThirdMaterialRef = useRef(null);
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

    // if (devopsMaterialRef.current !== null) {
    //   easing.damp(
    //     devopsMaterialRef.current,
    //     "opacity",
    //     skillsScrollProgress > 0.66 ? 1 : 0,
    //     0.25,
    //     delta
    //   );
    // }

    if (devopsFirstMaterialRef.current !== null) {
      easing.damp(
        devopsFirstMaterialRef.current,
        "opacity",
        skillsScrollProgress > 0.66 ? 1 : 0,
        0.25,
        delta
      );
    }

    if (devopsSecondMaterialRef.current !== null) {
      easing.damp(
        devopsSecondMaterialRef.current,
        "opacity",
        skillsScrollProgress > 0.66 ? 1 : 0,
        0.25,
        delta
      );
    }

    if (devopsThirdMaterialRef.current !== null) {
      easing.damp(
        devopsThirdMaterialRef.current,
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
        <group>
          <mesh>
            <Plane args={[2, 2, 1]}>
              <meshBasicMaterial
                color={colors.main}
                transparent
                wireframe
                ref={devopsFirstMaterialRef}
              />
            </Plane>
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <Plane args={[2, 2, 1]}>
              <meshBasicMaterial
                color={colors.main}
                transparent
                wireframe
                ref={devopsSecondMaterialRef}
              />
            </Plane>
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <Plane args={[2, 2, 1]}>
              <meshBasicMaterial
                color={colors.main}
                transparent
                wireframe
                ref={devopsThirdMaterialRef}
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
