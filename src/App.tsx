import { Route, Switch } from "wouter";
import { Home } from "./pages/home/Home";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { StatsGl, View } from "@react-three/drei";
import { ReactLenis } from "lenis/react";
import { useLoadData } from "./state/useLoadData";

export default function App() {
  const envMode = import.meta.env.MODE;
  const appContainerRef = useRef<any>(null);
  const { isLoading } = useLoadData();

  return (
    <ReactLenis root>
      {isLoading && "LOADING"}
      <div id="app-container" ref={appContainerRef}>
        <Switch>
          <Route path="/" component={Home} />

          <Route path="/projects/:name">
            {(params) => <>Project: {params.name}</>}
          </Route>

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
      </div>
    </ReactLenis>
  );
}
