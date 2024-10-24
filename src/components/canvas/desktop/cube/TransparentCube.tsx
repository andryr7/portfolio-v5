import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { MeshTransmissionMaterialType } from "@/types/canvasTypes";
import { MeshTransmissionMaterial, RoundedBox } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";
import { useEffect, useRef } from "react";

export function TransparentCube() {
  const materialRef = useRef<MeshTransmissionMaterialType | null>(null);

  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const hoveredWorkIndex = usePortfolioStore((state) => state.hoveredWorkIndex);
  const worksSceneIsActive =
    worksScrollProgress >= 0.1 && worksScrollProgress <= 0.9;

  useEffect(() => {
    if (hoveredWorkIndex !== null && materialRef.current !== null) {
      materialRef.current.chromaticAberration = 1;
    }
  }, [hoveredWorkIndex]);

  useFrame((_, delta) => {
    //3d cube material opacity animation
    if (materialRef.current !== null) {
      easing.damp(
        materialRef.current,
        "opacity",
        !worksSceneIsActive && worksScrollProgress > 0.5 ? 0 : 1,
        0.25,
        delta
      );
    }

    //3d cube material chromatic aberration animation
    if (materialRef.current !== null) {
      easing.damp(
        materialRef.current,
        "chromaticAberration",
        worksSceneIsActive && hoveredWorkIndex !== null ? 0 : 1,
        0.25,
        delta / 2
      );
    }
  });

  return (
    <mesh visible={worksScrollProgress < 1}>
      <RoundedBox>
        <MeshTransmissionMaterial
          thickness={worksSceneIsActive ? 0.05 : 0.2}
          anisotropicBlur={0.1}
          chromaticAberration={1}
          samples={4}
          resolution={2048}
          backside={!worksSceneIsActive}
          transparent
          ref={materialRef}
        />
      </RoundedBox>
    </mesh>
  );
}
