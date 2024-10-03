import styles from "./Menu.module.css";
import React, { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";
import { useTranslatedText } from "@/handlers/useTranslatedText";

export function Menu() {
  const [opened, open] = useState<boolean>(true);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const lenis = useLenis();
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );
  const workLinkText = useTranslatedText("works", "projets");
  const aboutLinkText = useTranslatedText("about", "à propos");

  const handleOpenClick = () => {
    if (!opened) {
      open(true);
      setManualMode(true);
    }
  };

  const handleCloseClick = () => {
    if (worksScrollProgress !== 0) {
      open(false);
    } else {
      setManualMode(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    lenis?.scrollTo("#" + target);
    open(false);
  };

  //Closing the menu on first scroll
  useEffect(() => {
    if (manualMode) return;
    if (worksScrollProgress < 0.01) {
      open(true);
    } else {
      open(false);
    }
  }, [manualMode, worksScrollProgress]);

  //Opening the menu on scroll back to top
  useEffect(() => {
    worksScrollProgress === 0 && !opened && setManualMode(false);
  }, [worksScrollProgress, opened]);

  return (
    <div
      className={`${styles.container} ${opened ? styles.openedContainer : ""}`}
      onClick={handleOpenClick}
    >
      <div
        className={styles.menuItem}
        onClick={(e) => handleLinkClick(e, "works")}
      >
        <span>{workLinkText}</span>
      </div>
      <div
        className={styles.menuItem}
        onClick={(e) => handleLinkClick(e, "aboutanchor")}
      >
        <span>{aboutLinkText}</span>
      </div>
      <div
        style={{
          visibility: manualMode ? "visible" : "hidden",
          opacity: manualMode ? 1 : 0,
        }}
        className={styles.closeButton}
        onClick={handleCloseClick}
      >{`X`}</div>
      <div
        className={styles.menuItem}
        onClick={(e) => handleLinkClick(e, "contact")}
      >
        <span>contact</span>
      </div>
    </div>
  );
}
