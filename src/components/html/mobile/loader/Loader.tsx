import { useGSAP } from "@gsap/react";
import styles from "./Loader.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Loader({ isLoading }: { isLoading: boolean }) {
  const lang = usePortfolioStore((state) => state.language);
  const containerRef = useRef(null);
  const cubeRef = useRef(null);
  const tl = useRef<GSAPTimeline>();

  const { contextSafe } = useGSAP(() => {
    tl.current = gsap.timeline().to(cubeRef.current, {
      rotation: 90,
      repeat: -1,
      duration: 1,
    });
  });

  const loadingEndAnimation = contextSafe(() => {
    gsap.delayedCall(1, () => {
      tl.current!.pause();
      gsap.to(containerRef.current, { opacity: 0 });
      gsap.to(cubeRef.current, { scale: 10 });
    });
  });

  useEffect(() => {
    if (isLoading === false) {
      loadingEndAnimation();
    }
  }, [isLoading, loadingEndAnimation]);

  return (
    <div className={styles.container} ref={containerRef}>
      <div className={styles.cube} ref={cubeRef} />
      <div className={styles.text}>
        {lang === "en" ? "loading" : "chargement"}
      </div>
    </div>
  );
}
