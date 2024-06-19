import styles from "./Menu.module.css";
import React, { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { usePortfolioStore } from "@/handlers/usePortfolioStore";

export function Menu() {
  const [opened, open] = useState<boolean>(true);
  const [manualMode, setManualMode] = useState<boolean>(false);
  const lenis = useLenis();
  const worksScrollProgress = usePortfolioStore(
    (state) => state.worksScrollProgress
  );

  const handleClick = () => {
    open((c) => !c);
    setManualMode(true);
  };

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    lenis?.scrollTo("#" + target);
  };

  useEffect(() => {
    if (manualMode) return;
    if (worksScrollProgress < 0.1) {
      open(true);
    } else {
      open(false);
    }
  }, [manualMode, worksScrollProgress]);

  return (
    <div className={styles.container} onClick={handleClick}>
      <div
        className={`${styles.menuBar} ${opened ? styles.openedMenuBar : ""}`}
      />
      <div
        className={`${styles.menuBar} ${opened ? styles.openedMenuBar : ""}`}
      />
      <div
        className={`${styles.menuBar} ${opened ? styles.openedMenuBar : ""}`}
      />
      <div
        className={styles.menuContentContainer}
        style={{ opacity: opened ? 1 : 0 }}
      >
        <div className={styles.menuTitle}>
          <span>portfolio v5</span>
          <span>X</span>
        </div>
        <div className={styles.linksContainer}>
          <a
            className={styles.link}
            onClick={(e) => handleLinkClick(e, "works")}
          >
            works
          </a>
          <a
            className={styles.link}
            onClick={(e) => handleLinkClick(e, "aboutanchor")}
          >
            about
          </a>
          <a
            className={styles.link}
            onClick={(e) => handleLinkClick(e, "contact")}
          >
            contact
          </a>
        </div>
      </div>
    </div>
  );
}
