import { View } from "@react-three/drei";
import styles from "./Technologies.module.css";
import { TechnologiesScene } from "@/components/canvas/home/technologies/TechnologiesScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useMemo } from "react";

export function Technologies() {
  const techs = usePortfolioStore((state) =>
    state.techsData.filter((tech) => tech.showcased)
  );

  const selectedTechCubeId = usePortfolioStore(
    (state) => state.selectedTechCubeId
  );

  const setSelectedTechCubeId = usePortfolioStore(
    (state) => state.setSelectedTechCubeId
  );

  const selectedTech = useMemo(() => {
    return techs.find((tech) => tech._id === selectedTechCubeId);
  }, [techs, selectedTechCubeId]);

  if (techs.length > 0)
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>What I use</h3>
        <div className={styles.viewContainer}>
          <View
            className={styles.view}
            style={{ width: selectedTechCubeId === null ? "100%" : "75%" }}
          >
            <TechnologiesScene />
          </View>
          <div
            className={styles.techDetailsWrapper}
            style={{ right: selectedTechCubeId === null ? "-25%" : "0%" }}
          >
            <div className={styles.detailsContainer}>
              <h4>{selectedTech ? selectedTech.name : ""}</h4>
              <span>{selectedTech ? selectedTech.type : ""}</span>
              <p>{selectedTech ? selectedTech.description : ""}</p>
              {selectedTech && (
                <a
                  rel="nofollow norefererrer"
                  href={selectedTech.url}
                  target="_blank"
                >
                  more info
                </a>
              )}
            </div>
            <button onClick={() => setSelectedTechCubeId(null)}>close</button>
          </div>
        </div>
      </div>
    );
}
