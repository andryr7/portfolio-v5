import { Physics } from "@react-three/rapier";
import { useEffect } from "react";
import { TechnologyCube } from "./TechnologyCube";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function TechnologiesPhysicalScene() {
  const techs = usePortfolioStore((state) =>
    state.techsData.filter((tech) => tech.showcased === true)
  );

  //Handling cube dragging state
  const setDraggedTechCubeId = usePortfolioStore(
    (state) => state.setDraggedTechCubeId
  );

  //Handling mouse drops
  useEffect(() => {
    document.addEventListener("mouseup", () => setDraggedTechCubeId(null));
    return document.removeEventListener("mouseup", () =>
      setDraggedTechCubeId(null)
    );
  });

  return (
    <>
      <Physics gravity={[0, 0, 0]}>
        <group>
          {techs.map((tech, index) => (
            <TechnologyCube
              key={tech._id}
              position={[index * 2, index * 1, index * 0.5]}
              tech={tech}
            />
          ))}
        </group>
      </Physics>
    </>
  );
}
