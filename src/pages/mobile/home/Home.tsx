import { Presentation } from "@/components/html/mobile/home/about/presentation/Presentation";
import { Skills } from "@/components/html/mobile/home/about/skills/Skills";
import { Technologies } from "@/components/html/mobile/home/about/technologies/Technologies";
import { Contact } from "@/components/html/mobile/home/contact/Contact";
import { Header } from "@/components/html/mobile/home/header/Header";
import { WorksSection } from "@/components/html/mobile/home/works/WorksSection";

export function Home() {
  return (
    <>
      <Header />
      <WorksSection />
      <main className="about-container" id="about">
        <Presentation />
        <Skills />
        <Technologies />
      </main>
      <Contact />
    </>
  );
}
