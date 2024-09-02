import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";
import { useLenis } from "lenis/react";
import { useRef } from "react";

export function WorksSection() {
  const lenis = useLenis();
  const lang = usePortfolioStore((state) => state.language);
  const worksData = usePortfolioStore((state) => state.worksData);
  const hoveredWorkIndex = usePortfolioStore((state) => state.hoveredWorkIndex);
  const setHoveredWorkIndex = usePortfolioStore(
    (state) => state.setHoveredWorkIndex
  );
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const scrollProgressRef = useRef(worksScrollProgress);
  scrollProgressRef.current = worksScrollProgress;

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#contact");
  };

  //Works section scroll snap
  useLenis((instance) => {
    if (instance.__isScrolling === false) {
      if (
        scrollProgressRef.current > 0.33 &&
        scrollProgressRef.current < 0.66
      ) {
        lenis?.scrollTo("#works");
      }
    }
  });

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
              style={
                hoveredWorkIndex !== null
                  ? hoveredWorkIndex !== index
                    ? { opacity: 0.25, borderColor: "#0e0e0e11" }
                    : { borderColor: "#0e0e0e11" }
                  : {}
              }
            >
              <h3>{work.title}</h3>
              <span>{lang === "en" ? work?.enCaption : work?.frCaption}</span>
              {lang === "en" ? work?.enCaption : work?.frCaption}
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.contactLinkContainer}>
        <div onClick={handleContactClick}>
          {lang === "en" ? "add yours" : "ajoutez le votre"}
        </div>
      </div>
    </>
  );
}
