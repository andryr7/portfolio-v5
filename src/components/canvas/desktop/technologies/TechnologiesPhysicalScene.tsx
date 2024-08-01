import { useEffect, useMemo } from "react";
import { TechnologyCube } from "./TechnologyCube";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function TechnologiesPhysicalScene() {
  const setDraggedTechCubeId = usePortfolioStore(
    (state) => state.setDraggedTechCubeId
  );
  const techs = usePortfolioStore((state) => state.techsData);
  const showcasedTechs = useMemo(
    () => techs.filter((tech) => tech.showcased),
    [techs]
  );

  //Handling mouse drops
  useEffect(() => {
    document.addEventListener("mouseup", () => setDraggedTechCubeId(null));
    return document.removeEventListener("mouseup", () =>
      setDraggedTechCubeId(null)
    );
  }, [setDraggedTechCubeId]);

  return (
    <>
      <group>
        {showcasedTechs.map((tech, index) => (
          <TechnologyCube
            key={tech._id}
            position={[index, index % 2, index / 2]}
            tech={tech}
          />
        ))}
      </group>
    </>
  );
}
