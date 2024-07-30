import { useGSAP } from "@gsap/react";
import styles from "./Error.module.css";
import ReactLenis from "lenis/react";
import gsap from "gsap";

export function Error() {
  useGSAP(() => {
    gsap.to(".page-container", { opacity: 1 });
  });

  return (
    <>
      <ReactLenis className={styles.pageContainer + " page-container"}>
        <div className={styles.container}>
          404: this page does not exist (yet)
        </div>
      </ReactLenis>
    </>
  );
}
