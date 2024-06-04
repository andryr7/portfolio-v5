import { useMemo, useRef } from "react";
import { useTexture } from "@react-three/drei";
import { Work } from "@/types/work";
interface ProjectCubeFaceProps {
  index: number;
  highlighted: boolean;
  work: Work;
}

export function ProjectCubeFace({ index, work }: ProjectCubeFaceProps) {
  const ref = useRef<any>(null);
  const texture = useTexture("/images/works/" + work.previewImagePath);

  const attach = useMemo(() => {
    if (index === 0) return "material-4";
    if (index === 1) return "material-0";
    if (index === 2) return "material-5";
    if (index === 3) return "material-1";
  }, [index]);

  return (
    <>
      <meshBasicMaterial attach={attach} map={texture} ref={ref} />
    </>
  );
}
