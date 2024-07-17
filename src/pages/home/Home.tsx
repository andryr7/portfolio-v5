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
import { Presentation } from "@/components/html/home/about/presentation/Presentation";
import { Technologies } from "@/components/html/home/about/technologies/Technologies";
import { useShallow } from "zustand/react/shallow";
import { Skills } from "@/components/html/home/about/skills/Skills";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
  const {
    setWorksScrollProgress,
    setAboutScrollProgress,
    setContactScrollProgress,
  } = usePortfolioStore(
    useShallow((state) => ({
      setWorksScrollProgress: state.setWorksScrollProgress,
      setAboutScrollProgress: state.setAboutScrollProgress,
      setContactScrollProgress: state.setContactScrollProgress,
    }))
  );

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

      //About section scroll handling
      gsap.to("#aboutCenter", {
        scrollTrigger: {
          trigger: "#aboutCenter",
          start: "top bottom",
          end: "bottom top",
          onUpdate: (self) => {
            setAboutScrollProgress(self.progress);
          },
        },
      });

      //About section title
      gsap.to("#about-title", {
        scrollTrigger: {
          trigger: "#main",
          endTrigger: "#contact",
          start: "top top",
          end: "top bottom",
          pin: "#about-title",
          // markers: true,
        },
      });

      //About section title
      gsap.to("#about-title", {
        opacity: 0,
        scrollTrigger: {
          trigger: "#about-title",
          start: "center center",
          end: "top bottom",
          scrub: true,
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
      <div>
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
        <a id={"aboutanchor"} className={styles.aboutAnchor} />
        <main className={styles.mainContainer} id="main">
          <section style={{ position: "relative" }}>
            <article className={styles.sectionContainer} id="about">
              <Presentation />
            </article>
            <article className={styles.sectionContainer} id="aboutCenter">
              <Skills />
            </article>
            <article className={styles.sectionContainer}>
              <Technologies />
            </article>
          </section>
          <div className={styles.aboutTitle} id="about-title">
            about
          </div>
          <section className={styles.sectionContainer} id="contact">
            <ContactSection />
          </section>
        </main>
        <footer className={styles.footerContainer}>
          <Footer />
        </footer>
      </div>
    </>
  );
}
