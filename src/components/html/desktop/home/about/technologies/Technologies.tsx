import { PerspectiveCamera, View } from "@react-three/drei";
import styles from "./Technologies.module.css";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useMemo } from "react";
import { TechnologiesScene } from "@/components/canvas/desktop/technologies/TechnologiesScene";

export function Technologies() {
  const selectedTechCubeId = usePortfolioStore(
    (state) => state.selectedTechCubeId
  );
  const setSelectedTechCubeId = usePortfolioStore(
    (state) => state.setSelectedTechCubeId
  );
  const techs = usePortfolioStore((state) => state.techsData);

  const selectedTech = useMemo(() => {
    return techs.find((tech) => tech._id === selectedTechCubeId);
  }, [techs, selectedTechCubeId]);

  if (techs.length > 0)
    return (
      <div className={styles.container}>
        <h3 className={styles.title}>Technologies</h3>
        <div className={styles.viewContainer}>
          <View
            className={styles.view}
            style={{ width: selectedTechCubeId === null ? "100%" : "75%" }}
          >
            <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={10} />
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
            <button
              onClick={() => setSelectedTechCubeId(null)}
              style={{
                transition: "transform var(--transition-normal)",
                transform: selectedTechCubeId
                  ? "translateY(0%)"
                  : "translateY(100%)",
              }}
            >
              close
            </button>
          </div>
        </div>
        <span className={styles.tips}>
          some technologies I use - select or drag
        </span>
      </div>
    );
}
