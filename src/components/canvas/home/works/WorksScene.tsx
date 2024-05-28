import { useColors } from "@/handlers/useColors";
import {
  Box,
  MeshTransmissionMaterial,
  PresentationControls,
  RoundedBox,
} from "@react-three/drei";
import { ProjectCubeFace } from "./ProjectCubeFace";
import { useEffect, useMemo, useRef } from "react";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

export function WorksScene() {
  const colors = useColors();
  const { hoveredWorkId, works } = usePortfolioStore((state) => ({
    hoveredWorkId: state.hoveredWorkId,
    works: state.worksData,
  }));
  const cubeGroupRef = useRef<Group>(null);
  const transmissionMaterialRef = useRef<any>(null);
  const projectHighlight = hoveredWorkId !== null;
  const hoveredWork = useMemo(
    () => works.find((work) => work.slug.current === hoveredWorkId) || null,
    [hoveredWorkId, works]
  );
  const cubeRotationY = hoveredWork ? hoveredWork.order - 1 : 0;

  //Resetting chromatic aberration on project change
  useEffect(() => {
    if (transmissionMaterialRef !== null) {
      transmissionMaterialRef.current.chromaticAberration = 1;
      transmissionMaterialRef.current.roughness = 0.5;
    }
  }, [hoveredWorkId]);

  useFrame((_, delta) => {
    // Cube scale animation
    if (cubeGroupRef.current !== null) {
      easing.damp3(
        cubeGroupRef.current.scale,
        projectHighlight ? [1.25, 1.25, 1.25] : [1, 1, 1],
        0.15,
        delta
      );
    }

    // Cube transmission material animation
    if (transmissionMaterialRef !== null) {
      //Chromatic aberration
      easing.damp(
        transmissionMaterialRef.current,
        "chromaticAberration",
        projectHighlight ? 0 : 1,
        0.5,
        delta
      );

      //Roughness
      easing.damp(
        transmissionMaterialRef.current,
        "roughness",
        projectHighlight ? 0.1 : 0.5,
        0.5,
        delta
      );
    }
  });

  return (
    <>
      <PresentationControls
        snap
        rotation={[
          projectHighlight ? 0 : Math.PI / 2,
          cubeRotationY * (-Math.PI / 2),
          0,
        ]}
        speed={5}
        config={{ mass: 1, tension: 100, friction: 26 }}
      >
        <group ref={cubeGroupRef}>
          <mesh>
            <RoundedBox args={[1.05, 1.05, 1.05]}>
              <MeshTransmissionMaterial
                ref={transmissionMaterialRef}
                thickness={0.05}
                anisotropicBlur={0.1}
                samples={4}
                roughness={0.1}
                resolution={2048}
                chromaticAberration={0.5}
              />
            </RoundedBox>
          </mesh>
          <mesh>
            <Box>
              {/* Cube top face */}
              <meshBasicMaterial
                attach={"material-2"}
                color={colors.backgroundOne}
              />
              {/* Cube project faces */}
              {works.map((work, index) => (
                <ProjectCubeFace
                  key={work.slug.current}
                  index={index}
                  highlighted={hoveredWorkId === work.slug.current}
                  work={work}
                />
              ))}
            </Box>
          </mesh>
        </group>
      </PresentationControls>
      <color args={["#a9a9a9"]} attach="background" />
    </>
  );
}
