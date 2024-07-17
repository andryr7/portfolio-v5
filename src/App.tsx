import { Home } from "./pages/home/Home";
import { useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { StatsGl, View } from "@react-three/drei";
import { ReactLenis } from "lenis/react";
import { useLoadData } from "./handlers/useLoadData";
import "./App.css";
import { Route, Switch } from "wouter";
import { Work } from "./pages/work/Work";
import { Frame } from "./components/html/frame/Frame";
import { useTheme } from "./handlers/useTheme";
import NoiseFilter from "./components/html/noise/NoiseFilter";
import { ViewportSizeHandler } from "./handlers/viewportSizeHandler";
import gsap from "gsap";
import { AppRouter } from "./AppRouter";

export default function App() {
  const envMode = import.meta.env.MODE;
  const appContainerRef = useRef<any>(null);
  const lenisRef = useRef<any>(null);
  const isLoading = useLoadData();
  useTheme();

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
    <ReactLenis
      root
      ref={lenisRef}
      autoRaf={false}
      options={{ prevent: (node) => node.id === "work-page" }}
    >
      <div
        id="app-container"
        ref={appContainerRef}
        style={{
          backgroundColor: "var(--color-background-one)",
          fontFamily: "var(--font-title)",
          color: "var(--color-main)",
        }}
      >
        <Frame />
        {/* Routing */}
        {isLoading ? "LOADING" : <AppRouter />}
        {/* Three js canvas */}
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
          {envMode === "development" && <StatsGl />}
          <View.Port />
          <ViewportSizeHandler />
        </Canvas>
        {/* Noise filter */}
        <NoiseFilter opacity={0.25} />
      </div>
    </ReactLenis>
  );
}
