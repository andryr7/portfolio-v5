import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";
import { useLenis } from "lenis/react";

export function WorksSection() {
  const lenis = useLenis();
  const worksData = usePortfolioStore((state) => state.worksData);
  const hoveredWorkIndex = usePortfolioStore((state) => state.hoveredWorkIndex);
  const setHoveredWorkIndex = usePortfolioStore(
    (state) => state.setHoveredWorkIndex
  );

  const handleClick = () => {
    // lenis?.scrollTo(0);
    setHoveredWorkIndex(null);
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#contact");
  };

  return (
    <>
      <div className={styles.container}>
        <ul
          className={styles.worksContainer}
          onMouseLeave={() => setHoveredWorkIndex(null)}
          style={hoveredWorkIndex !== null ? { borderColor: "#0e0e0e11" } : {}}
        >
          {worksData.map((work, index) => (
            <Link
              href={`/work/${work.slug.current}`}
              className={styles.workLine}
              key={index}
              onMouseEnter={() => setHoveredWorkIndex(index)}
              onClick={handleClick}
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
      <div className={styles.contactLinkContainer}>
        <div onClick={handleContactClick}>add yours</div>
      </div>
    </>
  );
}
