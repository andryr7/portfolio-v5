import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { Work } from "@/types/work";
import { useFrame } from "@react-three/fiber";
import { easing } from "maath";

interface ProjectCubeFaceProps {
  index: number;
  highlighted: boolean;
  work: Work;
  opacity: number;
}

export function ProjectCubeFace({
  index,
  work,
  opacity,
}: ProjectCubeFaceProps) {
  const ref = useRef(null);
  const texture = useTexture("/images/works/" + work.previewImagePath);
  const attach = useMemo(() => {
    if (index === 0) return "material-4";
    if (index === 1) return "material-0";
    if (index === 2) return "material-5";
    if (index === 3) return "material-1";
  }, [index]);

  useFrame((_, delta) => {
    if (ref.current !== null) {
      easing.damp(ref.current, "opacity", opacity, 0.25, delta / 2);
    }
  });

  return (
    <>
      <meshBasicMaterial attach={attach} map={texture} ref={ref} transparent />
    </>
  );
}
