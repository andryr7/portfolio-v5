import styles from "./Home.module.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { View } from "@react-three/drei";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { WorksSection } from "@/components/html/desktop/home/works/WorksSection";
import { ContactSection } from "@/components/html/desktop/home/contact/ContactSection";
import { Technologies } from "@/components/html/desktop/home/about/technologies/Technologies";
import { useShallow } from "zustand/react/shallow";
import { Skills } from "@/components/html/desktop/home/about/skills/Skills";
import { Header } from "@/components/html/desktop/home/header/Header";
import { Footer } from "@/components/html/desktop/footer/Footer";
import { HeaderScene } from "@/components/canvas/desktop/header/HeaderScene";
import { Presentation } from "@/components/html/desktop/home/about/presentation/Presentation";
import { useTranslatedText } from "@/handlers/useTranslatedText";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Home() {
  const {
    setWorksScrollProgress,
    setAboutScrollProgress,
    setSkillsScrollProgress,
    setContactScrollProgress,
  } = usePortfolioStore(
    useShallow((state) => ({
      setWorksScrollProgress: state.setWorksScrollProgress,
      setAboutScrollProgress: state.setAboutScrollProgress,
      setSkillsScrollProgress: state.setSkillsScrollProgress,
      setContactScrollProgress: state.setContactScrollProgress,
    }))
  );
  const aboutTitleText = useTranslatedText("about", "à propos");

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

      //Works section scroll progress update
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

      //Work section container pin
      gsap.to("#works-container", {
        scrollTrigger: {
          trigger: "#works",
          start: "top top",
          end: "bottom bottom",
          pin: "#works-container",
          markers: true,
        },
      });

      //Contact section scroll progress update
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

      //About section scroll progress update
      gsap.to("#about-skills", {
        scrollTrigger: {
          trigger: "#about-skills",
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

      //About underlying page pin animation
      gsap.to("#skills-pinned", {
        scrollTrigger: {
          trigger: "#about-skills",
          start: "top top",
          end: "bottom bottom",
          pin: "#skills-pinned",
          onUpdate: (self) => {
            setSkillsScrollProgress(self.progress);
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
      <div>
        <div className={styles.heroContainer} id="hero">
          <header
            className={styles.heroSectionContainer}
            style={{ pointerEvents: "none" }}
            id="hero"
          >
            <Header />
          </header>
          <section className={styles.worksSectionContainer} id="works">
            <WorksSection id="works-container" />
          </section>
        </div>
        <a id={"aboutanchor"} className={styles.aboutAnchor} />
        <main className={styles.mainContainer} id="main">
          <section style={{ position: "relative", zIndex: 1 }}>
            <article className={styles.sectionContainer} id="about">
              <Presentation />
            </article>
            <article
              className={styles.skillsSectionContainer}
              id="about-skills"
            >
              <Skills />
            </article>
            <article className={styles.sectionContainer}>
              <Technologies />
            </article>
          </section>
          <div className={styles.aboutTitle} id="about-title">
            {aboutTitleText}
            <span>a</span>
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
