import { useGSAP } from "@gsap/react";
import styles from "./Loader.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Loader({ isLoading }: { isLoading: boolean }) {
  const containerRef = useRef(null);
  const cubeRef = useRef(null);
  const tl = useRef<any>();

  const { contextSafe } = useGSAP(() => {
    tl.current = gsap.timeline().to(cubeRef.current, {
      rotation: 90,
      repeat: -1,
      duration: 1,
    });
  });

  const loadingEndAnimation = contextSafe(() => {
    gsap.delayedCall(2, () => {
      tl.current.pause();
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
    </div>
  );
}
