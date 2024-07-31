import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import { BrowserView, MobileView } from "react-device-detect";
import DesktopApp from "./DesktopApp.tsx";
import MobileApp from "./MobileApp.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserView>
      <DesktopApp />
    </BrowserView>
    <MobileView>
      <MobileApp />
    </MobileView>
  </React.StrictMode>
);
