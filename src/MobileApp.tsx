import { Canvas } from "@react-three/fiber";
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
import { useRef } from "react";
import { StatsGl, View } from "@react-three/drei";

export default function MobileApp() {
  const appContainerRef = useRef<any>(null);
  const isLoading = useLoadData();

  //Theme handling
  useTheme();

  return (
    <>
      <Loader isLoading={isLoading} />
      <Frame />
      {!isLoading && (
        <div className="mobile-app-container" ref={appContainerRef}>
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
      <Canvas
        eventSource={appContainerRef}
        eventPrefix="offset"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        <StatsGl />
        <View.Port />
      </Canvas>
    </>
  );
}
