import { TechnologiesScene } from "@/components/canvas/desktop/technologies/TechnologiesScene";
import styles from "./Technologies.module.css";
import { PerspectiveCamera, View } from "@react-three/drei";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useMemo } from "react";

export function Technologies() {
  const selectedTechCubeId = usePortfolioStore(
    (state) => state.selectedTechCubeId
  );
  const setSelectedTechCubeId = usePortfolioStore(
    (state) => state.setSelectedTechCubeId
  );
  const techs = usePortfolioStore((state) => state.techsData);
  const lang = usePortfolioStore((state) => state.language);

  const selectedTech = useMemo(() => {
    return techs.find((tech) => tech._id === selectedTechCubeId);
  }, [techs, selectedTechCubeId]);

  return (
    <div className={styles.container}>
      <span className={styles.sectionTitle}>Technologies</span>
      <View className={styles.viewContainer}>
        <PerspectiveCamera
          makeDefault
          position={[0, 0, 5]}
          fov={10}
          zoom={0.75}
        />
        <TechnologiesScene />
      </View>
      <div
        className={styles.techDetailsContainer}
        style={{
          transform: selectedTechCubeId
            ? "translateY(0%)"
            : "translateY(-100%)",
          opacity: selectedTechCubeId ? 1 : 0,
          pointerEvents: selectedTechCubeId ? "all" : "none",
        }}
      >
        <h4>{selectedTech ? selectedTech.name : ""}</h4>
        <span>
          {selectedTech
            ? lang === "en"
              ? selectedTech.enType
              : selectedTech.frType
            : ""}
        </span>
        <p>
          {selectedTech
            ? lang === "en"
              ? selectedTech.enDescription
              : selectedTech.frDescription
            : ""}
        </p>
        {selectedTech && (
          <a
            rel="nofollow norefererrer"
            href={selectedTech.url}
            target="_blank"
          >
            more info
          </a>
        )}
        <button onClick={() => setSelectedTechCubeId(null)}>close</button>
      </div>
    </div>
  );
}
