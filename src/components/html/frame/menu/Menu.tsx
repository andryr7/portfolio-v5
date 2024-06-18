import styles from "./Menu.module.css";
import React, { useState } from "react";
import { useLenis } from "lenis/react";

function CloseMenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button className={styles.closeButton} onClick={onClick}>
      <div />
    </button>
  );
}

function MenuItem({ target }: { target: string }) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    lenis?.scrollTo("#" + target);
  };

  return (
    <a className={styles.menuItem} href="" onClick={handleClick}>
      {target}
    </a>
  );
}

export function Menu() {
  const [opened, open] = useState<boolean>(false);
  const lenis = useLenis();

  const handleClick = () => {
    open((c) => !c);
  };

  const handleLinkClick = (e: React.MouseEvent, target: string) => {
    e.preventDefault();
    lenis?.scrollTo("#" + target);
  };

  return (
    <div className={`${styles.container} ${opened ? "" : styles.closed}`}>
      <div className={styles.options}>
        <span>2024 portfolio</span>
        <CloseMenuButton onClick={handleClick} />
      </div>
      <a
        className={styles.menuItem}
        href=""
        onClick={(e) => handleLinkClick(e, "works")}
      >
        works
      </a>
      <a
        className={styles.menuItem}
        href=""
        onClick={(e) => handleLinkClick(e, "aboutanchor")}
      >
        about
      </a>
      <a
        className={styles.menuItem}
        href=""
        onClick={(e) => handleLinkClick(e, "contact")}
      >
        contact
      </a>
    </div>
  );
}
