import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";

export function WorksSection() {
  const worksData = usePortfolioStore((state) => state.worksData);
  const setHoveredWorkIndex = usePortfolioStore(
    (state) => state.setHoveredWorkIndex
  );

  return (
    <div className={styles.container}>
      <ul
        className={styles.worksContainer}
        onMouseLeave={() => setHoveredWorkIndex(null)}
      >
        {worksData.map((work, index) => (
          <Link
            href={`/works/${work.slug.current}`}
            className={styles.workLine}
            key={index}
            onMouseEnter={() => setHoveredWorkIndex(index)}
          >
            <h3>{work.title}</h3>
            <span>{work.caption}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
