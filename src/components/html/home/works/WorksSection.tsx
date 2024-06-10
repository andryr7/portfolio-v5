import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";

export function WorksSection() {
  const worksData = usePortfolioStore((state) => state.worksData);
  const hoveredWorkIndex = usePortfolioStore((state) => state.hoveredWorkIndex);
  const setHoveredWorkIndex = usePortfolioStore(
    (state) => state.setHoveredWorkIndex
  );

  return (
    <div className={styles.container}>
      <ul
        className={styles.worksContainer}
        onMouseLeave={() => setHoveredWorkIndex(null)}
        style={hoveredWorkIndex !== null ? { borderColor: "#0e0e0e11" } : {}}
      >
        {worksData.map((work, index) => (
          <Link
            href={`/works/${work.slug.current}`}
            className={styles.workLine}
            key={index}
            onMouseEnter={() => setHoveredWorkIndex(index)}
            style={
              hoveredWorkIndex !== null
                ? hoveredWorkIndex !== index
                  ? { opacity: 0.25, borderColor: "#0e0e0e11" }
                  : { borderColor: "#0e0e0e11" }
                : {}
            }
          >
            <h3>{work.title}</h3>
            <span>{work.caption}</span>
          </Link>
        ))}
      </ul>
    </div>
  );
}
