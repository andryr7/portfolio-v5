import { extend, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { easing } from "maath";
import { useTexture } from "@react-three/drei";
import { Work } from "@/types/work";
import { ProjectShaderMaterial } from "./ProjectShaderMaterial";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

extend({ ProjectShaderMaterial });

interface ProjectCubeFaceProps {
  index: number;
  highlighted: boolean;
  work: Work;
}

export function ProjectCubeFace({
  index,
  highlighted,
  work,
}: ProjectCubeFaceProps) {
  const colors = usePortfolioStore((state) => state.colors);
  const ref = useRef<any>(null);
  const texture = useTexture("/images/works/" + work.previewImagePath);

  const attach = useMemo(() => {
    if (index === 0) return "material-4";
    if (index === 1) return "material-0";
    if (index === 2) return "material-5";
    if (index === 3) return "material-1";
  }, [index]);

  useFrame((_, delta) => {
    //Colorize on project hover effect
    if (ref.current !== null) {
      easing.damp(
        ref.current,
        "colorizeFactor",
        highlighted ? 1 : 0,
        0.25,
        delta
      );
    }
  });

  return (
    <>
      <projectShaderMaterial
        attach={attach}
        key={ProjectShaderMaterial.key}
        map={texture}
        baseColor={colors.main}
        ref={ref}
      />
    </>
  );
}
