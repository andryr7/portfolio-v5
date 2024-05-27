import { Home } from "./pages/home/Home";
import { useRef } from "react";
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

export default function App() {
  const envMode = import.meta.env.MODE;
  const appContainerRef = useRef<any>(null);
  const { isLoading } = useLoadData();
  useTheme();

  return (
    <ReactLenis root>
      {isLoading && "LOADING"}
      <div id="app-container" ref={appContainerRef}>
        <Frame />

        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work/:name">
            <Work />
          </Route>
          {/* Default route in a switch */}
          <Route>404: No such page!</Route>
        </Switch>

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
        </Canvas>

        {/* Noise filter */}
        <NoiseFilter opacity={0.25} />
      </div>
    </ReactLenis>
  );
}
