import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { Box } from "@react-three/drei";
import { ProjectCubeFace } from "./ProjectCubeFace";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { easing } from "maath";

export function WorksCube() {
  const topFaceRef = useRef(null);
  const bottomFaceRef = useRef(null);
  const { worksScrollProgress, worksData, hoveredWorkIndex } =
    usePortfolioStore((state) => ({
      worksScrollProgress: state.worksScrollProgress,
      worksData: state.worksData,
      hoveredWorkIndex: state.hoveredWorkIndex,
    }));

  const worksSceneIsActive = useMemo(() => {
    return worksScrollProgress >= 0.25 && worksScrollProgress <= 0.75;
  }, [worksScrollProgress]);

  useFrame((_, delta) => {
    if (topFaceRef.current !== null) {
      easing.damp(
        topFaceRef.current,
        "opacity",
        worksSceneIsActive ? 1 : 0,
        0.25,
        delta / 2
      );
    }

    if (bottomFaceRef.current !== null) {
      easing.damp(
        bottomFaceRef.current,
        "opacity",
        worksSceneIsActive ? 1 : 0,
        0.25,
        delta / 2
      );
    }
  });

  return (
    <mesh
      scale={0.96}
      visible={worksScrollProgress < 1}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <Box>
        {/* Cube top face */}
        <meshBasicMaterial
          attach={"material-2"}
          color="#e9e9e9"
          transparent
          ref={topFaceRef}
        />
        {/* Cube project faces */}
        {worksData.map((work, index) => (
          <ProjectCubeFace
            key={work.slug.current}
            index={index}
            highlighted={hoveredWorkIndex === index}
            work={work}
            opacity={worksSceneIsActive ? 1 : 0}
          />
        ))}
        <meshBasicMaterial
          attach={"material-3"}
          color="#e9e9e9"
          transparent
          ref={bottomFaceRef}
        />
      </Box>
    </mesh>
  );
}
