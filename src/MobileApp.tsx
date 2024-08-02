import { Frame } from "./components/html/mobile/frame/Frame";
import { Presentation } from "./components/html/mobile/home/about/presentation/Presentation";
import { Skills } from "./components/html/mobile/home/about/skills/Skills";
import { Technologies } from "./components/html/mobile/home/about/technologies/Technologies";
import { Header } from "./components/html/mobile/home/header/Header";
import { WorksSection } from "./components/html/mobile/home/works/WorksSection";
import { Loader } from "./components/html/mobile/loader/Loader";
import { useLoadData } from "./handlers/useLoadData";
import { useTheme } from "./handlers/useTheme";
import "./MobileApp.css";

export default function MobileApp() {
  const isLoading = useLoadData();

  //Theme handling
  useTheme();

  return (
    <>
      <Loader isLoading={isLoading} />
      <Frame />
      {!isLoading && (
        <div className="mobile-app-container">
          <Header />
          <WorksSection />
          <main className="about-container" id="about">
            <Presentation />
            <Skills />
            <Technologies />
          </main>
          <footer className="page" style={{ backgroundColor: "purple" }}>
            footer
          </footer>
        </div>
      )}
    </>
  );
}
