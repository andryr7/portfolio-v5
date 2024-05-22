import { Link, useRoute } from "wouter";
import styles from "./Home.module.css";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
          markers: true,
        },
      });
    }
    // { scope: container }
  );

  return (
    <>
      <header style={{ position: "absolute", zIndex: 20 }}>
        <div className={styles.placeholder}>Hero</div>
        <div className={styles.placeholder}>Projects</div>
      </header>
      <main style={{ position: "relative" }} id="test">
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
        }}
      >
        footer
      </footer>
    </>
  );
}
