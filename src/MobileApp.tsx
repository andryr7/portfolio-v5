import { Canvas } from "@react-three/fiber";
import { Frame } from "./components/html/mobile/frame/Frame";
import { Loader } from "./components/html/mobile/loader/Loader";
import { useLoadData } from "./handlers/useLoadData";
import { useTheme } from "./handlers/useTheme";
import { useRef } from "react";
import { StatsGl, View } from "@react-three/drei";
import { MobileRouter } from "./components/html/mobile/MobileRouter";
import { ViewportSizeHandler } from "./handlers/viewportSizeHandler";
import "./MobileApp.css";

export default function MobileApp() {
  const envMode = import.meta.env.MODE;
  const appContainerRef = useRef<any>(null);
  const isLoading = useLoadData();

  //Theme handling
  useTheme();

  return (
    <>
      <Loader isLoading={isLoading} />
      <Frame />
      <div className="mobile-app-container" ref={appContainerRef}>
        {!isLoading && <MobileRouter />}
      </div>
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
        <ViewportSizeHandler />
        <View.Port />
      </Canvas>
    </>
  );
}
