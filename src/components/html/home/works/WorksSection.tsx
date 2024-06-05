import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";

export function WorksSection() {
  const worksData = usePortfolioStore((state) => state.worksData);
  const setHoveredWorkIndex = usePortfolioStore(
    (state) => state.setHoveredWorkIndex
  );

  return (
    <div className={styles.container}>
      <ul onMouseLeave={() => setHoveredWorkIndex(null)}>
        {worksData.map((work, index) => (
          <li key={index} onMouseEnter={() => setHoveredWorkIndex(index)}>
            {work.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
