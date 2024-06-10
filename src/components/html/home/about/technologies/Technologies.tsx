import { View } from "@react-three/drei";
import styles from "./Technologies.module.css";
import { TechnologiesScene } from "@/components/canvas/home/technologies/TechnologiesScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

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

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>What I use</h3>
      <div className={styles.viewContainer}>
        <View
          className={styles.view}
          style={{ width: selectedTechCubeId === null ? "100%" : "70%" }}
        >
          <TechnologiesScene />
        </View>
        <div
          className={styles.techDetailsWrapper}
          style={{ right: selectedTechCubeId === null ? "-30%" : "0%" }}
        >
          <div className={styles.detailsContainer}>
            <h4>name</h4>
            <span>type</span>
            <p>description</p>
            <a>more info</a>
          </div>
          <button onClick={() => setSelectedTechCubeId(null)}>close</button>
        </div>
      </div>
    </div>
  );
}
