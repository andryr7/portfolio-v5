import { useGSAP } from "@gsap/react";
import styles from "./Legals.module.css";
import ReactLenis from "lenis/react";
import gsap from "gsap";

export function Legals() {
  useGSAP(() => {
    gsap.to(".page-container", { opacity: 1 });
  });

  return (
    <>
      <ReactLenis className={styles.pageContainer + " page-container"}>
        <div className={styles.container}>LEGALS</div>
      </ReactLenis>
    </>
  );
}
