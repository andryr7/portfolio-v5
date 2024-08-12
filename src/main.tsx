import React from "react";
import ReactDOM from "react-dom/client";
import "./reset.css";
import { BrowserView, MobileView } from "react-device-detect";
import DesktopApp from "./DesktopApp.tsx";
import MobileApp from "./MobileApp.tsx";
import ReactGA from "react-ga4";

const TRACKING_ID = import.meta.env.VITE_GOOGLE_TRACKING_UNIT; // your Measurement ID

ReactGA.initialize(TRACKING_ID);

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
