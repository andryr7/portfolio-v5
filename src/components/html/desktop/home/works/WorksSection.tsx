import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { useEffect, useMemo, useRef } from "react";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import { useAnimatedText } from "@/handlers/useAnimatedText";

export function WorksSection({ id }: { id: string }) {
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
  const captionText = useTranslatedText("works", "projets");
  const selectedWork = useMemo(() => {
    return hoveredWorkIndex === null
      ? worksData[0]
      : worksData[hoveredWorkIndex];
  }, [hoveredWorkIndex, worksData]);
  const [workTitle] = useAnimatedText(selectedWork.title);
  const workDescription = useTranslatedText(
    selectedWork.enCaption,
    selectedWork.frCaption
  );

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

  useEffect(() => {
    if (worksScrollProgress < 0.35) {
      setHoveredWorkIndex(0);
      return;
    } else if (worksScrollProgress < 0.5) {
      setHoveredWorkIndex(1);
      return;
    } else if (worksScrollProgress < 0.65) {
      setHoveredWorkIndex(2);
      return;
    } else {
      setHoveredWorkIndex(3);
      return;
    }
  }, [worksScrollProgress, setHoveredWorkIndex]);

  const numberShift = useMemo(() => {
    const normalizedProgress = (worksScrollProgress - 0.3) / 0.4;
    const clampedProgress = Math.max(0, Math.min(1, normalizedProgress));
    return clampedProgress * 300;
  }, [worksScrollProgress]);

  //TODO add scroll snap

  return (
    <>
      <div className={styles.container} id={id}>
        <span className={styles.sectionTitle}>{captionText}</span>
        <div className={styles.workInfoContainer}>
          <span>{workDescription}</span>
          <span className={styles.workNumberContainer}>
            00
            <div
              style={{
                position: "relative",
              }}
            >
              &nbsp;
              <div
                className={styles.workNumber}
                style={{ top: `-${numberShift}%` }}
              >
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
              </div>
            </div>
            /004
          </span>
        </div>
        <span className={styles.workTitle}>{workTitle}</span>
      </div>
    </>
  );
}
