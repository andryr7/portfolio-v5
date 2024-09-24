import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { Link } from "wouter";
import { useLenis } from "lenis/react";
import { useRef } from "react";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import { Work } from "@/types/work";

function WorkLine({
  work,
  index,
  hoveredWorkIndex,
  setHoveredWorkIndex,
}: {
  work: Work;
  index: number;
  hoveredWorkIndex: number | null;
  setHoveredWorkIndex: any;
}) {
  const captionText = useTranslatedText(work?.enCaption, work?.frCaption);

  return (
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
      <span>{captionText}</span>
    </Link>
  );
}

export function WorksSection({ id }: { id: string }) {
  const lenis = useLenis();
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
  const captionText = useTranslatedText("add yours", "ajoutez le votre");

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#contact");
  };

  console.log(worksScrollProgress);

  //Works section scroll snap
  // useLenis((instance) => {
  //   if (instance.__isScrolling === false) {
  //     if (
  //       scrollProgressRef.current > 0.33 &&
  //       scrollProgressRef.current < 0.66
  //     ) {
  //       lenis?.scrollTo("#works");
  //     }
  //   }
  // });

  return (
    <>
      <div className={styles.container} id={id}>
        {/* <ul
          className={styles.worksContainer}
          onMouseLeave={() => setHoveredWorkIndex(null)}
          style={hoveredWorkIndex !== null ? { borderColor: "#0e0e0e11" } : {}}
        >
          {worksData.map((work, index) => (
            <WorkLine
              key={index}
              work={work}
              index={index}
              hoveredWorkIndex={hoveredWorkIndex}
              setHoveredWorkIndex={setHoveredWorkIndex}
            />
          ))}
        </ul> */}
      </div>
    </>
  );
}
