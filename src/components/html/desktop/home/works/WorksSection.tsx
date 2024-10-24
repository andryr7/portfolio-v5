import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import styles from "./WorksSection.module.css";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useTranslatedText } from "@/handlers/useTranslatedText";
import { useAnimatedText } from "@/handlers/useAnimatedText";
import { useLenis } from "lenis/react";
import { useLocation } from "wouter";

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
  const [, setLocation] = useLocation();
  const scrollProgressIndicatorValue =
    100 -
    ((Math.max(0.2, Math.min(0.8, worksScrollProgress)) - 0.2) / 0.6) * 100;

  const handleWorkClick = useCallback(() => {
    setLocation(`/work/${selectedWork.slug.current}`);
  }, [selectedWork.slug, setLocation]);

  const handlePreviousWorkClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      switch (hoveredWorkIndex) {
        case 1:
          lenis?.scrollTo("#firstWorkAnchor");
          break;
        case 2:
          lenis?.scrollTo("#secondWorkAnchor");
          break;
        case 3:
          lenis?.scrollTo("#thirdWorkAnchor");
          break;
        default:
          break;
      }
    },
    [hoveredWorkIndex, lenis]
  );

  const handleNextWorkClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      switch (hoveredWorkIndex) {
        case 0:
          lenis?.scrollTo("#secondWorkAnchor");
          break;
        case 1:
          lenis?.scrollTo("#thirdWorkAnchor");
          break;
        case 2:
          lenis?.scrollTo("#fourthWorkAnchor");
          break;
        default:
          break;
      }
    },
    [hoveredWorkIndex, lenis]
  );

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

  const numberShift =
    Math.max(0, Math.min(1, (worksScrollProgress - 0.2) / 0.6)) * 300;

  return (
    <>
      <div className={styles.container} id={id} onClick={handleWorkClick}>
        <span className={styles.sectionTitle}>
          {captionText}
          <span
            className={styles.sectionScrollIndicator}
            style={{
              clipPath: `inset(0 ${scrollProgressIndicatorValue}% 0 0)`,
            }}
          >
            {captionText}
          </span>
        </span>
        <div className={styles.workInfoContainer}>
          <span className={styles.workDescription}>{workDescription}</span>
          <span
            className={styles.workNumberContainer}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.workArrowContainer}>
              <div
                onClick={handlePreviousWorkClick}
                style={{ opacity: hoveredWorkIndex === 0 ? 0.5 : 1 }}
              >
                {"<-"}
              </div>
              <div
                onClick={handleNextWorkClick}
                style={{ opacity: hoveredWorkIndex === 3 ? 0.5 : 1 }}
              >
                {"->"}
              </div>
            </div>
            00
            <div
              style={{
                position: "relative",
                overflow: "hidden",
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
        <h3 className={styles.workTitle}>{workTitle}</h3>
      </div>
    </>
  );
}
