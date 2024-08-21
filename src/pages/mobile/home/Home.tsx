import { Skills } from "@/components/html/mobile/home/about/skills/Skills";
import { Technologies } from "@/components/html/mobile/home/about/technologies/Technologies";
import { Contact } from "@/components/html/mobile/home/contact/Contact";
import { Header } from "@/components/html/mobile/home/header/Header";
import { WorksSection } from "@/components/html/mobile/home/works/WorksSection";
import styles from "./Home.module.css";
import { Presentation } from "@/components/html/mobile/home/about/presentation/Presentation";

export function Home() {
  // useGSAP(() => {
  //   gsap.to("#header", {
  //     scrollTrigger: {
  //       trigger: "#works",
  //       start: "top bottom",
  //       end: "top top",
  //       pin: "#header",
  //       markers: true,
  //       pinSpacing: false,
  //     },
  //   });
  // });

  return (
    <>
      <Header />
      <WorksSection />
      <main className={styles.aboutContainer} id="about">
        <Presentation />
        <Skills />
        <Technologies />
      </main>
      <Contact />
    </>
  );
}
