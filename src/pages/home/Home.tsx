import { useRoute } from "wouter";
import styles from "./Home.module.css";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { useLenis } from "lenis/react";
import { HeaderScene } from "@/components/canvas/home/header/HeaderScene";
import { WorksScene } from "@/components/canvas/home/works/WorksScene";
import { ContactScene } from "@/components/canvas/home/contact/ContactScene";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
  const [match] = useRoute("/");
  const container = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useLenis((state) => {
    const newScrollProgress =
      state.animatedScroll /
      (state.dimensions.scrollHeight - 1.5 * state.dimensions.height);
    setScrollProgress(Math.min(newScrollProgress, 1));
  });

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

      gsap.to("#hero-view", {
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          end: "bottom bottom",
          pin: "#hero-view",
          // markers: true,
        },
      });

      gsap.to("#contact-view", {
        scrollTrigger: {
          trigger: "#main",
          start: "top top",
          end: "bottom bottom",
          pin: "#contact-view",
          // markers: true,
        },
      });
    }
    // { scope: container }
  );

  return (
    <>
      {/* Canvas views */}
      <View
        style={{
          position: "absolute",
          top: "0vh",
          height: "100vh",
          width: "100vw",
        }}
        id="hero-view"
        index={2}
      >
        <HeaderScene />
      </View>
      <View
        style={{
          position: "absolute",
          top: "100vh",
          height: "100vh",
          width: "100vw",
        }}
        id="works-view"
        index={4}
      >
        <WorksScene />
      </View>
      <View
        style={{
          position: "absolute",
          top: "100vh",
          height: "100vh",
          width: "100vw",
        }}
        id="contact-view"
        index={3}
      >
        <ContactScene />
      </View>

      {/* HTML Content */}
      <div
        style={{
          position: "absolute",
          zIndex: 20,
          opacity: 0.5,
          pointerEvents: "none",
        }}
        id="hero"
      >
        <header
          className={styles.placeholder}
          style={{ pointerEvents: "none" }}
        />
        <section
          className={styles.tempPlaceholder}
          id="works"
          style={{ pointerEvents: "auto" }}
        >
          Projects
        </section>
      </div>
      <div className={styles.placeholder} />
      <main style={{ position: "relative" }} id="main">
        <section className={styles.tempPlaceholder} id="about">
          About - 1 - presentation
        </section>
        <section className={styles.tempPlaceholder}>About - 2 - skills</section>
        <section className={styles.tempPlaceholder}>About - 3 - techs</section>
        <section className={styles.tempPlaceholder} id="contact">
          Contact
        </section>
      </main>
      <footer
        className={styles.tempPlaceholder}
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
