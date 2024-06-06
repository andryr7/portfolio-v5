import styles from "./Home.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { HeaderScene } from "@/components/canvas/home/header/HeaderScene";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { WorksSection } from "@/components/html/home/works/WorksSection";
import { Footer } from "@/components/html/home/footer/Footer";
import { ContactSection } from "@/components/html/home/contact/ContactSection";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
  const { setWorksScrollProgress, setContactScrollProgress } =
    usePortfolioStore((state) => ({
      setWorksScrollProgress: state.setWorksScrollProgress,
      setContactScrollProgress: state.setContactScrollProgress,
    }));

  useGSAP(
    () => {
      //Main view pin animation
      gsap.to("#overlay-view", {
        scrollTrigger: {
          trigger: "#hero",
          endTrigger: "#contact",
          start: "top top",
          end: "bottom top",
          pin: "#overlay-view",
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
          },
          // markers: true,
        },
      });
    }
    // { scope: container }
  );

  return (
    <>
      {/* Canvas content */}
      <View id="overlay-view" className={styles.overlayView} index={2}>
        <HeaderScene />
      </View>

      {/* HTML Content */}
      <div className={styles.heroContainer} id="hero">
        <header
          className={styles.heroSectionContainer}
          style={{ pointerEvents: "none" }}
          id="hero"
        />
        <section className={styles.heroSectionContainer} id="works">
          <WorksSection />
        </section>
      </div>
      <main className={styles.mainContainer} id="main">
        <section className={styles.sectionContainer} id="about">
          About - 1 - presentation
        </section>
        <section className={styles.sectionContainer}>
          About - 2 - skills
        </section>
        <section className={styles.sectionContainer}>About - 3 - techs</section>
        <section className={styles.sectionContainer} id="contact">
          <ContactSection />
        </section>
      </main>
      <footer className={styles.footerContainer}>
        <Footer />
      </footer>
    </>
  );
}
