import { MutableRefObject, useEffect, useRef } from "react";
import gsap from "gsap";
import { Canvas } from "@react-three/fiber";
import { StatsGl, View } from "@react-three/drei";
import { ReactLenis } from "lenis/react";
import { LenisRef } from "./types/lenisTypes";
import { useLoadData } from "./handlers/useLoadData";
import { useTheme } from "./handlers/useTheme";
import { useLanguage } from "./handlers/useLanguage";
import { Loader } from "./components/html/desktop/loader/Loader";
import NoiseFilter from "./components/html/desktop/noise/NoiseFilter";
import { Frame } from "./components/html/desktop/frame/Frame";
import { DesktopRouter } from "./components/html/desktop/DesktopRouter";
import "./DesktopApp.css";
import { ViewportSizeHandler } from "./handlers/ViewPortSizeHandler";

export default function DesktopApp() {
  const appContainerRef = useRef<HTMLDivElement | null>(null);
  const lenisRef = useRef<LenisRef | null>(null);
  const envMode = import.meta.env.MODE;

  //Data, theme and language handling
  const isLoading = useLoadData();
  useTheme();
  useLanguage();

  //GSAP and lenis RAF handling
  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }
    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  return (
    <ReactLenis root ref={lenisRef} autoRaf={false}>
      <div id="app-container" ref={appContainerRef}>
        <Loader />
        <Frame />
        {/* Routing */}
        {!isLoading && <DesktopRouter />}
        {/* Three js canvas */}
        <Canvas
          eventSource={appContainerRef as MutableRefObject<HTMLDivElement>}
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
          <View.Port />
          <ViewportSizeHandler />
          {envMode === "development" && <StatsGl />}
        </Canvas>
        {/* Noise filter */}
        <NoiseFilter opacity={0.25} />
      </div>
    </ReactLenis>
  );
}
