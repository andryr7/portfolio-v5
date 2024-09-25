import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { useEffect, useMemo, useRef } from "react";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import { useAnimatedText } from "@/handlers/useAnimatedText";
import { useLenis } from "lenis/react";
import { useLocation } from "wouter";

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
  const captionText = useTranslatedText(
    "selected works",
    "projets sélectionnés"
  );
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
  const [_, setLocation] = useLocation();

  // Works scroll snap
  useLenis((instance) => {
    if (instance.__isScrolling) return;
    if (scrollProgressRef.current >= 0.1 && scrollProgressRef.current < 0.3) {
      instance.scrollTo("#firstWorkAnchor");
    }
    if (scrollProgressRef.current >= 0.3 && scrollProgressRef.current < 0.5) {
      instance.scrollTo("#secondWorkAnchor");
    }
    if (scrollProgressRef.current >= 0.5 && scrollProgressRef.current < 0.7) {
      instance.scrollTo("#thirdWorkAnchor");
    }
    if (scrollProgressRef.current >= 0.7 && scrollProgressRef.current <= 0.9) {
      instance.scrollTo("#fourthWorkAnchor");
    }
  });

  //Works cube sync
  useEffect(() => {
    if (worksScrollProgress < 0.3) {
      setHoveredWorkIndex(0);
      return;
    } else if (worksScrollProgress < 0.5) {
      setHoveredWorkIndex(1);
      return;
    } else if (worksScrollProgress < 0.7) {
      setHoveredWorkIndex(2);
      return;
    } else {
      setHoveredWorkIndex(3);
      return;
    }
  }, [worksScrollProgress, setHoveredWorkIndex]);

  const numberShift = useMemo(() => {
    const normalizedProgress = (worksScrollProgress - 0.2) / 0.6;
    const clampedProgress = Math.max(0, Math.min(1, normalizedProgress));
    return clampedProgress * 300;
  }, [worksScrollProgress]);

  const handleClick = () => setLocation(`/work/${selectedWork.slug.current}`);

  return (
    <>
      <div className={styles.container} id={id} onClick={handleClick}>
        <span className={styles.sectionTitle}>{captionText}</span>
        <div className={styles.workInfoContainer}>
          <span className={styles.workDescription}>{workDescription}</span>
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
