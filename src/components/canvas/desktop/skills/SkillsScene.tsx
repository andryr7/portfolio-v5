import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Bounds, Box, Dodecahedron, Sphere } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
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

    if (sphereMaterialRef.current !== null) {
      easing.damp(
        sphereMaterialRef.current,
        "opacity",
        skillsScrollProgress <= 0.33 ? 1 : 0,
        0.25,
        delta
      );
    }

    if (boxMaterialRef.current !== null) {
      easing.damp(
        boxMaterialRef.current,
        "opacity",
        skillsScrollProgress > 0.33 && skillsScrollProgress < 0.66 ? 1 : 0,
        0.25,
        delta
      );
    }

    if (shapeMaterialRef.current !== null) {
      easing.damp(
        shapeMaterialRef.current,
        "opacity",
        skillsScrollProgress >= 0.66 ? 1 : 0,
        0.25,
        delta
      );
    }
  });

  return (
    <>
      <group ref={groupRef}>
        <mesh>
          <Sphere args={[1, 12, 2]}>
            <meshBasicMaterial
              color={colors.main}
              wireframe
              transparent
              ref={sphereMaterialRef}
              visible={skillsScrollProgress <= 0.33}
            />
          </Sphere>
        </mesh>
        <mesh>
          <Box args={[1.5, 1.5, 1.5]}>
            <meshBasicMaterial
              color={colors.main}
              wireframe
              transparent
              ref={boxMaterialRef}
              visible={
                skillsScrollProgress > 0.33 && skillsScrollProgress < 0.66
              }
            />
          </Box>
        </mesh>
        <mesh>
          <Dodecahedron>
            <meshBasicMaterial
              color={colors.main}
              wireframe
              transparent
              ref={shapeMaterialRef}
              visible={skillsScrollProgress >= 0.66}
            />
          </Dodecahedron>
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
