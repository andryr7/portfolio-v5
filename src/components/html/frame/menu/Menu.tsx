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
    if (worksScrollProgress < 0.01) {
      open(true);
    } else {
      open(false);
    }
  }, [manualMode, worksScrollProgress]);

  return (
    <div
      className={`${styles.container} ${opened ? styles.openedContainer : ""}`}
      onClick={handleClick}
    >
      <div
        className={styles.menuItem}
        onClick={(e) => handleLinkClick(e, "works")}
      >
        {`-> works`}
      </div>
      <div
        className={styles.menuItem}
        onClick={(e) => handleLinkClick(e, "aboutanchor")}
      >
        {`-> about`}
      </div>
      <div className={styles.closeButton}>{`X`}</div>
      <div
        className={styles.menuItem}
        onClick={(e) => handleLinkClick(e, "contact")}
      >
        {`-> contact`}
      </div>
    </div>
  );
}
