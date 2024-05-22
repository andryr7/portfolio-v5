import { Link, useRoute } from "wouter";
import styles from "./Home.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MainView } from "@/components/canvas/main/MainView";
import { OverlayScene } from "@/components/canvas/main/OverlayScene";
import { View } from "@react-three/drei";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
  const [match] = useRoute("/");
  const container = useRef(null);

  useGSAP(
    () => {
      // gsap code here...
      gsap.to("#about", {
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: "bottom top",
          pin: "#about",
          // markers: true,
        },
      });

      gsap.to("#main-canvas", {
        scrollTrigger: {
          trigger: "#main",
          start: "top bottom",
          end: "bottom bottom",
          pin: "#main-canvas",
          // markers: true,
        },
      });
    }
    // { scope: container }
  );

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: "-100vh",
          height: "100vh",
          width: "100vw",
        }}
        id="main-canvas"
      >
        <OverlayScene />
      </View>
      <header style={{ position: "absolute", zIndex: 20, opacity: 0.5 }}>
        <div className={styles.placeholder}>Hero</div>
        <div className={styles.placeholder} id="works">
          Projects
        </div>
      </header>
      <main style={{ position: "relative" }} id="main">
        <section className={styles.placeholder}>spacer - invisible</section>
        <section className={styles.placeholder} id="about">
          About - 1 - presentation
        </section>
        <section className={styles.placeholder}>About - 2 - skills</section>
        <section className={styles.placeholder}>About - 3 - techs</section>
        <section className={styles.placeholder} id="contact">
          Contact
        </section>
      </main>
      <footer
        className={styles.placeholder}
        style={{
          position: "relative",
          zIndex: 40,
          height: "50vh",
          backgroundColor: "var(--color-main)",
          border: "none",
        }}
      >
        footer
      </footer>
    </>
  );
}
