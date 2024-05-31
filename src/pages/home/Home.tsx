import styles from "./Home.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { HeaderScene } from "@/components/canvas/home/header/HeaderScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
  const setWorksScrollProgress = usePortfolioStore(
    (state) => state.setWorksScrollProgress
  );

  const setWorksSceneIsActive = usePortfolioStore(
    (state) => state.setWorksSceneIsActive
  );

  const setContactScrollProgress = usePortfolioStore(
    (state) => state.setContactScrollProgress
  );

  const setContactSceneIsActive = usePortfolioStore(
    (state) => state.setContactSceneIsActive
  );

  useGSAP(
    () => {
      //Main view pin animation
      gsap.to("#hero-view", {
        scrollTrigger: {
          trigger: "#hero",
          endTrigger: "#contact",
          start: "top top",
          end: "bottom top",
          pin: "#hero-view",
          // markers: true,
        },
      });

      //About underlying page pin animation
      gsap.to("#about", {
        scrollTrigger: {
          trigger: "#about",
          start: "top top",
          end: "bottom top",
          pin: "#about",
          // markers: true,
        },
      });

      //Works section scroll handling
      gsap.to("#works", {
        scrollTrigger: {
          trigger: "#works",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            setWorksScrollProgress(self.progress);
            setWorksSceneIsActive(
              self.progress >= 0.25 && self.progress <= 0.75
            );
          },
          // markers: true,
        },
      });

      //Contact section scroll handling
      gsap.to("#contact", {
        scrollTrigger: {
          trigger: "#contact",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            setContactScrollProgress(self.progress);
            setContactSceneIsActive(self.progress >= 0.25);
          },
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
          top: 0,
          height: "100vh",
          width: "100vw",
        }}
        id="hero-view"
        index={2}
      >
        <HeaderScene />
      </View>

      {/* HTML Content */}
      <div
        style={{
          position: "absolute",
          top: 0,
          zIndex: 20,
          pointerEvents: "none",
        }}
        id="hero"
      >
        <header
          className={styles.placeholder}
          style={{ pointerEvents: "none" }}
          id="hero"
        />
        <section
          className={styles.placeholder}
          id="works"
          style={{
            pointerEvents: "auto",
            display: "flex",
            fontSize: "2rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Projects
        </section>
      </div>
      <div className={styles.placeholder} />
      <main className={styles.main} id="main">
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
